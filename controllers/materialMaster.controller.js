import * as materialMasterService from "../services/materialMaster.service.js";

/**
 * Create Material
 */
export const createMaterial = async (req, res) => {
  try {
    const material = await materialMasterService.createMaterial(req.body);

    return res.status(201).json({
      success: true,
      message: "Material created successfully.",
      data: material,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Materials
 */
export const getAllMaterials = async (req, res) => {
  try {
    const materials = await materialMasterService.getAllMaterials();

    return res.status(200).json({
      success: true,
      count: materials.length,
      data: materials,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Material By ID
 */
export const getMaterialById = async (req, res) => {
  try {
    const material = await materialMasterService.getMaterialById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data: material,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Material
 */
export const updateMaterial = async (req, res) => {
  try {
    const material = await materialMasterService.updateMaterial(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Material updated successfully.",
      data: material,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Activate Material
 */
export const activateMaterial = async (req, res) => {
  try {
    const material = await materialMasterService.activateMaterial(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Material activated successfully.",
      data: material,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Deactivate Material
 */
export const deactivateMaterial = async (req, res) => {
  try {
    const material = await materialMasterService.deactivateMaterial(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Material deactivated successfully.",
      data: material,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};