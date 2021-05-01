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
  console.info('Buscando contagem de acessos ao site do Ton...');

  try {
    const response = await axios.get(`${COUNTAPI_URL}/get/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`);
    console.info(`Valor atual do contador: ${response.data.value}`);

    return buildResonse(200, null, { value: response.data.value });
  } catch (err) {
    console.error(err);

    return buildResonse(500, null, { message: err.message });
  }
};
