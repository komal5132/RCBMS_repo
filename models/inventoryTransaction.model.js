import mongoose from "mongoose";

const inventoryTransactionSchema = new mongoose.Schema(
  {
    // ============================
    // Transaction Information
    // ============================

    transactionNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    transactionType: {
      type: String,
      enum: [
        "ADJUSTMENT",
        "OPENING_STOCK",
        "PURCHASE",
        "PURCHASE_RETURN",
        "PURCHASE_RECEIVE",
        "MANUFACTURING_ISSUE",
        "MANUFACTURING_RECEIPT",
        "SALE",
        "SALES_RETURN",
        "STOCK_ADJUSTMENT",
        "SCRAP",
        "DAMAGED",
        "TRANSFER",
      ],
      required: true,
    },

    referenceType: {
      type: String,
      enum: [
        "OPENING_STOCK",
        "PURCHASE_ORDER",
        "PURCHASE_RECEIPT",
        "PURCHASE_RETURN",
        "MANUFACTURING",
        "SALES_ORDER",
        "SALES_RETURN",
        "STOCK_ADJUSTMENT",
        "TRANSFER",
      ],
      required: true,
    },

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // ============================
    // Material Information
    // ============================

    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MaterialMaster",
      required: true,
    },

    uomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UnitOfMeasure",
      required: true,
    },

    // ============================
    // Quantity Information
    // ============================

    movementType: {
      type: String,
      enum: ["IN", "OUT"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    openingQty: {
      type: Number,
      required: true,
      min: 0,
    },

    closingQty: {
      type: Number,
      required: true,
      min: 0,
    },

    // ============================
    // Cost Information
    // ============================

    rate: {
      type: Number,
      required: true,
      min: 0,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    averageCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    stockBefore: {
      type: Number,

      default: 0,
    },

    stockAfter: {
      type: Number,

      default: 0,
    },

    // Human readable reference

    referenceNumber: {
      type: String,

      trim: true,
    },

    // ============================
    // Additional Information
    // ============================

    transactionDate: {
      type: Date,
      default: Date.now,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

// ============================
// Indexes
// ============================

inventoryTransactionSchema.index({ materialId: 1 });
inventoryTransactionSchema.index({ transactionType: 1 });
inventoryTransactionSchema.index({ referenceId: 1 });
inventoryTransactionSchema.index({ transactionDate: -1 });

export default mongoose.model(
  "InventoryTransaction",
  inventoryTransactionSchema,
);
