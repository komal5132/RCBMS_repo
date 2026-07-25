/**
 * Generic Validation Middleware
 */

const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // Merge validated values into the existing request object
    Object.assign(req[property], value);

    next();
  };
};

export default validate;
