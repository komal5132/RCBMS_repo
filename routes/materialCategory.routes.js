import express from "express";

import {
  createMaterialCategory,
  updateMaterialCategory,
  getAllMaterialCategories,
  getMaterialCategoryById,
  activateMaterialCategory,
  deactivateMaterialCategory,
  searchMaterialCategories,
} from "../controllers/materialCategory.controller.js";

import validate from "../middlewares/validation.middleware.js";

import {
  createMaterialCategoryValidation,
  updateMaterialCategoryValidation,
  searchMaterialCategoryValidation,
  materialCategoryIdValidation,
} from "../validation/MasterData_validation/materialCategory.validation.js";

const router = express.Router();

/**
 * Create Material Category
 */
router.post(
  "/create",
  validate(createMaterialCategoryValidation),
  createMaterialCategory
);

/**
 * Get All Material Categories
 */
router.get("/getAll", getAllMaterialCategories);

/**
 * Search Material Categories
 */
router.get(
  "/search",
  validate(searchMaterialCategoryValidation, "query"),
  searchMaterialCategories
);

/**
 * Get Material Category By ID
 */
router.get(
  "/getById:id",
  validate(materialCategoryIdValidation, "params"),
  getMaterialCategoryById
);

/**
 * Update Material Category
 */
router.put(
  "/update:id",
  validate(materialCategoryIdValidation, "params"),
  validate(updateMaterialCategoryValidation),
  updateMaterialCategory
);

/**
 * Activate Material Category
 */
router.patch(
  "/:id/activate",
  validate(materialCategoryIdValidation, "params"),
  activateMaterialCategory
);

/**
 * Deactivate Material Category
 */
router.patch(
  "/:id/deactivate",
  validate(materialCategoryIdValidation, "params"),
  deactivateMaterialCategory
);

export default router;