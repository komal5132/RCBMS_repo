import * as supplierService from "../services/supplier.service.js";

/**
 * Create Supplier
 */
export const createSupplier = async (req, res) => {
  try {
    const supplier = await supplierService.createSupplier(req.body);

    return res.status(201).json({
      success: true,
      message: "Supplier created successfully.",
      data: supplier,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Suppliers
 */
export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();

    return res.status(200).json({
      success: true,
      count: suppliers.length,
      data: suppliers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Supplier By ID
 */
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await supplierService.getSupplierById(req.params.id);

    return res.status(200).json({
      success: true,
      data: supplier,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Supplier
 */
export const updateSupplier = async (req, res) => {
  try {
    const supplier = await supplierService.updateSupplier(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Supplier updated successfully.",
      data: supplier,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Activate Supplier
 */
export const activateSupplier = async (req, res) => {
  try {
    const supplier = await supplierService.activateSupplier(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Supplier activated successfully.",
      data: supplier,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Deactivate Supplier
 */
export const deactivateSupplier = async (req, res) => {
  try {
    const supplier = await supplierService.deactivateSupplier(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Supplier deactivated successfully.",
      data: supplier,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Search Supplier
 */
export const searchSupplier = async (req, res) => {
  try {
    const { keyword } = req.query;

    const suppliers = await supplierService.searchSupplier(keyword || "");

    return res.status(200).json({
      success: true,
      count: suppliers.length,
      data: suppliers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};