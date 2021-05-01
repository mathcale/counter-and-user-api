const axios = require('axios').default;
const { COUNTAPI_URL, COUNTAPI_KEY, COUNTAPI_NAMESPACE } = process.env;

const buildResonse = (statusCode, headers = {}, body = null) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body && JSON.stringify(body),
  };
};

exports.handler = async (event) => {
  console.info('Incrementando contagem de acessos ao site do Ton...');

  try {
    const response = await axios.get(`${COUNTAPI_URL}/hit/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`);
    console.info(`Contador incrementado com sucesso para ${response.data.value}!`);

    return buildResonse(200, null, { newValue: response.data.value });
  } catch (err) {
    console.error(err);

    return buildResonse(500, null, { message: err.message });
  }
};
