import Joi from "joi";

// =======================================
// Create Purchase Payment Validation
// =======================================

export const createPurchasePaymentValidation = Joi.object({
  purchaseId: Joi.string().required().messages({
    "any.required": "Purchase Order ID is required",
  }),

  supplierId: Joi.string().required().messages({
    "any.required": "Supplier ID is required",
  }),

  paymentDate: Joi.date().optional(),

  paymentAmount: Joi.number().positive().required().messages({
    "number.positive": "Payment amount must be greater than zero",
    "any.required": "Payment amount is required",
  }),

  paymentMode: Joi.string()
    .valid("CASH", "BANK_TRANSFER", "CHEQUE", "UPI", "CARD", "OTHER")
    .required(),

  transactionReference: Joi.string().max(100).allow("", null),

  remarks: Joi.string().max(500).allow("", null),

  attachment: Joi.string().allow("", null),
});

// =======================================
// Update Purchase Payment Validation
// =======================================

export const updatePurchasePaymentValidation = Joi.object({
  paymentDate: Joi.date().optional(),

  paymentAmount: Joi.number().positive().optional(),

  paymentMode: Joi.string()
    .valid("CASH", "BANK_TRANSFER", "CHEQUE", "UPI", "CARD", "OTHER")
    .optional(),

  transactionReference: Joi.string().max(100).allow("", null),

  remarks: Joi.string().max(500).allow("", null),

  attachment: Joi.string().allow("", null),

  paymentStatus: Joi.string()
    .valid("PENDING", "COMPLETED", "FAILED", "CANCELLED")
    .optional(),
});

// =======================================
// Payment ID Validation
// =======================================

export const purchasePaymentIdValidation = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Payment ID is required",
  }),
});
