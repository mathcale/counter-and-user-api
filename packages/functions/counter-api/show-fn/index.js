const {
  services: { CounterService },
  utils,
} = require('desafio-ton-stone-lib');

exports.handler = async () => {
  console.info('Buscando contagem de acessos ao site do Ton...');

  try {
    const currentCount = await CounterService.getCurrentCount();
    console.info(`Valor atual do contador: ${currentCount}`);

    return utils.buildHttpResonse(200, null, { value: currentCount });
  } catch (err) {
    console.error(err);

    return utils.buildHttpResonse(err.response ? err.response.status : 500, null, {
      message: err.response ? err.response.data.error : err.message,
    });
  }
};
