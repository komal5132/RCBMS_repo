import Joi from "joi";

/**
 * Create Unit Of Measure Validation
 */
export const createUnitOfMeasureValidation = Joi.object({
  unitCode: Joi.string()
    .trim()
    .uppercase()
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.empty": "Unit code is required.",
      "string.min": "Unit code must be at least 2 characters.",
      "string.max": "Unit code cannot exceed 20 characters.",
      "any.required": "Unit code is required.",
    }),

  unitName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Unit name is required.",
      "string.min": "Unit name must be at least 2 characters.",
      "string.max": "Unit name cannot exceed 50 characters.",
      "any.required": "Unit name is required.",
    }),

  shortName: Joi.string()
    .trim()
    .uppercase()
    .min(1)
    .max(10)
    .required()
    .messages({
      "string.empty": "Short name is required.",
      "string.min": "Short name must be at least 1 character.",
      "string.max": "Short name cannot exceed 10 characters.",
      "any.required": "Short name is required.",
    }),

  unitType: Joi.string()
    .valid("COUNT", "WEIGHT", "LENGTH", "VOLUME")
    .required()
    .messages({
      "any.only":
        "Unit type must be COUNT, WEIGHT, LENGTH, or VOLUME.",
      "any.required": "Unit type is required.",
    }),

  baseUnit: Joi.boolean().optional(),

  conversionFactor: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Conversion factor must be a number.",
      "number.positive": "Conversion factor must be greater than 0.",
      "any.required": "Conversion factor is required.",
    }),

  description: Joi.string()
    .trim()
    .allow("")
    .max(500)
    .optional()
    .messages({
      "string.max": "Description cannot exceed 500 characters.",
    }),

  displayOrder: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      "number.base": "Display order must be a number.",
      "number.integer": "Display order must be an integer.",
      "number.min": "Display order cannot be negative.",
    }),

  isActive: Joi.boolean().optional(),
});

/**
 * Update Unit Of Measure Validation
 */
export const updateUnitOfMeasureValidation = Joi.object({
  unitCode: Joi.string()
    .trim()
    .uppercase()
    .min(2)
    .max(20)
    .optional(),

  unitName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

  shortName: Joi.string()
    .trim()
    .uppercase()
    .min(1)
    .max(10)
    .optional(),

  unitType: Joi.string()
    .valid("COUNT", "WEIGHT", "LENGTH", "VOLUME")
    .optional(),

  baseUnit: Joi.boolean().optional(),

  conversionFactor: Joi.number()
    .positive()
    .optional(),

  description: Joi.string()
    .trim()
    .allow("")
    .max(500)
    .optional(),

  displayOrder: Joi.number()
    .integer()
    .min(0)
    .optional(),

  isActive: Joi.boolean().optional(),
});

/**
 * MongoDB ID Validation
 */
export const unitOfMeasureIdValidation = Joi.object({
  id: Joi.string().length(24).hex().required().messages({
    "string.length": "Invalid Unit Of Measure ID.",
    "string.hex": "Invalid Unit Of Measure ID.",
    "any.required": "Unit Of Measure ID is required.",
  }),
});