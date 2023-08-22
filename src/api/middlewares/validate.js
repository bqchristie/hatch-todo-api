import { Validator } from "jsonschema";

const defaultOptions = {
  required: true,
};

const jsValidator = new Validator();

export const requireSchema = (schema, options = {}) => {
  const validatorOptions = { ...defaultOptions, ...options };

  const validatorFunc = (req, res, next) => {
    const { body } = req;
    if (!body) {
      res.status(400).json({ error: "missing request body" });
      return;
    }

    const v = jsValidator.validate(body, schema, validatorOptions);
    if (!v.valid) {
      res.status(400).json({
        error: "request body validation failed",
        details: v.errors.map((err) => `${err.property}: ${err.message}`),
      });
      return;
    }

    req.validatedBody = v.instance;
    next();
  };

  return validatorFunc;
};

export const requireValidId = (req, res, next) => {
  try {
    req.params.id = parseInt(req.params.id);
  } catch (e) {
    res.status(400).json({ error: "URL does not contain a valid object ID" });
    return;
  }
  next();
};
