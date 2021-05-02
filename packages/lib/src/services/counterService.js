const axios = require('axios').default;
const { COUNTAPI_URL, COUNTAPI_KEY, COUNTAPI_NAMESPACE } = process.env;

const doRequest = async (url, method) => {
  return await axios({
    url,
    method,
  });
};

module.exports = {
  getCurrentCount: async () => {
    const response = await doRequest(
      `${COUNTAPI_URL}/get/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`,
      'GET',
    );

    return response.data.value;
  },
  incrementCount: async () => {
    const response = await doRequest(
      `${COUNTAPI_URL}/hit/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`,
      'GET',
    );

    return response.data.value;
  },
};
