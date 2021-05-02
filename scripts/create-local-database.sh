#!/bin/bash

SECONDS=0

function die {
  declare MSG="$@"
  echo -e "[ERROR] $MSG">&2
  exit 1
}

if ! [ -x "$(command -v aws)" ]; then
  die "AWS CLI is mandatory to proceed!"
fi

if ! docker network inspect lambda-local > /dev/null 2>&1; then
  echo "[INFO] Creating docker network..."
  docker network create lambda-local || die "Docker create network error"
fi

echo "[INFO] Booting \"DynamoDB Local\" docker image..."
docker-compose -f scripts/docker/docker-compose-dynamodb.yaml up -d || die "Docker compose error"

echo "[INFO] Creating \"users\" table..."

aws dynamodb create-table \
  --table-name user-api-persistence-dev-users \
  --attribute-definitions AttributeName=pk,AttributeType=S \
  --key-schema AttributeName=pk,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000 || die "Create table error"

echo "[INFO] Done in ${SECONDS}s"
