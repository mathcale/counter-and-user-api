const {
  utils,
  services: { UserService },
} = require('desafio-ton-stone-lib');

exports.handler = async (event) => {
  const newUser = JSON.parse(event.body);

  try {
    const response = await UserService.createUser(newUser);

    return utils.buildHttpResonse(201, { Accept: 'application/json' }, response);
  } catch (err) {
    console.error(err);

    return utils.buildHttpResonse(500, null, { message: err.message });
  }
};
