import mongoose from "mongoose";

const purchasePaymentSchema = new mongoose.Schema(
  {
    // ============================
    // Payment Number
    // ============================

    paymentNumber: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },

    // ============================
    // Purchase Reference
    // ============================

    purchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      required: true,
    },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    // ============================
    // Payment Details
    // ============================

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    paymentAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMode: {
      type: String,
      enum: [
        "CASH",
        "BANK_TRANSFER",
        "CHEQUE",
        "UPI",
        "CARD",
        "OTHER",
      ],
      required: true,
    },

    transactionReference: {
      type: String,
      trim: true,
      default: "",
    },

    // ============================
    // Payment Status
    // ============================

    paymentStatus: {
      type: String,
      enum: [
        "PENDING",
        "COMPLETED",
        "FAILED",
        "CANCELLED",
      ],
      default: "COMPLETED",
    },

    // ============================
    // Additional Information
    // ============================

    remarks: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    attachment: {
      type: String,
      trim: true,
      default: "",
    },

    // ============================
    // Audit Information
    // ============================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// ============================
// Indexes
// ============================

purchasePaymentSchema.index({ purchaseId: 1 });

purchasePaymentSchema.index({ supplierId: 1 });

purchasePaymentSchema.index({ paymentDate: -1 });

export default mongoose.model(
  "PurchasePayment",
  purchasePaymentSchema
);