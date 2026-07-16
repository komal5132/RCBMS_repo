import mongoose from "mongoose";

const unitOfMeasureSchema = new mongoose.Schema(
  {
    unitCode: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },

    unitName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    shortName: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 10,
    },

    unitType: {
      type: String,
      required: true,
      enum: ["COUNT", "WEIGHT", "LENGTH", "VOLUME"],
    },

    baseUnit: {
      type: Boolean,
      default: false,
    },

    conversionFactor: {
      type: Number,
      required: true,
      default: 1,
      min: 0,
    },

    description: {
      type: String,
      default: "",
      trim: true,
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

unitOfMeasureSchema.index(
  { unitName: 1 },
  { unique: true }
);

const UnitOfMeasure = mongoose.model(
  "UnitOfMeasure",
  unitOfMeasureSchema
);

export default UnitOfMeasure;