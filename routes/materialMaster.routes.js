import express from "express";

import validate from "../middlewares/validation.middleware.js";

import {
  createMaterialMasterValidation,
  updateMaterialMasterValidation,
  materialMasterIdValidation,
} from "../validation/materialMaster.validation.js";

import {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  activateMaterial,
  deactivateMaterial,
} from "../controllers/materialMaster.controller.js";

const router = express.Router();

/**
 * Create Material
 */
router.post(
  "/create",
  validate(createMaterialMasterValidation),
  createMaterial
);

/**
 * Get All Materials
 */
router.get("/getAll", getAllMaterials);

/**
 * Get Material By ID
 */
router.get(
  "/getById/:id",
  validate(materialMasterIdValidation, "params"),
  getMaterialById
);

/**
 * Update Material
 */
router.put(
  "/update/:id",
  validate(materialMasterIdValidation, "params"),
  validate(updateMaterialMasterValidation),
  updateMaterial
);

/**
 * Activate Material
 */
router.patch(
  "/activate/:id",
  validate(materialMasterIdValidation, "params"),
  activateMaterial
);

/**
 * Deactivate Material
 */
router.patch(
  "/deactivate/:id",
  validate(materialMasterIdValidation, "params"),
  deactivateMaterial
);

export default router;