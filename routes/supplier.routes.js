import express from "express";

import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  activateSupplier,
  deactivateSupplier,
  searchSupplier,
} from "../controllers/supplier.controller.js";

import validate from "../middlewares/validation.middleware.js";

import {
  createSupplierValidation,
  updateSupplierValidation,
  supplierIdValidation,
  searchSupplierValidation,
} from "../validation/supplier.validation.js";

const router = express.Router();

/**
 * Create Supplier
 */
router.post(
  "/create",
  validate(createSupplierValidation),
  createSupplier
);

/**
 * Get All Suppliers
 */
router.get("/getAll", getAllSuppliers);

/**
 * Search Supplier
 */
router.get(
  "/search",
  validate(searchSupplierValidation, "query"),
  searchSupplier
);

/**
 * Get Supplier By ID
 */
router.get(
  "/getById/:id",
  validate(supplierIdValidation, "params"),
  getSupplierById
);

/**
 * Update Supplier
 */
router.put(
  "/update/:id",
  validate(supplierIdValidation, "params"),
  validate(updateSupplierValidation),
  updateSupplier
);

/**
 * Activate Supplier
 */
router.patch(
  "/activate/:id",
  validate(supplierIdValidation, "params"),
  activateSupplier
);

/**
 * Deactivate Supplier
 */
router.patch(
  "/deactivate/:id",
  validate(supplierIdValidation, "params"),
  deactivateSupplier
);

export default router;