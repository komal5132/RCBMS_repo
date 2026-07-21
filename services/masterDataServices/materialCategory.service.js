import MaterialCategory from "../../models/MasterData_Models/materialCategory.model.js";

/**
 * Create Material Category
 */
export const createMaterialCategory = async (data) => {
  return await MaterialCategory.create(data);
};

/**
 * Get All Material Categories
 */
export const getAllMaterialCategories = async () => {
  return await MaterialCategory.find().sort({
    displayOrder: 1,
    categoryName: 1,
  });
};

/**
 * Get Material Category By ID
 */
export const getMaterialCategoryById = async (id) => {
  return await MaterialCategory.findById(id);
};

/**
 * Update Material Category
 */
export const updateMaterialCategory = async (id, data) => {
  return await MaterialCategory.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

/**
 * Activate Material Category
 */
export const activateMaterialCategory = async (id) => {
  return await MaterialCategory.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true }
  );
};

/**
 * Deactivate Material Category
 */
export const deactivateMaterialCategory = async (id) => {
  return await MaterialCategory.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
};

/**
 * Search Material Categories
 */
export const searchMaterialCategories = async ({
  search = "",
  page = 1,
  limit = 10,
  sortBy = "displayOrder",
  sortOrder = "asc",
}) => {
  const query = {};

  if (search) {
    query.$or = [
      { categoryName: { $regex: search, $options: "i" } },
      { categoryCode: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const sort = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  const totalRecords = await MaterialCategory.countDocuments(query);

  const data = await MaterialCategory.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    totalRecords,
    currentPage: page,
    totalPages: Math.ceil(totalRecords / limit),
    pageSize: limit,
    data,
  };
};