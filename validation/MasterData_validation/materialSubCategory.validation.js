import Joi from "joi";

/**
 * Create Material Sub Category Validation
 */
export const createMaterialSubCategoryValidation = Joi.object({
  subCategoryCode: Joi.string()
    .trim()
    .uppercase()
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.empty": "Sub Category Code is required.",
      "string.min": "Sub Category Code must be at least 2 characters.",
      "string.max": "Sub Category Code cannot exceed 20 characters.",
      "any.required": "Sub Category Code is required.",
    }),

  categoryId: Joi.string().hex().length(24).required().messages({
    "string.empty": "Category is required.",
    "string.hex": "Invalid Category ID.",
    "string.length": "Invalid Category ID.",
    "any.required": "Category is required.",
  }),

  subCategoryName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Sub Category Name is required.",
      "string.min": "Sub Category Name must be at least 2 characters.",
      "string.max": "Sub Category Name cannot exceed 100 characters.",
      "any.required": "Sub Category Name is required.",
    }),

  description: Joi.string().trim().allow("").max(500).messages({
    "string.max": "Description cannot exceed 500 characters.",
  }),

  image: Joi.string().trim().allow("").messages({
    "string.base": "Image must be a string.",
  }),

  displayOrder: Joi.number().integer().min(0).default(0).messages({
    "number.base": "Display Order must be a number.",
    "number.integer": "Display Order must be an integer.",
    "number.min": "Display Order cannot be negative.",
  }),
});

/**
 * Update Material Sub Category Validation
 */
export const updateMaterialSubCategoryValidation = Joi.object({
  subCategoryCode: Joi.string()
    .trim()
    .uppercase()
    .min(2)
    .max(20)
    .messages({
      "string.min": "Sub Category Code must be at least 2 characters.",
      "string.max": "Sub Category Code cannot exceed 20 characters.",
    }),

  categoryId: Joi.string().hex().length(24).messages({
    "string.hex": "Invalid Category ID.",
    "string.length": "Invalid Category ID.",
  }),

  subCategoryName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .messages({
      "string.min": "Sub Category Name must be at least 2 characters.",
      "string.max": "Sub Category Name cannot exceed 100 characters.",
    }),

  description: Joi.string().trim().allow("").max(500).messages({
    "string.max": "Description cannot exceed 500 characters.",
  }),

  image: Joi.string().trim().allow("").messages({
    "string.base": "Image must be a string.",
  }),

  displayOrder: Joi.number().integer().min(0).messages({
    "number.base": "Display Order must be a number.",
    "number.integer": "Display Order must be an integer.",
    "number.min": "Display Order cannot be negative.",
  }),

  isActive: Joi.boolean().messages({
    "boolean.base": "isActive must be true or false.",
  }),
});

/**
 * Material Sub Category ID Validation
 */
export const materialSubCategoryIdValidation = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.empty": "Material Sub Category ID is required.",
    "string.hex": "Invalid Material Sub Category ID.",
    "string.length": "Invalid Material Sub Category ID.",
    "any.required": "Material Sub Category ID is required.",
  }),
});

/**
 * Search Material Sub Categories Validation
 */
export const searchMaterialSubCategoryValidation = Joi.object({
  keyword: Joi.string().trim().allow("").optional(),

  categoryId: Joi.string().hex().length(24).optional().messages({
    "string.hex": "Invalid Category ID.",
    "string.length": "Invalid Category ID.",
  }),

  isActive: Joi.boolean().optional(),

  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page must be a number.",
    "number.integer": "Page must be an integer.",
    "number.min": "Page must be at least 1.",
  }),

  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number.",
    "number.integer": "Limit must be an integer.",
    "number.min": "Limit must be at least 1.",
    "number.max": "Limit cannot exceed 100.",
  }),
});