import MaterialSubCategory from "../../models/MasterData_Models/materialSubCategory.js";
import MaterialCategory from "../../models/MasterData_Models/materialCategory.model.js";

/**
 * Create Material Sub Category
 */
export const createMaterialSubCategory = async (data) => {
  // Check duplicate sub category code
  const existingCode = await MaterialSubCategory.findOne({
    subCategoryCode: data.subCategoryCode,
  });

  if (existingCode) {
    throw new Error("Sub Category Code already exists.");
  }

  // Check category exists
  const category = await MaterialCategory.findById(data.categoryId);

  if (!category) {
    throw new Error("Material Category not found.");
  }

  // Check category is active
  if (!category.isActive) {
    throw new Error("Cannot create Sub Category under an inactive Material Category.");
  }

  // Check duplicate name within same category
  const existingName = await MaterialSubCategory.findOne({
    categoryId: data.categoryId,
    subCategoryName: data.subCategoryName,
  });

  if (existingName) {
    throw new Error("Sub Category Name already exists in this Material Category.");
  }

  // Create
  const materialSubCategory = await MaterialSubCategory.create(data);

  return materialSubCategory;
};

/**
 * Update Material Sub Category
 */
export const updateMaterialSubCategory = async (id, data) => {
  const materialSubCategory = await MaterialSubCategory.findById(id);

  if (!materialSubCategory) {
    throw new Error("Material Sub Category not found.");
  }

  // If category changed, verify it exists and is active
  if (data.categoryId) {
    const category = await MaterialCategory.findById(data.categoryId);

    if (!category) {
      throw new Error("Material Category not found.");
    }

    if (!category.isActive) {
      throw new Error(
        "Cannot assign an inactive Material Category."
      );
    }
  }

  // Check duplicate code
  if (data.subCategoryCode) {
    const existingCode = await MaterialSubCategory.findOne({
      subCategoryCode: data.subCategoryCode,
      _id: { $ne: id },
    });

    if (existingCode) {
      throw new Error("Sub Category Code already exists.");
    }
  }

  // Check duplicate name in same category
  if (data.subCategoryName || data.categoryId) {
    const categoryId = data.categoryId || materialSubCategory.categoryId;
    const subCategoryName =
      data.subCategoryName || materialSubCategory.subCategoryName;

    const existingName = await MaterialSubCategory.findOne({
      categoryId,
      subCategoryName,
      _id: { $ne: id },
    });

    if (existingName) {
      throw new Error(
        "Sub Category Name already exists in this Material Category."
      );
    }
  }

  const updatedMaterialSubCategory =
    await MaterialSubCategory.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("categoryId", "categoryName categoryCode");

  return updatedMaterialSubCategory;
};

/**
 * Get All Material Sub Categories
 */
export const getAllMaterialSubCategories = async () => {
  return await MaterialSubCategory.find()
    .populate("categoryId", "categoryName categoryCode")
    .sort({ displayOrder: 1, subCategoryName: 1 });
};

/**
 * Get Material Sub Category By ID
 */
export const getMaterialSubCategoryById = async (id) => {
  const materialSubCategory = await MaterialSubCategory.findById(id).populate(
    "categoryId",
    "categoryName categoryCode"
  );

  if (!materialSubCategory) {
    throw new Error("Material Sub Category not found.");
  }

  return materialSubCategory;
};

/**
 * Activate Material Sub Category
 */
export const activateMaterialSubCategory = async (id) => {
  const materialSubCategory = await MaterialSubCategory.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true }
  );

  if (!materialSubCategory) {
    throw new Error("Material Sub Category not found.");
  }

  return materialSubCategory;
};

/**
 * Deactivate Material Sub Category
 */
export const deactivateMaterialSubCategory = async (id) => {
  const materialSubCategory = await MaterialSubCategory.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  if (!materialSubCategory) {
    throw new Error("Material Sub Category not found.");
  }

  return materialSubCategory;
};

/**
 * Search Material Sub Categories
 */
export const searchMaterialSubCategories = async ({
  keyword = "",
  categoryId,
  isActive,
  page = 1,
  limit = 10,
}) => {
  const query = {};

  if (keyword) {
    query.$or = [
      {
        subCategoryName: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        subCategoryCode: {
          $regex: keyword,
          $options: "i",
        },
      },
    ];
  }

  if (categoryId) {
    query.categoryId = categoryId;
  }

  if (typeof isActive === "boolean") {
    query.isActive = isActive;
  }

  const skip = (page - 1) * limit;

  const total = await MaterialSubCategory.countDocuments(query);

  const data = await MaterialSubCategory.find(query)
    .populate("categoryId", "categoryName categoryCode")
    .sort({ displayOrder: 1, subCategoryName: 1 })
    .skip(skip)
    .limit(limit);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data,
  };
};