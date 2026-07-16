import mongoose from "mongoose";

const materialSubCategorySchema = new mongoose.Schema(
  {
    subCategoryCode: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MaterialCategory",
      required: true,
    },

    subCategoryName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
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
  }
);

// Prevent duplicate subcategory names within the same category
materialSubCategorySchema.index(
  {
    categoryId: 1,
    subCategoryName: 1,
  },
  {
    unique: true,
  }
);

const MaterialSubCategory = mongoose.model(
  "MaterialSubCategory",
  materialSubCategorySchema
);

export default MaterialSubCategory;