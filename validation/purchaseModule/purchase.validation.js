import Joi from "joi";


// ===============================
// Purchase Item Validation
// ===============================

const purchaseItemValidation = Joi.object({

    materialId: Joi.string()
        .required()
        .messages({
            "any.required": "Material is required",
        }),


    quantity: Joi.number()
        .positive()
        .required()
        .messages({
            "number.positive": "Quantity must be greater than zero",
            "any.required": "Quantity is required",
        }),


    uomId: Joi.string()
        .required()
        .messages({
            "any.required": "Unit of measure is required",
        }),


    purchaseRate: Joi.number()
        .min(0)
        .required()
        .messages({
            "any.required": "Purchase rate is required",
        }),


    amount: Joi.number()
        .min(0)
        .required(),

});


// ===============================
// Create Purchase Validation
// ===============================

export const createPurchaseValidation = Joi.object({

    supplierId: Joi.string()
        .required()
        .messages({
            "any.required": "Supplier is required",
        }),


    purchaseDate: Joi.date()
        .optional(),


    expectedDeliveryDate: Joi.date()
        .optional(),


    items: Joi.array()
        .items(purchaseItemValidation)
        .min(1)
        .required()
        .messages({
            "array.min": "At least one material is required",
            "any.required": "Purchase items are required",
        }),


    taxAmount: Joi.number()
        .min(0)
        .default(0),


    discountAmount: Joi.number()
        .min(0)
        .default(0),


    notes: Joi.string()
        .max(500)
        .allow("", null),

});


// ===============================
// Update Purchase Validation
// ===============================

export const updatePurchaseValidation = Joi.object({

    supplierId: Joi.string()
        .optional(),


    expectedDeliveryDate: Joi.date()
        .optional(),


    items: Joi.array()
        .items(purchaseItemValidation)
        .min(1)
        .optional(),


    taxAmount: Joi.number()
        .min(0)
        .optional(),


    discountAmount: Joi.number()
        .min(0)
        .optional(),


    notes: Joi.string()
        .max(500)
        .allow("", null),

});


// ===============================
// Purchase ID Validation
// ===============================

export const purchaseIdValidation = Joi.object({

    id: Joi.string()
        .required()
        .messages({
            "any.required": "Purchase ID is required",
        }),

});


// ===============================
// Approve Purchase Validation
// ===============================

export const approvePurchaseValidation = Joi.object({

    id: Joi.string()
        .required(),

});


// ===============================
// Cancel Purchase Validation
// ===============================

export const cancelPurchaseValidation = Joi.object({

    id: Joi.string()
        .required(),

});