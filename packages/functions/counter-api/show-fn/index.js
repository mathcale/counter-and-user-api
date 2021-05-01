const axios = require('axios').default;
const { utils } = require('desafio-ton-stone-lib');
const { COUNTAPI_URL, COUNTAPI_KEY, COUNTAPI_NAMESPACE } = process.env;

exports.handler = async (event) => {
  console.info('Buscando contagem de acessos ao site do Ton...');

  try {
    const response = await axios.get(`${COUNTAPI_URL}/get/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`);
    console.info(`Valor atual do contador: ${response.data.value}`);

    return utils.buildHttpResonse(200, null, { value: response.data.value });
  } catch (err) {
    console.error(err);

    return utils.buildHttpResonse(500, null, { message: err.message });
  }
};
