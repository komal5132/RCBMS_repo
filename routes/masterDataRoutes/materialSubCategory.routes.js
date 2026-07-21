import express from "express";

import {
  createMaterialSubCategory,
  updateMaterialSubCategory,
  getAllMaterialSubCategories,
  getMaterialSubCategoryById,
  activateMaterialSubCategory,
  deactivateMaterialSubCategory,
  searchMaterialSubCategories,
} from "../../controllers/masterDataControllers/materialSubCategory.controller.js";

import validate from "../../middlewares/validation.middleware.js";

import {
  createMaterialSubCategoryValidation,
  updateMaterialSubCategoryValidation,
  materialSubCategoryIdValidation,
  searchMaterialSubCategoryValidation,
} from "../../validation/MasterData_validation/materialSubCategory.validation.js";

const router = express.Router();

/**
 * Create Material Sub Category
 */
router.post(
  "/create",
  validate(createMaterialSubCategoryValidation),
  createMaterialSubCategory
);

/**
 * Update Material Sub Category
 */
router.put(
  "/update/:id",
  validate(materialSubCategoryIdValidation, "params"),
  validate(updateMaterialSubCategoryValidation),
  updateMaterialSubCategory
);

/**
 * Get All Material Sub Categories
 */
router.get("/getAll", getAllMaterialSubCategories);

/**
 * Get Material Sub Category By ID
 */
router.get(
  "/getById/:id",
  validate(materialSubCategoryIdValidation, "params"),
  getMaterialSubCategoryById
);

/**
 * Activate Material Sub Category
 */
router.patch(
  "/activate/:id",
  validate(materialSubCategoryIdValidation, "params"),
  activateMaterialSubCategory
);

/**
 * Deactivate Material Sub Category
 */
router.patch(
  "/deactivate/:id",
  validate(materialSubCategoryIdValidation, "params"),
  deactivateMaterialSubCategory
);

/**
 * Search Material Sub Categories
 */
router.get(
  "/search",
  validate(searchMaterialSubCategoryValidation, "query"),
  searchMaterialSubCategories
);

export default router;