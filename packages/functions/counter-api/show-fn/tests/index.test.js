const {
  services: { CounterService },
} = require('desafio-ton-stone-lib');

const { handler } = require('../index');

describe('[Counter API] "Show counter" endpoint test suite', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('Should call API to get current counter value', async () => {
    expect.assertions(2);

    CounterService.getCurrentCount = jest.fn().mockResolvedValue(1000);

    const lambdaResponse = await handler({ method: 'GET' });
    console.log(lambdaResponse);

    expect(lambdaResponse.statusCode).toEqual(200);
    expect(lambdaResponse.body).toStrictEqual(JSON.stringify({ value: 1000 }));
  });

  test('Should return error on API call failure', async () => {
    CounterService.getCurrentCount = jest
      .fn()
      .mockRejectedValue({ response: { status: 500, data: { error: 'Mock API error' } } });

    const lambdaResponse = await handler({ method: 'GET' });

    expect(lambdaResponse.statusCode).toEqual(500);
    expect(lambdaResponse.body).toStrictEqual(JSON.stringify({ message: 'Mock API error' }));
  });
});
