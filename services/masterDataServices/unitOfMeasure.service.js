import UnitOfMeasure from "../../models/MasterData_Models/unitOfMeasure.js";

/**
 * Create Unit Of Measure
 */
export const createUnitOfMeasure = async (data) => {
  // Check duplicate Unit Code
  const existingCode = await UnitOfMeasure.findOne({
    unitCode: data.unitCode,
  });

  if (existingCode) {
    throw new Error("Unit Code already exists.");
  }

  // Check duplicate Unit Name
  const existingName = await UnitOfMeasure.findOne({
    unitName: data.unitName,
  });

  if (existingName) {
    throw new Error("Unit Name already exists.");
  }

  // Check duplicate Short Name
  const existingShortName = await UnitOfMeasure.findOne({
    shortName: data.shortName,
  });

  if (existingShortName) {
    throw new Error("Short Name already exists.");
  }

  // Only one Base Unit per Unit Type
  if (data.baseUnit === true) {
    const existingBaseUnit = await UnitOfMeasure.findOne({
      unitType: data.unitType,
      baseUnit: true,
    });

    if (existingBaseUnit) {
      throw new Error(
        `Base Unit already exists for ${data.unitType}.`
      );
    }
  }

  const unit = await UnitOfMeasure.create(data);

  return unit;
};

/**
 * Get All Unit Of Measures
 */
export const getAllUnitOfMeasures = async () => {
  return await UnitOfMeasure.find().sort({
    displayOrder: 1,
    unitName: 1,
  });
};

/**
 * Get Unit Of Measure By ID
 */
export const getUnitOfMeasureById = async (id) => {
  const unit = await UnitOfMeasure.findById(id);

  if (!unit) {
    throw new Error("Unit Of Measure not found.");
  }

  return unit;
};

/**
 * Update Unit Of Measure
 */
export const updateUnitOfMeasure = async (id, data) => {
  const unit = await UnitOfMeasure.findById(id);

  if (!unit) {
    throw new Error("Unit Of Measure not found.");
  }

  // Check duplicate Unit Code
  if (data.unitCode) {
    const existingCode = await UnitOfMeasure.findOne({
      unitCode: data.unitCode,
      _id: { $ne: id },
    });

    if (existingCode) {
      throw new Error("Unit Code already exists.");
    }
  }

  // Check duplicate Unit Name
  if (data.unitName) {
    const existingName = await UnitOfMeasure.findOne({
      unitName: data.unitName,
      _id: { $ne: id },
    });

    if (existingName) {
      throw new Error("Unit Name already exists.");
    }
  }

  // Check duplicate Short Name
  if (data.shortName) {
    const existingShortName = await UnitOfMeasure.findOne({
      shortName: data.shortName,
      _id: { $ne: id },
    });

    if (existingShortName) {
      throw new Error("Short Name already exists.");
    }
  }

  // Only one Base Unit per Unit Type
  if (data.baseUnit === true) {
    const existingBaseUnit = await UnitOfMeasure.findOne({
      unitType: data.unitType || unit.unitType,
      baseUnit: true,
      _id: { $ne: id },
    });

    if (existingBaseUnit) {
      throw new Error(
        `Base Unit already exists for ${
          data.unitType || unit.unitType
        }.`
      );
    }
  }

  const updatedUnit = await UnitOfMeasure.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedUnit;
};

/**
 * Activate Unit Of Measure
 */
export const activateUnitOfMeasure = async (id) => {
  const unit = await UnitOfMeasure.findById(id);

  if (!unit) {
    throw new Error("Unit Of Measure not found.");
  }

  unit.isActive = true;

  await unit.save();

  return unit;
};

/**
 * Deactivate Unit Of Measure
 */
export const deactivateUnitOfMeasure = async (id) => {
  const unit = await UnitOfMeasure.findById(id);

  if (!unit) {
    throw new Error("Unit Of Measure not found.");
  }

  unit.isActive = false;

  await unit.save();

  return unit;
};

/**
 * Search Unit Of Measures
 */
export const searchUnitOfMeasures = async (search) => {
  return await UnitOfMeasure.find({
    $or: [
      {
        unitCode: {
          $regex: search,
          $options: "i",
        },
      },
      {
        unitName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        shortName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        unitType: {
          $regex: search,
          $options: "i",
        },
      },
    ],
  }).sort({
    displayOrder: 1,
    unitName: 1,
  });
};