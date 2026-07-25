import Joi from "joi";

/* ===========================================================
   Common ObjectId Validation
=========================================================== */

const objectId = Joi.string().length(24).hex();

/* ===========================================================
   Get Material Stock
=========================================================== */

export const getMaterialStockValidation = Joi.object({
  materialId: objectId.required().messages({
    "string.empty": "Material ID is required.",
    "string.length": "Invalid Material ID.",
    "string.hex": "Invalid Material ID.",
    "any.required": "Material ID is required.",
  }),
});

/* ===========================================================
   Get Material Ledger
=========================================================== */

export const getMaterialLedgerValidation = Joi.object({
  materialId: objectId.required().messages({
    "string.empty": "Material ID is required.",
    "string.length": "Invalid Material ID.",
    "string.hex": "Invalid Material ID.",
    "any.required": "Material ID is required.",
  }),
});

/* ===========================================================
   Get Transaction By Reference
=========================================================== */

export const getReferenceTransactionValidation = Joi.object({
  referenceId: objectId.required().messages({
    "string.empty": "Reference ID is required.",
    "string.length": "Invalid Reference ID.",
    "string.hex": "Invalid Reference ID.",
    "any.required": "Reference ID is required.",
  }),
});

/* ===========================================================
   Reserve Stock
=========================================================== */

export const reserveStockValidation = Joi.object({
  materialId: objectId.required(),

  quantity: Joi.number().positive().required().messages({
    "number.base": "Quantity must be a number.",
    "number.positive": "Quantity must be greater than zero.",
    "any.required": "Quantity is required.",
  }),
});

/* ===========================================================
   Release Reserved Stock
=========================================================== */

export const releaseReservedStockValidation = Joi.object({
  materialId: objectId.required(),

  quantity: Joi.number().positive().required().messages({
    "number.base": "Quantity must be a number.",
    "number.positive": "Quantity must be greater than zero.",
    "any.required": "Quantity is required.",
  }),
});

/* ===========================================================
   Create Stock Adjustment
=========================================================== */

export const createStockAdjustmentValidation = Joi.object({
  materialId: objectId.required(),

  physicalQty: Joi.number().min(0).required().messages({
    "number.base": "Physical Quantity must be a number.",
    "number.min": "Physical Quantity cannot be negative.",
    "any.required": "Physical Quantity is required.",
  }),

  adjustmentType: Joi.string()
    .valid(
      "PHYSICAL_VERIFICATION",
      "DAMAGED",
      "LOST",
      "FOUND",
      "MANUAL_CORRECTION"
    )
    .required(),

  reason: Joi.string().trim().max(300).required().messages({
    "string.empty": "Reason is required.",
    "string.max": "Reason cannot exceed 300 characters.",
  }),

  remarks: Joi.string().allow("").max(500),
});

/* ===========================================================
   Approve Stock Adjustment
=========================================================== */

export const approveStockAdjustmentValidation = Joi.object({
  adjustmentId: objectId.required().messages({
    "string.empty": "Adjustment ID is required.",
    "string.length": "Invalid Adjustment ID.",
    "string.hex": "Invalid Adjustment ID.",
  }),
});

/* ===========================================================
   Reject Stock Adjustment
=========================================================== */

export const rejectStockAdjustmentValidation = Joi.object({
  adjustmentId: objectId.required(),

  rejectionReason: Joi.string().trim().max(300).required().messages({
    "string.empty": "Rejection reason is required.",
    "string.max": "Rejection reason cannot exceed 300 characters.",
  }),
});