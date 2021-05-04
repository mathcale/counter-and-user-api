<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <h1 align="center">Counter & User API</h1>
  <p align="center">Stacks serverless para contagem de acessos ao site e cadastro de usuários</p>
  <p align="center">
    <a href="https://github.com/mathcale/desafio-ton-stone/actions/workflows/ci.yml"><img src="https://github.com/mathcale/desafio-ton-stone/actions/workflows/ci.yml/badge.svg" alt="CI status"></a>
    <a href="https://insomnia.rest/run/?label=Desafio%20Ton%2FStone%20-%20Matheus%20Calegaro&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fmathcale%2Fdesafio-ton-stone%2Fmain%2Fdocs%2Fcollections%2Finsomnia-requests-collection.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
  </p>
</p>

## Arquitetura

As definições de endpoints, modelos de dados e diagramas de fluxo podem ser encontrados no arquivo [ARCHITECTURE.md](ARCHITECTURE.md).

## Tecnologias

- NodeJS v14, via [nvm](https://github.com/nvm-sh/nvm)
- [Yarn v1](https://classic.yarnpkg.com)
- AWS
  - API Gateway
  - Lambda
  - DynamoDB
  - CloudFormation (SAM template)
  - [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [Docker](https://www.docker.com/) e [docker-compose](https://docs.docker.com/compose/)

## Rodando localmente

> **Obs:** É suposto que você tenha o Node, SAM CLI, Docker e docker-compose instalados em seu computador. Caso contrário, use os links acima para obtê-los.

1. Clone o repositório em sua máquina;
2. Na raiz do projeto, execute `yarn build` para resolver as dependências dos subpacotes com o Lerna;
3. Execute o comando `./scripts/create-local-database.sh` para criar a estrutura do banco de dados com o DynamoDB-Local;
4. Inicie a API desejada com `./scripts/run-local.sh <nome-da-api>`, substituindo `<nome-da-api>` por `counter-api` **ou** `user-api`;
5. Utilize um cliente de testes de requisição HTTP para interagir com a API. Foi utilizado o [Insomnia](https://insomnia.rest) durante o desenvolvimento do projeto, e o arquivo contendo a collection de teste dos endpoints pode ser encontrado em `docs/collections/insomnia-requests-collection.json`.
