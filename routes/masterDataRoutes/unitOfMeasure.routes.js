import express from "express";
import validate from "../../middlewares/validation.middleware.js";

import {
  createUnitOfMeasureValidation,
  updateUnitOfMeasureValidation,
  unitOfMeasureIdValidation,
} from "../../validation/MasterData_validation/unitOfMeasure.validation.js";

import {
  createUnitOfMeasure,
  getAllUnitOfMeasures,
  getUnitOfMeasureById,
  updateUnitOfMeasure,
  activateUnitOfMeasure,
  deactivateUnitOfMeasure,
  searchUnitOfMeasures,
} from "../../controllers/masterDataControllers/unitOfMeasure.controller.js";

const router = express.Router();

/**
 * Create Unit Of Measure
 */
router.post(
  "/create",
  validate(createUnitOfMeasureValidation),
  createUnitOfMeasure
);

/**
 * Get All Unit Of Measures
 */
router.get("/getAll", getAllUnitOfMeasures);

/**
 * Search Unit Of Measures
 */
router.get("/search", searchUnitOfMeasures);

/**
 * Get Unit Of Measure By ID
 */
router.get(
  "/getById/:id",
  validate(unitOfMeasureIdValidation, "params"),
  getUnitOfMeasureById
);

/**
 * Update Unit Of Measure
 */
router.put(
  "/update/:id",
  validate(unitOfMeasureIdValidation, "params"),
  validate(updateUnitOfMeasureValidation),
  updateUnitOfMeasure
);

/**
 * Activate Unit Of Measure
 */
router.patch(
  "/:id/activate",
  validate(unitOfMeasureIdValidation, "params"),
  activateUnitOfMeasure
);

/**
 * Deactivate Unit Of Measure
 */
router.patch(
  "/:id/deactivate",
  validate(unitOfMeasureIdValidation, "params"),
  deactivateUnitOfMeasure
);

export default router;