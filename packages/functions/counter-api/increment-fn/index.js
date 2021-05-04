const {
  services: { CounterService },
  utils,
} = require('desafio-ton-stone-lib');

exports.handler = async () => {
  console.info('Incrementando contagem de acessos ao site do Ton...');

  try {
    const newValue = await CounterService.incrementCount();
    console.info(`Contador incrementado com sucesso para ${newValue}!`);

    return utils.buildHttpResonse(200, null, { newValue });
  } catch (err) {
    console.error(err);

    return utils.buildHttpResonse(err.response ? err.response.status : 500, null, {
      message: err.response ? err.response.data.error : err.message,
    });
  }
};
