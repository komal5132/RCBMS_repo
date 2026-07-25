import MaterialMaster from "../../models/materialMaster.model.js";

// calculate Available Stock
export const calculateAvailableStock = (currentStock, reservedStock) => {
  currentStock = Number(currentStock) || 0;
  reservedStock = Number(reservedStock) || 0;

  const availableStock = currentStock - reservedStock;

  // Available stock should never be negative
  return availableStock < 0 ? 0 : availableStock;
};

/**
 * Get Stock Details of a Single Material
 *
 * @param {String} materialId
 * @returns {Object}
 */
export const getMaterialStock = async (materialId) => {
  // Check Material Exists
  const material = await MaterialMaster.findById(materialId)
    .populate("categoryId", "categoryName")
    .populate("subCategoryId", "subCategoryName")
    .populate("uomId", "unitName shortName");

  if (!material) {
    throw new Error("Material not found.");
  }

  // Calculate Available Stock
  const availableStock = calculateAvailableStock(
    material.currentStock,
    material.reservedStock,
  );

  return {
    materialId: material._id,
    materialCode: material.materialCode,
    materialName: material.materialName,

    category: material.categoryId,
    subCategory: material.subCategoryId,

    uom: material.uomId,

    currentStock: material.currentStock,
    reservedStock: material.reservedStock,
    availableStock,

    averageCost: material.averageCost,
    lastPurchaseCost: material.lastPurchaseCost,
    stockValue: material.currentStock * material.averageCost,

    minimumStock: material.minimumStock,
    reorderLevel: material.reorderLevel,
    maximumStock: material.maximumStock,

    status: material.status,
  };
};

/**
 * Get Materials Below Reorder Level
 *
 * Returns all active materials whose current stock
 * is less than or equal to the reorder level.
 */
export const getLowStock = async () => {
  const materials = await MaterialMaster.find({
    isActive: true,
    $expr: {
      $lte: ["$currentStock", "$reorderLevel"],
    },
  })
    .populate("categoryId", "categoryName")
    .populate("subCategoryId", "subCategoryName")
    .populate("uomId", "unitName shortName")
    .sort({ currentStock: 1 });

  return materials.map((material) => ({
    materialId: material._id,
    materialCode: material.materialCode,
    materialName: material.materialName,

    category: material.categoryId,
    subCategory: material.subCategoryId,
    uom: material.uomId,

    currentStock: material.currentStock,
    reservedStock: material.reservedStock,

    availableStock: calculateAvailableStock(
      material.currentStock,
      material.reservedStock,
    ),

    reorderLevel: material.reorderLevel,
    minimumStock: material.minimumStock,
    maximumStock: material.maximumStock,

    averageCost: material.averageCost,

    stockValue: material.currentStock * material.averageCost,
  }));
};

/**
 * Get Out Of Stock Materials
 *
 * Returns all active materials whose current stock is zero.
 */
export const getOutOfStock = async () => {
  const materials = await MaterialMaster.find({
    isActive: true,
    currentStock: 0,
  })
    .populate("categoryId", "categoryName")
    .populate("subCategoryId", "subCategoryName")
    .populate("uomId", "unitName shortName")
    .sort({ materialName: 1 });

  return materials.map((material) => ({
    materialId: material._id,
    materialCode: material.materialCode,
    materialName: material.materialName,

    category: material.categoryId,
    subCategory: material.subCategoryId,
    uom: material.uomId,

    currentStock: material.currentStock,
    reservedStock: material.reservedStock,

    availableStock: calculateAvailableStock(
      material.currentStock,
      material.reservedStock,
    ),

    reorderLevel: material.reorderLevel,
    minimumStock: material.minimumStock,
    maximumStock: material.maximumStock,

    averageCost: material.averageCost,

    stockValue: material.currentStock * material.averageCost,
  }));
};

/**
 * Get Materials with Negative Stock
 *
 * Returns all active materials whose current stock
 * is less than zero.
 */
export const getNegativeStock = async () => {
  const materials = await MaterialMaster.find({
    isActive: true,
    currentStock: { $lt: 0 },
  })
    .populate("categoryId", "categoryName")
    .populate("subCategoryId", "subCategoryName")
    .populate("uomId", "unitName shortName")
    .sort({ currentStock: 1 });

  return materials.map((material) => ({
    materialId: material._id,
    materialCode: material.materialCode,
    materialName: material.materialName,

    category: material.categoryId,
    subCategory: material.subCategoryId,
    uom: material.uomId,

    currentStock: material.currentStock,
    reservedStock: material.reservedStock,

    availableStock: calculateAvailableStock(
      material.currentStock,
      material.reservedStock,
    ),

    reorderLevel: material.reorderLevel,
    minimumStock: material.minimumStock,
    maximumStock: material.maximumStock,

    averageCost: material.averageCost,

    stockValue: material.currentStock * material.averageCost,
  }));
};

