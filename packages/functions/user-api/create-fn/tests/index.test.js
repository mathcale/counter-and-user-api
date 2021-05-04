const {
  services: { UserService },
} = require('desafio-ton-stone-lib');
const { handler } = require('../index');

const now = new Date().toISOString();

const mockLambdaEvent = {
  method: 'POST',
  body: JSON.stringify({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'S3cureP@ss',
  }),
};

const mockLambdaEventMissingPasswordOnBody = {
  method: 'POST',
  body: JSON.stringify({
    name: 'John Doe',
    email: 'johndoe@example.com',
  }),
};

const mockLambdaEventWithBadPassword = {
  method: 'POST',
  body: JSON.stringify({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'badpasss',
  }),
};

const mockCreateUserResponse = {
  pk: 'EMAIL#johndoe@example.com',
  id: '123123',
  name: 'John Doe',
  email: 'johndoe@example.com',
  enabled: true,
  createdAt: now,
  updatedAt: now,
};

describe('[User API] "Create user" endpoint test suite', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('Should validate and create user', async () => {
    expect.assertions(2);

    UserService.createUser = jest.fn().mockResolvedValue(mockCreateUserResponse);

    const lambdaResponse = await handler(mockLambdaEvent);

    expect(lambdaResponse.statusCode).toBe(201);
    expect(lambdaResponse.body).toBe(JSON.stringify(mockCreateUserResponse));
  });

  test('Should return validation error when wrong request body is passed', async () => {
    expect.assertions(3);

    const lambdaResponse = await handler(mockLambdaEventMissingPasswordOnBody);
    const responseBody = JSON.parse(lambdaResponse.body);

    expect(lambdaResponse.statusCode).toBe(400);
    expect(responseBody.errors).toHaveLength(1);
    expect(responseBody.errors[0].path[0]).toBe('password');
  });

  test('Should return validation error when password does not comply with some validation rule', async () => {
    expect.assertions(4);

    const lambdaResponse = await handler(mockLambdaEventWithBadPassword);
    const responseBody = JSON.parse(lambdaResponse.body);

    expect(lambdaResponse.statusCode).toBe(400);
    expect(responseBody.errors).toHaveLength(1);
    expect(responseBody.errors[0].path[0]).toBe('password');
    expect(responseBody.errors[0].type).toBe('string.password');
  });
});
