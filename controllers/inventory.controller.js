import * as inventoryService from "../services/inventoryServices/inventory.service.js";

/**
 * Get Current Stock Summary
 * GET /api/inventory/current-stock
 */
export const getCurrentStock = async (req, res) => {
  try {
    const stock = await inventoryService.getCurrentStock();

    return res.status(200).json({
      success: true,
      message: "Current stock fetched successfully.",
      data: stock,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Stock of a Single Material
 * GET /api/inventory/material/:materialId
 */
export const getMaterialStock = async (req, res) => {
  try {
    const { materialId } = req.params;

    const stock = await inventoryService.getMaterialStock(materialId);

    return res.status(200).json({
      success: true,
      message: "Material stock fetched successfully.",
      data: stock,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Low Stock Materials
 * GET /api/inventory/low-stock
 */
export const getLowStock = async (req, res) => {
  try {
    const stock = await inventoryService.getLowStock();

    return res.status(200).json({
      success: true,
      message: "Low stock materials fetched successfully.",
      data: stock,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Out of Stock Materials
 * GET /api/inventory/out-of-stock
 */
export const getOutOfStock = async (req, res) => {
  try {
    const stock = await inventoryService.getOutOfStock();

    return res.status(200).json({
      success: true,
      message: "Out of stock materials fetched successfully.",
      data: stock,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Negative Stock Materials
 * GET /api/inventory/negative-stock
 */
export const getNegativeStock = async (req, res) => {
  try {
    const stock = await inventoryService.getNegativeStock();

    return res.status(200).json({
      success: true,
      message: "Negative stock materials fetched successfully.",
      data: stock,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Reserve Stock
 * POST /api/inventory/reserve-stock
 */
export const reserveStock = async (req, res) => {
  try {
    const reservedStock = await inventoryService.reserveStock(req.body);

    return res.status(200).json({
      success: true,
      message: "Stock reserved successfully.",
      data: reservedStock,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Release Reserved Stock
 * POST /api/inventory/release-reserved-stock
 */
export const releaseReservedStock = async (req, res) => {
  try {
    const releasedStock = await inventoryService.releaseReservedStock(req.body);

    return res.status(200).json({
      success: true,
      message: "Reserved stock released successfully.",
      data: releasedStock,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Create Inventory Adjustment
 * POST /api/inventory/adjustments
 */
export const createAdjustment = async (req, res) => {
  try {
    const adjustment = await inventoryService.createAdjustment(req.body);

    return res.status(201).json({
      success: true,
      message: "Inventory adjustment created successfully.",
      data: adjustment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Approve Inventory Adjustment
 * PUT /api/inventory/adjustments/:adjustmentId/approve
 */
export const approveAdjustment = async (req, res) => {
  try {
    const { adjustmentId } = req.params;

    const adjustment = await inventoryService.approveAdjustment(
      adjustmentId
    );

    return res.status(200).json({
      success: true,
      message: "Inventory adjustment approved successfully.",
      data: adjustment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Reject Inventory Adjustment
 * PUT /api/inventory/adjustments/:adjustmentId/reject
 */
export const rejectAdjustment = async (req, res) => {
  try {
    const { adjustmentId } = req.params;

    const adjustment = await inventoryService.rejectAdjustment(
      adjustmentId
    );

    return res.status(200).json({
      success: true,
      message: "Inventory adjustment rejected successfully.",
      data: adjustment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Pending Inventory Adjustments
 * GET /api/inventory/adjustments/pending
 */
export const getPendingAdjustments = async (req, res) => {
  try {
    const adjustments = await inventoryService.getPendingAdjustments();

    return res.status(200).json({
      success: true,
      message: "Pending adjustments fetched successfully.",
      data: adjustments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Inventory Transactions
 * GET /api/inventory/transactions
 */
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await inventoryService.getAllTransactions();

    return res.status(200).json({
      success: true,
      message: "Inventory transactions fetched successfully.",
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Material Ledger
 * GET /api/inventory/material/:materialId/ledger
 */
export const getMaterialLedger = async (req, res) => {
  try {
    const { materialId } = req.params;

    const ledger = await inventoryService.getMaterialLedger(materialId);

    return res.status(200).json({
      success: true,
      message: "Material ledger fetched successfully.",
      data: ledger,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Transactions By Reference
 * GET /api/inventory/reference/:referenceType/:referenceId
 */
export const getReferenceTransactions = async (req, res) => {
  try {
    const { referenceType, referenceId } = req.params;

    const transactions = await inventoryService.getReferenceTransactions(
      referenceType,
      referenceId
    );

    return res.status(200).json({
      success: true,
      message: "Reference transactions fetched successfully.",
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};