import mongoose from "mongoose";

const materialMasterSchema = new mongoose.Schema(
  {
    // ============================
    // Material Basic Information
    // ============================

    materialCode: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },

    materialName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MaterialCategory",
      required: true,
    },

    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MaterialSubCategory",
      required: true,
    },

    uomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UnitOfMeasure",
      required: true,
    },

    materialType: {
      type: String,
      enum: [
        "Raw Material",
        "Consumable",
        "Packaging",
        "Semi Finished",
        "Finished Good",
      ],
      required: true,
    },

    // ============================
    // Stock Control
    // ============================

    minimumStock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    maximumStock: {
      type: Number,
      min: 0,
      default: 0,
    },

    reorderLevel: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    // ============================
    // Inventory Summary
    // ============================

    openingStock: {
      type: Number,
      min: 0,
      default: 0,
    },

    openingCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    currentStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    reservedStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    averageCost: {
      type: Number,
      min: 0,
      default: 0,
    },

    lastPurchaseCost: {
      type: Number,
      min: 0,
      default: 0,
    },

    stockValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ============================
    // Purchase Information
    // ============================

    lastPurchaseDate: {
      type: Date,
      default: null,
    },

    lastPurchaseQty: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ============================
    // Tax Information
    // ============================

    hsnCode: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "",
    },

    gstRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    // ============================
    // Additional Information
    // ============================

    image: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    displayOrder: {
      type: Number,
      default: 0,
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

materialMasterSchema.index({ materialName: 1 });
materialMasterSchema.index({ categoryId: 1 });
materialMasterSchema.index({ subCategoryId: 1 });

export default mongoose.model("MaterialMaster", materialMasterSchema);
