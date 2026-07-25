import MaterialMaster from "../models/materialMaster.model.js";
import MaterialCategory from "../models/MasterData_Models/materialCategory.model.js";
import MaterialSubCategory from "../models/MasterData_Models/materialSubCategory.js";
import UnitOfMeasure from "../models/MasterData_Models/unitOfMeasure.js";

/**
 * Generate Material Code
 */
const generateMaterialCode = async () => {
  const lastMaterial = await MaterialMaster.findOne().sort({
    createdAt: -1,
  });

  let materialCode = "RM00001";

  if (lastMaterial) {
    const lastNumber = parseInt(
      lastMaterial.materialCode.replace("RM", ""),
      10
    );

    materialCode = `RM${String(lastNumber + 1).padStart(5, "0")}`;
  }

  return materialCode;
};

/**
 * Create Material
 */
export const createMaterial = async (data) => {
  // Generate Material Code
  data.materialCode = await generateMaterialCode();

  // Check Duplicate Material Name
  const existingMaterial = await MaterialMaster.findOne({
    materialName: data.materialName,
  });

  if (existingMaterial) {
    throw new Error("Material Name already exists.");
  }

  // Check Category Exists
  const category = await MaterialCategory.findById(data.categoryId);

  if (!category) {
    throw new Error("Material Category not found.");
  }

  // Check Sub Category Exists
  const subCategory = await MaterialSubCategory.findById(
    data.subCategoryId
  );

  if (!subCategory) {
    throw new Error("Material Sub Category not found.");
  }

  // Check Sub Category belongs to Category
  if (
    subCategory.categoryId.toString() !== data.categoryId.toString()
  ) {
    throw new Error(
      "Selected Sub Category does not belong to selected Category."
    );
  }

  // Check UOM Exists
  const uom = await UnitOfMeasure.findById(data.uomId);

  if (!uom) {
    throw new Error("Unit Of Measure not found.");
  }

  /**
   * Business Validations
   */

  // Maximum Stock >= Minimum Stock
  if (
    data.maximumStock > 0 &&
    data.maximumStock < data.minimumStock
  ) {
    throw new Error(
      "Maximum Stock cannot be less than Minimum Stock."
    );
  }

  // Reorder Level <= Maximum Stock
  if (
    data.maximumStock > 0 &&
    data.reorderLevel > data.maximumStock
  ) {
    throw new Error(
      "Reorder Level cannot be greater than Maximum Stock."
    );
  }

  // Create Material
  const material = await MaterialMaster.create(data);

  return material;
};

/**
 * Get All Materials
 */
export const getAllMaterials = async () => {
  return await MaterialMaster.find()
    .populate("categoryId", "categoryCode categoryName")
    .populate("subCategoryId", "subCategoryCode subCategoryName")
    .populate("uomId", "unitCode unitName")
    .sort({ displayOrder: 1, materialName: 1 });
};

/**
 * Get Material By Id
 */
export const getMaterialById = async (id) => {
  const material = await MaterialMaster.findById(id)
    .populate("categoryId", "categoryCode categoryName")
    .populate("subCategoryId", "subCategoryCode subCategoryName")
    .populate("uomId", "unitCode unitName");

  if (!material) {
    throw new Error("Material not found.");
  }

  return material;
};

/**
 * Update Material
 */
export const updateMaterial = async (id, data) => {
  const material = await MaterialMaster.findById(id);

  if (!material) {
    throw new Error("Material not found.");
  }

  // Duplicate Name Check
  if (data.materialName) {
    const existingMaterial = await MaterialMaster.findOne({
      materialName: data.materialName,
      _id: { $ne: id },
    });

    if (existingMaterial) {
      throw new Error("Material Name already exists.");
    }
  }

  // Category Validation
  if (data.categoryId) {
    const category = await MaterialCategory.findById(data.categoryId);

    if (!category) {
      throw new Error("Material Category not found.");
    }
  }

  // Sub Category Validation
  if (data.subCategoryId) {
    const subCategory = await MaterialSubCategory.findById(
      data.subCategoryId
    );

    if (!subCategory) {
      throw new Error("Material Sub Category not found.");
    }

    const categoryId = data.categoryId || material.categoryId;

    if (
      subCategory.categoryId.toString() !== categoryId.toString()
    ) {
      throw new Error(
        "Selected Sub Category does not belong to selected Category."
      );
    }
  }

  // UOM Validation
  if (data.uomId) {
    const uom = await UnitOfMeasure.findById(data.uomId);

    if (!uom) {
      throw new Error("Unit Of Measure not found.");
    }
  }

  // Business Validation
  const minimumStock =
    data.minimumStock ?? material.minimumStock;

  const maximumStock =
    data.maximumStock ?? material.maximumStock;

  const reorderLevel =
    data.reorderLevel ?? material.reorderLevel;

  if (
    maximumStock > 0 &&
    maximumStock < minimumStock
  ) {
    throw new Error(
      "Maximum Stock cannot be less than Minimum Stock."
    );
  }

  if (
    maximumStock > 0 &&
    reorderLevel > maximumStock
  ) {
    throw new Error(
      "Reorder Level cannot be greater than Maximum Stock."
    );
  }

  return await MaterialMaster.findByIdAndUpdate(id, data, {
    new: true,
  })
    .populate("categoryId", "categoryCode categoryName")
    .populate("subCategoryId", "subCategoryCode subCategoryName")
    .populate("uomId", "unitCode unitName");
};

/**
 * Activate Material
 */
export const activateMaterial = async (id) => {
  return await MaterialMaster.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true }
  );
};

/**
 * Deactivate Material
 */
export const deactivateMaterial = async (id) => {
  return await MaterialMaster.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
};