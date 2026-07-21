import * as materialCategoryService from "../../services/masterDataServices/materialCategory.service.js";

/**
 * Create Material Category
 */
export const createMaterialCategory = async (req, res) => {
  try {
    const category = await materialCategoryService.createMaterialCategory(
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Material category created successfully.",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Material Categories
 */
export const getAllMaterialCategories = async (req, res) => {
  try {
    const categories =
      await materialCategoryService.getAllMaterialCategories();

    return res.status(200).json({
      success: true,
      message: "Material categories fetched successfully.",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Material Category By ID
 */
export const getMaterialCategoryById = async (req, res) => {
  try {
    const category =
      await materialCategoryService.getMaterialCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Material category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Material category fetched successfully.",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Material Category
 */
export const updateMaterialCategory = async (req, res) => {
  try {
    const updatedCategory =
      await materialCategoryService.updateMaterialCategory(
        req.params.id,
        req.body
      );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Material category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Material category updated successfully.",
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Activate Material Category
 */
export const activateMaterialCategory = async (req, res) => {
  try {
    const category =
      await materialCategoryService.activateMaterialCategory(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Material category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Material category activated successfully.",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Deactivate Material Category
 */
export const deactivateMaterialCategory = async (req, res) => {
  try {
    const category =
      await materialCategoryService.deactivateMaterialCategory(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Material category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Material category deactivated successfully.",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Search Material Categories
 */
export const searchMaterialCategories = async (req, res) => {
  try {
    const result = await materialCategoryService.searchMaterialCategories(
      req.query
    );

    return res.status(200).json({
      success: true,
      message: "Material categories fetched successfully.",
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};