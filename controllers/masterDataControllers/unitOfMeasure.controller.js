import * as unitOfMeasureService from "../../services/masterDataServices/unitOfMeasure.service.js";

/**
 * Create Unit Of Measure
 */
export const createUnitOfMeasure = async (req, res) => {
  try {
    const unit = await unitOfMeasureService.createUnitOfMeasure(req.body);

    return res.status(201).json({
      success: true,
      message: "Unit Of Measure created successfully.",
      data: unit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Unit Of Measures
 */
export const getAllUnitOfMeasures = async (req, res) => {
  try {
    const units = await unitOfMeasureService.getAllUnitOfMeasures();

    return res.status(200).json({
      success: true,
      count: units.length,
      data: units,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Unit Of Measure By ID
 */
export const getUnitOfMeasureById = async (req, res) => {
  try {
    const unit = await unitOfMeasureService.getUnitOfMeasureById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data: unit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Unit Of Measure
 */
export const updateUnitOfMeasure = async (req, res) => {
  try {
    const unit = await unitOfMeasureService.updateUnitOfMeasure(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Unit Of Measure updated successfully.",
      data: unit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Activate Unit Of Measure
 */
export const activateUnitOfMeasure = async (req, res) => {
  try {
    const unit = await unitOfMeasureService.activateUnitOfMeasure(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Unit Of Measure activated successfully.",
      data: unit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Deactivate Unit Of Measure
 */
export const deactivateUnitOfMeasure = async (req, res) => {
  try {
    const unit = await unitOfMeasureService.deactivateUnitOfMeasure(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Unit Of Measure deactivated successfully.",
      data: unit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Search Unit Of Measures
 */
export const searchUnitOfMeasures = async (req, res) => {
  try {
    const units = await unitOfMeasureService.searchUnitOfMeasures(
      req.query.search || ""
    );

    return res.status(200).json({
      success: true,
      count: units.length,
      data: units,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};