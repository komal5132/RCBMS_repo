import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema(
  {
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MaterialMaster",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    uomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UnitOfMeasure",
      required: true,
    },

    purchaseRate: {
      type: Number,
      required: true,
      min: 0,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    receivedQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },

    pendingQuantity: {
      type: Number,
      default: function () {
        return this.quantity;
      },
    },
  },
  {
    _id: false,
  },
);

const purchaseOrderSchema = new mongoose.Schema(
  {
    // Auto generated purchase number
    purchaseNumber: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },

    // Supplier Reference
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    purchaseDate: {
      type: Date,
      default: Date.now,
    },

    expectedDeliveryDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "APPROVED",
        "PARTIALLY_RECEIVED",
        "RECEIVED",
        "CANCELLED",
      ],
      default: "DRAFT",
    },

    // Purchased materials
    items: {
      type: [purchaseItemSchema],
      required: true,
      validate: {
        validator: function (items) {
          return items.length > 0;
        },
        message: "Purchase must contain at least one item",
      },
    },

    // Total before taxes
    subTotal: {
      type: Number,
      default: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    // ============================
    // Payment Summary
    // ============================

    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    balanceAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["UNPAID", "PARTIALLY_PAID", "PAID"],
      default: "UNPAID",
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes

purchaseOrderSchema.index({
  supplierId: 1,
  purchaseDate: -1,
});

purchaseOrderSchema.index({
  status: 1,
});

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

export default PurchaseOrder;
