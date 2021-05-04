const {
  services: { CounterService },
} = require('desafio-ton-stone-lib');

const { handler } = require('../index');

describe('[Counter API] "Increment counter" endpoint test suite', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('Should call API to increment value and return the updated counter value', async () => {
    expect.assertions(2);

    CounterService.incrementCount = jest.fn().mockResolvedValue(1000);

    const lambdaResponse = await handler({ method: 'POST' });

    expect(lambdaResponse.statusCode).toEqual(200);
    expect(lambdaResponse.body).toStrictEqual(JSON.stringify({ newValue: 1000 }));
  });

  test('Should return error on API call failure', async () => {
    CounterService.incrementCount = jest
      .fn()
      .mockRejectedValue({ response: { status: 500, data: { error: 'Mock API error' } } });

    const lambdaResponse = await handler({ method: 'POST' });

    expect(lambdaResponse.statusCode).toEqual(500);
    expect(lambdaResponse.body).toStrictEqual(JSON.stringify({ message: 'Mock API error' }));
  });
});
