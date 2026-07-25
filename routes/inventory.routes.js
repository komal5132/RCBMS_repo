import express from "express";

import {
  getCurrentStock,
  getMaterialStock,
  getLowStock,
  getOutOfStock,
  getNegativeStock,
  reserveStock,
  releaseReservedStock,

  createAdjustment,
  approveAdjustment,
  rejectAdjustment,
  getPendingAdjustments,

  getAllTransactions,
  getMaterialLedger,
  getReferenceTransactions,
} from "../controllers/inventory.controller.js";


const router = express.Router();


// ===============================
// STOCK REPORTS
// ===============================


// Get complete current stock
router.get(
  "/current-stock",
  getCurrentStock
);


// Get stock of specific material
router.get(
  "/material/:materialId",
  getMaterialStock
);


// Get low stock materials
router.get(
  "/low-stock",
  getLowStock
);


// Get out of stock materials
router.get(
  "/out-of-stock",
  getOutOfStock
);


// Get negative stock materials
router.get(
  "/negative-stock",
  getNegativeStock
);



// ===============================
// STOCK RESERVATION
// ===============================


// Reserve stock
router.post(
  "/reserve-stock",
  reserveStock
);


// Release reserved stock
router.post(
  "/release-reserved-stock",
  releaseReservedStock
);



// ===============================
// STOCK ADJUSTMENT
// ===============================


// Create adjustment request
router.post(
  "/adjustments",
  createAdjustment
);


// Approve adjustment
router.put(
  "/adjustments/:adjustmentId/approve",
  approveAdjustment
);


// Reject adjustment
router.put(
  "/adjustments/:adjustmentId/reject",
  rejectAdjustment
);


// Get pending adjustments
router.get(
  "/adjustments/pending",
  getPendingAdjustments
);



// ===============================
// INVENTORY TRANSACTIONS
// ===============================


// Get all inventory transactions
router.get(
  "/transactions",
  getAllTransactions
);


// Get material ledger
router.get(
  "/material/:materialId/ledger",
  getMaterialLedger
);


// Get transactions by reference
router.get(
  "/reference/:referenceType/:referenceId",
  getReferenceTransactions
);



export default router;