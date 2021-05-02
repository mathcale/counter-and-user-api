const { utils } = require('desafio-ton-stone-lib');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  try {
    return utils.buildHttpResonse(201, { Accept: 'application/json' }, body);
  } catch (err) {
    console.error(err);

    return utils.buildHttpResonse(500, null, { message: err.message });
  }
};
