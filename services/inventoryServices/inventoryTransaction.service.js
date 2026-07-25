import InventoryTransaction from "../../models/inventoryTransaction.model.js";
import MaterialMaster from "../../models/materialMaster.model.js";

/**
 * Create Inventory Transaction (Stock Ledger)
 * This function is used internally by:
 * - Purchase Module
 * - Manufacturing Module
 * - Sales Module
 * - Stock Adjustment Module
 */
export const createInventoryTransaction = async (
  data,
  session = null
) => {
  const transactionNo = `IT${Date.now()}`;

  const transaction = new InventoryTransaction({
    transactionNo,

    transactionType: data.transactionType,

    referenceType: data.referenceType,

    referenceId: data.referenceId,

    materialId: data.materialId,

    uomId: data.uomId,

    movementType: data.movementType,

    quantity: data.quantity,

    openingQty: data.openingQty,

    closingQty: data.closingQty,

    rate: data.rate,

    amount: data.amount,

    averageCost: data.averageCost,

    transactionDate: data.transactionDate || new Date(),

    remarks: data.remarks || "",

    createdBy: data.createdBy,
  });

  await transaction.save({ session });

  return transaction;
};

/**
 * Get Complete Material Stock Ledger
 */
export const getMaterialLedger = async (materialId) => {
  // Check Material Exists
  const material = await MaterialMaster.findById(materialId);

  if (!material) {
    throw new Error("Material not found.");
  }

  // Get Ledger
  const ledger = await InventoryTransaction.find({ materialId })
    .populate("materialId", "materialCode materialName")
    .populate("uomId", "unitName shortName")
    .populate("createdBy", "name email")
    .sort({ transactionDate: 1, createdAt: 1 });

  return ledger;
};

/**
 * Get Inventory Transactions by Reference
 * Example:
 * - Purchase
 * - Manufacturing
 * - Sales
 * - Stock Adjustment
 */
export const getReferenceTransactions = async (referenceId) => {
  const transactions = await InventoryTransaction.find({ referenceId })
    .populate("materialId", "materialCode materialName")
    .populate("uomId", "unitName shortName")
    .populate("createdBy", "name email")
    .sort({ createdAt: 1 });

  if (!transactions.length) {
    throw new Error("No inventory transactions found for this reference.");
  }

  return transactions;
};

/**
 * Get All Inventory Transactions
 */
export const getAllTransactions = async (filters = {}) => {
  const query = {};

  // Filter by Transaction Type
  if (filters.transactionType) {
    query.transactionType = filters.transactionType;
  }

  // Filter by Reference Type
  if (filters.referenceType) {
    query.referenceType = filters.referenceType;
  }

  // Filter by Material
  if (filters.materialId) {
    query.materialId = filters.materialId;
  }

  // Filter by Date Range
  if (filters.fromDate || filters.toDate) {
    query.transactionDate = {};

    if (filters.fromDate) {
      query.transactionDate.$gte = new Date(filters.fromDate);
    }

    if (filters.toDate) {
      query.transactionDate.$lte = new Date(filters.toDate);
    }
  }

  const transactions = await InventoryTransaction.find(query)
    .populate("materialId", "materialCode materialName")
    .populate("uomId", "unitName shortName")
    .populate("createdBy", "name email")
    .sort({ transactionDate: -1, createdAt: -1 });

  return transactions;
};