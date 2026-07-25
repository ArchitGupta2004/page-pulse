const Joi = require('joi');

const auditSchema = Joi.object({
  url: Joi.string().uri().required().messages({
    'string.uri': '"url" must be a valid URI',
    'any.required': '"url" is required',
  }),
});

const validateAudit = (req, res, next) => {
  const { error } = auditSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        message: error.details[0].message,
      },
    });
  }
  next();
};

module.exports = { validateAudit };
