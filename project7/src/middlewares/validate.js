const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    const issues = err?.issues ?? err?.errors;
    if (Array.isArray(issues)) {
      return res.status(400).json({
        status: false,
        errors: issues.map((e) => ({
          field: e.path.join(".") || "body",
          message: e.message,
        })),
      });
    }

    console.error("Validation middleware error:", err);
    return res.status(500).json({
      status: false,
      errors: [{ message: "Internal server error in validation" }],
    });
  }
};

export default validate;
