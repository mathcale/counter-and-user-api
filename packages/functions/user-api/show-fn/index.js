const {
  utils,
  services: { UserService },
} = require('desafio-ton-stone-lib');

exports.handler = async (event) => {
  const userId = event.pathParameters && event.pathParameters.id && event.pathParameters.id;

  if (!userId) {
    return utils.buildHttpResonse(400, null, { message: 'Missing "id" parameter' });
  }

  try {
    console.info(`Searching user with id = "${userId}}"...`);
    const result = await UserService.getUserById(userId);

    if (result.Count === 0) {
      console.warn('User not found');
      return utils.buildHttpResonse(404, null, { message: 'User not found' });
    }

    console.info(`User found!`);

    return utils.buildHttpResonse(200, { Accept: 'application/json' }, result.Items[0]);
  } catch (err) {
    console.error(err);

    return utils.buildHttpResonse(500, null, { message: err.message });
  }
};
