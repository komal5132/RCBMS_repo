import mongoose from "mongoose";

const stockAdjustmentSchema = new mongoose.Schema(
  {
    // ==================================
    // Adjustment Information
    // ==================================

    adjustmentNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    adjustmentDate: {
      type: Date,
      default: Date.now,
    },

    // ==================================
    // Material
    // ==================================

    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MaterialMaster",
      required: true,
    },

    // ==================================
    // Stock Details
    // ==================================

    systemQty: {
      type: Number,
      required: true,
      min: 0,
    },

    physicalQty: {
      type: Number,
      required: true,
      min: 0,
    },

    differenceQty: {
      type: Number,
      required: true,
    },

    // ==================================
    // Adjustment Details
    // ==================================

    adjustmentType: {
      type: String,
      enum: [
        "PHYSICAL_VERIFICATION",
        "DAMAGED",
        "LOST",
        "FOUND",
        "MANUAL_CORRECTION",
      ],
      required: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    // ==================================
    // Approval Workflow
    // ==================================

    status: {
      type: String,
      enum: [
        "PENDING",
        "APPROVED",
        "REJECTED",
      ],
      default: "PENDING",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

    rejectionReason: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// =========================
// Indexes
// =========================

stockAdjustmentSchema.index(
  { adjustmentNo: 1 },
  { unique: true }
);

stockAdjustmentSchema.index({
  materialId: 1,
});

stockAdjustmentSchema.index({
  status: 1,
});

stockAdjustmentSchema.index({
  adjustmentDate: -1,
});

export default mongoose.model(
  "StockAdjustment",
  stockAdjustmentSchema
);