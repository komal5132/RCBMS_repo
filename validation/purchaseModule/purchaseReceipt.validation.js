import Joi from "joi";


// =======================================
// Receipt Item Validation
// =======================================

const receiptItemValidation = Joi.object({

    materialId: Joi.string()
        .required()
        .messages({

            "any.required":
            "Material is required"

        }),


    orderedQuantity: Joi.number()
        .min(0)
        .required()
        .messages({

            "any.required":
            "Ordered quantity is required"

        }),


    receivedQuantity: Joi.number()
        .min(0)
        .required()
        .messages({

            "any.required":
            "Received quantity is required"

        }),


    rejectedQuantity: Joi.number()
        .min(0)
        .default(0),


    uomId: Joi.string()
        .required()
        .messages({

            "any.required":
            "Unit of measure is required"

        }),


    purchaseRate: Joi.number()
        .min(0)
        .required(),


    rejectionReason: Joi.string()
        .max(300)
        .allow("", null),

});



// =======================================
// Create Purchase Receipt Validation
// =======================================

export const createPurchaseReceiptValidation =
Joi.object({

    purchaseId: Joi.string()
        .required()
        .messages({

            "any.required":
            "Purchase Order ID is required"

        }),



    supplierId: Joi.string()
        .required()
        .messages({

            "any.required":
            "Supplier ID is required"

        }),



    receivedDate: Joi.date()
        .optional(),



    items: Joi.array()
        .items(receiptItemValidation)
        .min(1)
        .required()
        .messages({

            "array.min":
            "At least one material is required",

            "any.required":
            "Receipt items are required"

        }),



    notes:Joi.string()
        .max(500)
        .allow("",null),

});




// =======================================
// Update Receipt Validation
// =======================================

export const updatePurchaseReceiptValidation =
Joi.object({

    items:Joi.array()
        .items(receiptItemValidation)
        .min(1)
        .optional(),


    notes:Joi.string()
        .max(500)
        .allow("",null),

});




// =======================================
// Receipt ID Validation
// =======================================

export const purchaseReceiptIdValidation =
Joi.object({

    id:Joi.string()
        .required()
        .messages({

            "any.required":
            "Receipt ID is required"

        }),

});




// =======================================
// Approve Receipt Validation
// =======================================

export const approvePurchaseReceiptValidation =
Joi.object({

    id:Joi.string()
        .required()

});




// =======================================
// Reject Receipt Validation
// =======================================

export const rejectPurchaseReceiptValidation =
Joi.object({

    id:Joi.string()
        .required()

});