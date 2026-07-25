import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    supplierCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    supplierName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    supplierType: {
      type: String,
      enum: [
        "Manufacturer",
        "Wholesaler",
        "Retailer",
        "Importer",
        "Local Vendor",
      ],
      default: "Wholesaler",
    },

    contactPerson: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    mobile: {
      type: String,
      trim: true,
    },

    alternateMobile: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    website: {
      type: String,
      trim: true,
    },

    gstNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },

    panNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },

    address: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    city: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    state: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    country: {
      type: String,
      trim: true,
      default: "India",
    },

    pincode: {
      type: String,
      trim: true,
    },

    paymentTerms: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    creditDays: {
      type: Number,
      default: 0,
      min: 0,
    },

    openingBalance: {
      type: Number,
      default: 0,
      min: 0,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
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

// Indexes
supplierSchema.index({ supplierName: 1 });
supplierSchema.index({ gstNumber: 1 }, { unique: true, sparse: true });
supplierSchema.index({ mobile: 1 });

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;