import mongoose from "mongoose";

const materialCategorySchema = new mongoose.Schema(
  {
    categoryCode: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },

    categoryName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      default: "",
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

materialCategorySchema.index(
  { categoryName: 1 },
  { unique: true }
);

const MaterialCategory = mongoose.model(
  "MaterialCategory",
  materialCategorySchema
);

export default MaterialCategory;