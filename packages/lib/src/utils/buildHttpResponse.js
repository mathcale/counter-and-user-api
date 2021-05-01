const buildHttpResonse = (statusCode, headers = {}, body = null) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body && JSON.stringify(body),
  };
};

module.exports = buildHttpResonse;
