import PurchaseReceipt from "../../models/purchaseModule/purchaseReceipt.model.js";
import PurchaseOrder from "../../models/purchaseModule/purchaseOrder.model.js";
import { addPurchaseStock } from "../purchaseInventory.service.js";
import { updatePurchaseReceiptStatus } from "./purchase.service.js";

// =======================================
// Generate Receipt Number
// =======================================

const generateReceiptNumber = async () => {
  const count = await PurchaseReceipt.countDocuments();

  const number = count + 1;

  return `GRN-${new Date().getFullYear()}-${String(number).padStart(4, "0")}`;
};

// =======================================
// Calculate Receipt Amount
// =======================================

const calculateReceiptAmount = (items) => {
  let total = 0;

  items.forEach((item) => {
    total += item.receivedQuantity * item.purchaseRate;
  });

  return total;
};

// =======================================
// Create Purchase Receipt
// =======================================

export const createPurchaseReceipt = async (data, userId) => {
  const purchase = await PurchaseOrder.findById(data.purchaseId);

  if (!purchase) {
    throw new Error("Purchase order not found");
  }

  if (purchase.status !== "APPROVED") {
    throw new Error("Only approved purchase orders can receive goods");
  }

  // Check received quantity

  data.items.forEach((receivedItem) => {
    const orderedItem = purchase.items.find(
      (item) =>
        item.materialId.toString() === receivedItem.materialId.toString(),
    );

    if (!orderedItem) {
      throw new Error("Material not found in purchase order");
    }

    const remaining = orderedItem.quantity - orderedItem.receivedQuantity;

    if (receivedItem.receivedQuantity > remaining) {
      throw new Error("Received quantity exceeds ordered quantity");
    }
  });

  const receiptNumber = await generateReceiptNumber();

  const totalReceivedAmount = calculateReceiptAmount(data.items);

  const receipt = await PurchaseReceipt.create({
    ...data,

    receiptNumber,

    totalReceivedAmount,

    receivedBy: userId,
  });

  return receipt;
};

// =======================================
// Get All Receipts
// =======================================

export const getAllPurchaseReceipts = async () => {
  return await PurchaseReceipt.find()

    .populate("supplierId", "supplierName supplierCode")

    .populate("purchaseId", "purchaseNumber")

    .sort({
      createdAt: -1,
    });
};

// =======================================
// Get Receipt By ID
// =======================================

export const getPurchaseReceiptById = async (id) => {
  const receipt = await PurchaseReceipt.findById(id)

    .populate("supplierId")

    .populate("purchaseId")

    .populate("items.materialId");

  if (!receipt) {
    throw new Error("Receipt not found");
  }

  return receipt;
};

// =======================================
// Approve Receipt
// =======================================

export const approvePurchaseReceipt = async (id, userId) => {
  const receipt = await PurchaseReceipt.findById(id);

  if (!receipt) {
    throw new Error("Receipt not found");
  }

  if (receipt.status !== "DRAFT") {
    throw new Error("Only draft receipt can be approved");
  }

  // Step 1:
  // Approve GRN

  receipt.status = "APPROVED";

  receipt.approvedBy = userId;

  receipt.approvedAt = new Date();

  await receipt.save();

  // Step 2:
  // Add Stock Into Inventory

  await addPurchaseStock(receipt._id, userId);

  await updatePurchaseReceiptStatus(receipt.purchaseId);

  return receipt;
};

// =======================================
// Reject Receipt
// =======================================

export const rejectPurchaseReceipt = async (id) => {
  const receipt = await PurchaseReceipt.findById(id);

  if (!receipt) {
    throw new Error("Receipt not found");
  }

  if (receipt.status === "APPROVED") {
    throw new Error("Approved receipt cannot be rejected");
  }

  receipt.status = "REJECTED";

  await receipt.save();

  return receipt;
};
