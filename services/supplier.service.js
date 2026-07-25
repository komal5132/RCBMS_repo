import Supplier from "../models/supplier.model.js";

/**
 * Create Supplier
 */
export const createSupplier = async (data) => {
  // Check duplicate supplier code
  const existingCode = await Supplier.findOne({
    supplierCode: data.supplierCode,
  });

  if (existingCode) {
    throw new Error("Supplier Code already exists.");
  }

  // Check duplicate supplier name
  const existingName = await Supplier.findOne({
    supplierName: data.supplierName,
  });

  if (existingName) {
    throw new Error("Supplier Name already exists.");
  }

  // Check duplicate GST Number (if provided)
  if (data.gstNumber) {
    const existingGST = await Supplier.findOne({
      gstNumber: data.gstNumber,
    });

    if (existingGST) {
      throw new Error("GST Number already exists.");
    }
  }

  // Check duplicate PAN Number (if provided)
  if (data.panNumber) {
    const existingPAN = await Supplier.findOne({
      panNumber: data.panNumber,
    });

    if (existingPAN) {
      throw new Error("PAN Number already exists.");
    }
  }

  const supplier = await Supplier.create(data);

  return supplier;
};

/**
 * Get All Suppliers
 */
export const getAllSuppliers = async () => {
  return await Supplier.find().sort({
    supplierName: 1,
  });
};

/**
 * Get Supplier By ID
 */
export const getSupplierById = async (id) => {
  const supplier = await Supplier.findById(id);

  if (!supplier) {
    throw new Error("Supplier not found.");
  }

  return supplier;
};

/**
 * Update Supplier
 */
export const updateSupplier = async (id, data) => {
  const supplier = await Supplier.findById(id);

  if (!supplier) {
    throw new Error("Supplier not found.");
  }

  // Check duplicate supplier code
  if (data.supplierCode) {
    const existingCode = await Supplier.findOne({
      supplierCode: data.supplierCode,
      _id: { $ne: id },
    });

    if (existingCode) {
      throw new Error("Supplier Code already exists.");
    }
  }

  // Check duplicate supplier name
  if (data.supplierName) {
    const existingName = await Supplier.findOne({
      supplierName: data.supplierName,
      _id: { $ne: id },
    });

    if (existingName) {
      throw new Error("Supplier Name already exists.");
    }
  }

  // Check duplicate GST
  if (data.gstNumber) {
    const existingGST = await Supplier.findOne({
      gstNumber: data.gstNumber,
      _id: { $ne: id },
    });

    if (existingGST) {
      throw new Error("GST Number already exists.");
    }
  }

  // Check duplicate PAN
  if (data.panNumber) {
    const existingPAN = await Supplier.findOne({
      panNumber: data.panNumber,
      _id: { $ne: id },
    });

    if (existingPAN) {
      throw new Error("PAN Number already exists.");
    }
  }

  const updatedSupplier = await Supplier.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return updatedSupplier;
};

/**
 * Activate Supplier
 */
export const activateSupplier = async (id) => {
  const supplier = await Supplier.findById(id);

  if (!supplier) {
    throw new Error("Supplier not found.");
  }

  if (supplier.isActive) {
    throw new Error("Supplier is already active.");
  }

  supplier.isActive = true;

  await supplier.save();

  return supplier;
};

/**
 * Deactivate Supplier
 */
export const deactivateSupplier = async (id) => {
  const supplier = await Supplier.findById(id);

  if (!supplier) {
    throw new Error("Supplier not found.");
  }

  if (!supplier.isActive) {
    throw new Error("Supplier is already inactive.");
  }

  /*
    Future Business Validation

    When Purchase Module is developed,
    check whether supplier has purchase records.

    Example:

    const purchaseExists = await Purchase.exists({
        supplierId: id,
    });

    if (purchaseExists) {
        throw new Error(
            "Supplier cannot be deactivated because purchase records exist."
        );
    }
  */

  supplier.isActive = false;

  await supplier.save();

  return supplier;
};

/**
 * Search Supplier
 */
export const searchSupplier = async (keyword) => {
  return await Supplier.find({
    $or: [
      {
        supplierName: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        supplierCode: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        mobile: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        gstNumber: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
  }).sort({
    supplierName: 1,
  });
};