const requestSchema = require('./requestSchema');

module.exports = {
  validate: (body) => {
    const req = JSON.parse(body);
    const response = {
      data: null,
      errors: null,
    };

    const validationResult = requestSchema.validate(req, {
      convert: true,
      stripUnknown: true,
      skipFunctions: true,
    });

    if (validationResult.error) {
      response.errors = validationResult.error.details;
      return response;
    }

    response.data = validationResult.value;
    return response;
  },
};
