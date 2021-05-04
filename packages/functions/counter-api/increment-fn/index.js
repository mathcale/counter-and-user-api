const {
  services: { CounterService },
  utils,
} = require('desafio-ton-stone-lib');

exports.handler = async () => {
  console.info('Incrementing website visits tracking counter...');

  try {
    const newValue = await CounterService.incrementCount();
    console.info(`Counter successfully incremented to ${newValue}!`);

    return utils.buildHttpResonse(200, null, { newValue });
  } catch (err) {
    console.error(err);

    return utils.buildHttpResonse(err.response ? err.response.status : 500, null, {
      message: err.response ? err.response.data.error : err.message,
    });
  }
};
