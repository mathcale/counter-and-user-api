const {
  services: { UserService },
} = require('desafio-ton-stone-lib');

const { handler } = require('../index');

const mockLambdaEvent = {
  method: 'GET',
  pathParameters: {
    id: '123123',
  },
};

const mockLambdaEventWithoutPathParameters = {
  method: 'GET',
};

const mockUser = {
  Count: 1,
  Items: [
    {
      id: '123123',
      name: 'Mock User',
      email: 'johndoe@example.com',
      enabled: true,
      createdAt: '2021-05-03T01:01:56.685Z',
      updatedAt: '2021-05-03T01:01:56.685Z',
    },
  ],
};

describe('[User API] "Get user data by ID" endpoint test suite', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('Should find user and return status code 200', async () => {
    expect.assertions(2);

    UserService.getUserById = jest.fn().mockResolvedValue(mockUser);

    const lambdaResponse = await handler(mockLambdaEvent);

    expect(lambdaResponse.statusCode).toEqual(200);
    expect(lambdaResponse.body).toStrictEqual(JSON.stringify(mockUser.Items[0]));
  });

  test('Should return "Not Found" error on unknown user ID', async () => {
    expect.assertions(2);

    UserService.getUserById = jest.fn().mockResolvedValue({ Count: 0, Items: [] });
    const lambdaResponse = await handler(mockLambdaEvent);
    const responseBody = JSON.parse(lambdaResponse.body);

    expect(lambdaResponse.statusCode).toEqual(404);
    expect(responseBody.message).toBe('User not found');
  });

  test('Should return "Bad Request" error when no ID is passed', async () => {
    expect.assertions(2);

    const lambdaResponse = await handler(mockLambdaEventWithoutPathParameters);
    const responseBody = JSON.parse(lambdaResponse.body);

    expect(lambdaResponse.statusCode).toEqual(400);
    expect(responseBody.message).toBe('Missing "id" parameter');
  });
});