/**
 * Reserve Stock
 *
 * @param {String} materialId
 * @param {Number} quantity
 * @param {ClientSession} session (optional)
 * @returns {Object}
 */
export const reserveStock = async (materialId, quantity, session = null) => {
  // Get Material
  const material = await MaterialMaster.findById(materialId).session(session);

  if (!material) {
    throw new Error("Material not found.");
  }

  if (!material.isActive) {
    throw new Error("Material is inactive.");
  }

  // Calculate Available Stock
  const availableStock = calculateAvailableStock(
    material.currentStock,
    material.reservedStock,
  );

  // Business Validation
  if (quantity > availableStock) {
    throw new Error("Insufficient available stock.");
  }

  // Reserve Stock
  material.reservedStock += quantity;

  await material.save({ session });

  return {
    message: "Stock reserved successfully.",

    materialId: material._id,

    currentStock: material.currentStock,

    reservedStock: material.reservedStock,

    availableStock: calculateAvailableStock(
      material.currentStock,
      material.reservedStock,
    ),
  };
};

/**
 * Release Reserved Stock
 *
 * @param {String} materialId
 * @param {Number} quantity
 * @param {ClientSession} session (optional)
 * @returns {Object}
 */
export const releaseReservedStock = async (
  materialId,
  quantity,
  session = null,
) => {
  // Get Material
  const material = await MaterialMaster.findById(materialId).session(session);

  if (!material) {
    throw new Error("Material not found.");
  }

  if (!material.isActive) {
    throw new Error("Material is inactive.");
  }

  // Business Validation
  if (quantity > material.reservedStock) {
    throw new Error("Release quantity cannot be greater than reserved stock.");
  }

  // Release Reserved Stock
  material.reservedStock -= quantity;

  await material.save({ session });

  return {
    message: "Reserved stock released successfully.",

    materialId: material._id,

    currentStock: material.currentStock,

    reservedStock: material.reservedStock,

    availableStock: calculateAvailableStock(
      material.currentStock,
      material.reservedStock,
    ),
  };
};

/**
 * Update Inventory Summary
 *
 * Used internally by:
 * - Purchase
 * - Manufacturing
 * - Sales
 * - Stock Adjustment
 * - Opening Stock
 *
 * @param {Object} data
 * @param {ClientSession} session
 */

export const updateInventorySummary = async (data, session = null) => {
  const material = await MaterialMaster.findById(data.materialId).session(
    session,
  );

  if (!material) {
    throw new Error("Material not found.");
  }

  // Update Summary
  material.currentStock = data.currentStock;

  if (data.averageCost !== undefined) {
    material.averageCost = data.averageCost;
  }

  if (data.lastPurchaseCost !== undefined) {
    material.lastPurchaseCost = data.lastPurchaseCost;
  }

  if (data.lastPurchaseDate !== undefined) {
    material.lastPurchaseDate = data.lastPurchaseDate;
  }

  await material.save({ session });

  return material;
};

/**
 * Calculate Available Stock
 *
 * Formula:
 * Available Stock = Current Stock - Reserved Stock
 *
 * @param {Object} material
 * @returns {Number}
 */

// =======================================
// Update Material Inventory
// =======================================

export const updateMaterialInventory = async (
    materialId,
    quantity,
    purchaseRate
) => {

    const material = await MaterialMaster.findById(materialId);

    if (!material) {
        throw new Error("Material not found");
    }


    // --------------------------
    // Existing Inventory
    // --------------------------

    const oldStock = material.currentStock;

    const oldAverageCost = material.averageCost;

    const oldStockValue = oldStock * oldAverageCost;


    // --------------------------
    // New Purchase Value
    // --------------------------

    const purchaseValue = quantity * purchaseRate;

    const newStock = oldStock + quantity;

    const newStockValue = oldStockValue + purchaseValue;


    // --------------------------
    // Calculate Average Cost
    // --------------------------

    let newAverageCost = 0;

    if (newStock > 0) {

        newAverageCost =
            newStockValue / newStock;

    }


    // --------------------------
    // Update Material
    // --------------------------

    material.currentStock = newStock;

    material.averageCost = newAverageCost;

    material.lastPurchaseCost = purchaseRate;

    material.lastPurchaseQty = quantity;

    material.lastPurchaseDate = new Date();

    material.stockValue = newStockValue;


    await material.save();

    return material;

};