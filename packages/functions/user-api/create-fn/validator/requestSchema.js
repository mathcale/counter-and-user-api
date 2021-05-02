const Joi = require('joi-plus');

const schema = Joi.object({
  name: Joi.string().min(3).max(50).escape().required(),
  email: Joi.string().email({ allowUnicode: false }).escape(),
  password: Joi.string()
    .password({
      min: 8,
      max: 64,
      lowercase: true,
      uppercase: true,
      number: true,
      special: true,
      count: 4,
    })
    .required(),
});

module.exports = schema;
