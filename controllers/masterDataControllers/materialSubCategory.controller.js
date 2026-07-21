import * as materialSubCategoryService from "../../services/masterDataServices/materialSubCategory.service.js";

/**
 * Create Material Sub Category
 */
export const createMaterialSubCategory = async (req, res) => {
  try {
    const subCategory =
      await materialSubCategoryService.createMaterialSubCategory(req.body);

    return res.status(201).json({
      success: true,
      message: "Material Sub Category created successfully.",
      data: subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Material Sub Category
 */
export const updateMaterialSubCategory = async (req, res) => {
  try {
    const subCategory =
      await materialSubCategoryService.updateMaterialSubCategory(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Material Sub Category updated successfully.",
      data: subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Material Sub Categories
 */
export const getAllMaterialSubCategories = async (req, res) => {
  try {
    const subCategories =
      await materialSubCategoryService.getAllMaterialSubCategories();

    return res.status(200).json({
      success: true,
      message: "Material Sub Categories fetched successfully.",
      count: subCategories.length,
      data: subCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Material Sub Category By ID
 */
export const getMaterialSubCategoryById = async (req, res) => {
  try {
    const subCategory =
      await materialSubCategoryService.getMaterialSubCategoryById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: "Material Sub Category fetched successfully.",
      data: subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Activate Material Sub Category
 */
export const activateMaterialSubCategory = async (req, res) => {
  try {
    const subCategory =
      await materialSubCategoryService.activateMaterialSubCategory(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: "Material Sub Category activated successfully.",
      data: subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Deactivate Material Sub Category
 */
export const deactivateMaterialSubCategory = async (req, res) => {
  try {
    const subCategory =
      await materialSubCategoryService.deactivateMaterialSubCategory(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: "Material Sub Category deactivated successfully.",
      data: subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Search Material Sub Categories
 */
export const searchMaterialSubCategories = async (req, res) => {
  try {
    const result =
      await materialSubCategoryService.searchMaterialSubCategories(req.query);

    return res.status(200).json({
      success: true,
      message: "Material Sub Categories fetched successfully.",
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};