import Joi from "joi";

/**
 * Create Supplier Validation
 */
export const createSupplierValidation = Joi.object({
  supplierCode: Joi.string()
    .trim()
    .uppercase()
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.empty": "Supplier Code is required.",
      "string.min": "Supplier Code must be at least 2 characters.",
      "string.max": "Supplier Code cannot exceed 20 characters.",
      "any.required": "Supplier Code is required.",
    }),

  supplierName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Supplier Name is required.",
      "string.min": "Supplier Name must be at least 2 characters.",
      "string.max": "Supplier Name cannot exceed 100 characters.",
      "any.required": "Supplier Name is required.",
    }),

  supplierType: Joi.string()
    .valid(
      "Manufacturer",
      "Wholesaler",
      "Retailer",
      "Importer",
      "Local Vendor"
    )
    .optional()
    .messages({
      "any.only":
        "Supplier Type must be Manufacturer, Wholesaler, Retailer, Importer or Local Vendor.",
    }),

  contactPerson: Joi.string().trim().max(100).allow("").optional(),

  mobile: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .allow("")
    .optional()
    .messages({
      "string.pattern.base": "Enter a valid 10-digit mobile number.",
    }),

  alternateMobile: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .allow("")
    .optional()
    .messages({
      "string.pattern.base":
        "Enter a valid 10-digit alternate mobile number.",
    }),

  email: Joi.string().email().allow("").optional().messages({
    "string.email": "Enter a valid email address.",
  }),

  website: Joi.string().uri().allow("").optional().messages({
    "string.uri": "Enter a valid website URL.",
  }),

  gstNumber: Joi.string()
    .trim()
    .uppercase()
    .pattern(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    )
    .allow("")
    .optional()
    .messages({
      "string.pattern.base": "Enter a valid GST Number.",
    }),

  panNumber: Joi.string()
    .trim()
    .uppercase()
    .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .allow("")
    .optional()
    .messages({
      "string.pattern.base": "Enter a valid PAN Number.",
    }),

  address: Joi.string().trim().max(300).allow("").optional(),

  city: Joi.string().trim().max(50).allow("").optional(),

  state: Joi.string().trim().max(50).allow("").optional(),

  country: Joi.string().trim().max(50).allow("").optional(),

  pincode: Joi.string()
    .pattern(/^[1-9][0-9]{5}$/)
    .allow("")
    .optional()
    .messages({
      "string.pattern.base": "Enter a valid 6-digit Pincode.",
    }),

  paymentTerms: Joi.string().trim().max(100).allow("").optional(),

  creditDays: Joi.number().integer().min(0).optional().messages({
    "number.base": "Credit Days must be a number.",
    "number.min": "Credit Days cannot be negative.",
  }),

  openingBalance: Joi.number().min(0).optional().messages({
    "number.base": "Opening Balance must be a number.",
    "number.min": "Opening Balance cannot be negative.",
  }),

  notes: Joi.string().trim().max(500).allow("").optional(),

  isActive: Joi.boolean().optional(),
});

/**
 * Update Supplier Validation
 */
export const updateSupplierValidation = Joi.object({
  supplierCode: Joi.string().trim().uppercase().min(2).max(20),

  supplierName: Joi.string().trim().min(2).max(100),

  supplierType: Joi.string().valid(
    "Manufacturer",
    "Wholesaler",
    "Retailer",
    "Importer",
    "Local Vendor"
  ),

  contactPerson: Joi.string().trim().max(100).allow(""),

  mobile: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .allow(""),

  alternateMobile: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .allow(""),

  email: Joi.string().email().allow(""),

  website: Joi.string().uri().allow(""),

  gstNumber: Joi.string()
    .trim()
    .uppercase()
    .pattern(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    )
    .allow(""),

  panNumber: Joi.string()
    .trim()
    .uppercase()
    .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .allow(""),

  address: Joi.string().trim().max(300).allow(""),

  city: Joi.string().trim().max(50).allow(""),

  state: Joi.string().trim().max(50).allow(""),

  country: Joi.string().trim().max(50).allow(""),

  pincode: Joi.string()
    .pattern(/^[1-9][0-9]{5}$/)
    .allow(""),

  paymentTerms: Joi.string().trim().max(100).allow(""),

  creditDays: Joi.number().integer().min(0),

  openingBalance: Joi.number().min(0),

  notes: Joi.string().trim().max(500).allow(""),

  isActive: Joi.boolean(),
}).min(1);

/**
 * Supplier ID Validation
 */
export const supplierIdValidation = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.length": "Invalid Supplier ID.",
    "any.required": "Supplier ID is required.",
  }),
});

/**
 * Search Supplier Validation
 */
export const searchSupplierValidation = Joi.object({
  keyword: Joi.string().trim().allow("").optional(),

  isActive: Joi.boolean().optional(),

  page: Joi.number().integer().min(1).default(1),

  limit: Joi.number().integer().min(1).max(100).default(10),
});