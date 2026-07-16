import Joi from "joi";
import mongoose from "mongoose";

/**
 * Create Material Category Validation
 */
export const createMaterialCategoryValidation = Joi.object({
  categoryCode: Joi.string()
    .trim()
    .uppercase()
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.empty": "Category code is required.",
      "string.min": "Category code must be at least 2 characters.",
      "string.max": "Category code cannot exceed 20 characters.",
      "any.required": "Category code is required.",
    }),

  categoryName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Category name is required.",
      "string.min": "Category name must be at least 2 characters.",
      "string.max": "Category name cannot exceed 100 characters.",
      "any.required": "Category name is required.",
    }),

  description: Joi.string()
    .trim()
    .allow("")
    .max(500)
    .optional(),

  image: Joi.string()
    .trim()
    .allow("")
    .optional(),

  displayOrder: Joi.number()
    .integer()
    .min(0)
    .optional(),

  isActive: Joi.boolean().optional(),
});

/**
 * Update Material Category Validation
 */
export const updateMaterialCategoryValidation = Joi.object({
  categoryCode: Joi.string()
    .trim()
    .uppercase()
    .min(2)
    .max(20)
    .optional(),

  categoryName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  description: Joi.string()
    .trim()
    .allow("")
    .max(500)
    .optional(),

  image: Joi.string()
    .trim()
    .allow("")
    .optional(),

  displayOrder: Joi.number()
    .integer()
    .min(0)
    .optional(),

  isActive: Joi.boolean().optional(),
});

/**
 * Search Material Category Validation
 */
export const searchMaterialCategoryValidation = Joi.object({
  search: Joi.string()
    .trim()
    .allow("")
    .optional(),

  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),

  sortBy: Joi.string()
    .valid(
      "categoryName",
      "categoryCode",
      "displayOrder",
      "createdAt"
    )
    .default("displayOrder"),

  sortOrder: Joi.string()
    .valid("asc", "desc")
    .default("asc"),
});

/**
 * MongoDB ObjectId Validation
 */
export const materialCategoryIdValidation = Joi.object({
  id: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid Material Category ID.");
      }
      return value;
    }),
});