import mongoose from "mongoose";

import StockAdjustment from "../models/stockAdjustment.model.js";

import {
  updateInventorySummary,
} from "./inventory.service.js";

import {
  createInventoryTransaction,
} from "./inventoryTransaction.service.js";
import MaterialMaster from "../../materialMaster/models/materialMaster.model.js";

/**
 * Create Stock Adjustment Request
 *
 * Creates a stock adjustment request only.
 * Inventory will NOT be updated here.
 * Inventory Transaction will NOT be created here.
 * Those actions happen only after approval.
 */
export const createAdjustment = async (data) => {
  // Check Material Exists
  const material = await MaterialMaster.findById(data.materialId);

  if (!material) {
    throw new Error("Material not found.");
  }

  if (!material.isActive) {
    throw new Error("Material is inactive.");
  }

  // Generate Adjustment Number
  // (Later replace with common sequence generator)
  const adjustmentNo = `SA${Date.now()}`;

  // Current System Stock
  const systemStock = material.currentStock;

  // Physical Stock entered by user
  const physicalStock = Number(data.physicalStock);

  if (physicalStock < 0) {
    throw new Error("Physical stock cannot be negative.");
  }

  // Calculate Difference
  const differenceQty = physicalStock - systemStock;

  // Decide Adjustment Type
  const adjustmentType =
    differenceQty >= 0 ? "INCREASE" : "DECREASE";

  // Create Adjustment Request
  const adjustment = await StockAdjustment.create({
    adjustmentNo,

    materialId: data.materialId,

    systemStock,

    physicalStock,

    differenceQty,

    adjustmentType,

    reason: data.reason,

    remarks: data.remarks || "",

    status: "PENDING",

    adjustmentDate: data.adjustmentDate || new Date(),

    createdBy: data.createdBy,
  });

  return adjustment;
};


/**
 * Get All Pending Stock Adjustments
 *
 * Returns all stock adjustments awaiting approval.
 */
export const getPendingAdjustments = async () => {
  const adjustments = await StockAdjustment.find({
    status: "PENDING",
  })
    .populate("materialId", "materialCode materialName")
    .populate("createdBy", "name email")
    .sort({
      adjustmentDate: -1,
      createdAt: -1,
    });

  return adjustments;
};


/**
 * Approve Stock Adjustment
 */
export const approveAdjustment = async (
  adjustmentId,
  approvedBy
) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    // Get Adjustment
    const adjustment = await StockAdjustment.findById(
      adjustmentId
    ).session(session);

    if (!adjustment) {
      throw new Error("Stock adjustment not found.");
    }

    if (adjustment.status !== "PENDING") {
      throw new Error("Only pending adjustments can be approved.");
    }

    // Update Inventory Summary
    await updateInventorySummary(
      {
        materialId: adjustment.materialId,

        currentStock: adjustment.physicalStock,
      },
      session
    );

    // Create Inventory Ledger
    await createInventoryTransaction(
      {
        transactionType: "STOCK_ADJUSTMENT",

        referenceType: "StockAdjustment",

        referenceId: adjustment._id,

        materialId: adjustment.materialId,

        movementType:
          adjustment.adjustmentType === "INCREASE"
            ? "IN"
            : "OUT",

        quantity: Math.abs(adjustment.differenceQty),

        openingQty: adjustment.systemStock,

        closingQty: adjustment.physicalStock,

        rate: 0,

        amount: 0,

        averageCost: 0,

        remarks: adjustment.reason,

        createdBy: approvedBy,
      },
      session
    );

    // Update Adjustment Status
    adjustment.status = "APPROVED";

    adjustment.approvedBy = approvedBy;

    adjustment.approvedDate = new Date();

    await adjustment.save({ session });

    await session.commitTransaction();

    return adjustment;
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    session.endSession();
  }
};


/**
 * Reject Stock Adjustment
 *
 * @param {String} adjustmentId
 * @param {String} rejectedBy
 * @param {String} rejectionRemarks
 * @returns {Object}
 */
export const rejectAdjustment = async (
  adjustmentId,
  rejectedBy,
  rejectionRemarks = ""
) => {
  // Find Adjustment
  const adjustment = await StockAdjustment.findById(adjustmentId);

  if (!adjustment) {
    throw new Error("Stock adjustment not found.");
  }

  // Only Pending Adjustments can be rejected
  if (adjustment.status !== "PENDING") {
    throw new Error("Only pending adjustments can be rejected.");
  }

  // Update Status
  adjustment.status = "REJECTED";

  adjustment.rejectedBy = rejectedBy;

  adjustment.rejectedDate = new Date();

  adjustment.rejectionRemarks = rejectionRemarks;

  await adjustment.save();

  return adjustment;
};