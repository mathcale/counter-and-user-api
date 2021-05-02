const {
  utils,
  services: { UserService },
} = require('desafio-ton-stone-lib');

const requestValidator = require('./validator');

exports.handler = async (event) => {
  const validRequestBody = requestValidator.validate(event.body);

  if (validRequestBody.errors) {
    console.error('Request validation error: ', validRequestBody.errors);

    return utils.buildHttpResonse(400, null, { errors: validRequestBody.errors });
  }

  try {
    const response = await UserService.createUser(validRequestBody.data);

    return utils.buildHttpResonse(201, { Accept: 'application/json' }, response);
  } catch (err) {
    console.error(err);

    return utils.buildHttpResonse(500, null, { message: err.message });
  }
};
