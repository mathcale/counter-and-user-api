#!/bin/bash

function die {
  declare MSG="$@"
  echo -e "[ERROR] $MSG">&2
  exit 1
}

PROJECT=$1

if ! [ -x "$(command -v sam)" ]; then
  die "AWS SAM CLI is mandatory to proceed!"
fi

echo "[INFO] Copying 'lib' code to 'layer'..."

rm -rf packages/layer/nodejs/node_modules/desafio-ton-stone-lib
cp -R packages/lib packages/layer/nodejs/node_modules/desafio-ton-stone-lib

echo "[INFO] Starting local API..."

sam local start-api \
  -t infra/$PROJECT/template-$PROJECT-application.yaml \
  --warm-containers LAZY

echo -e "\n[INFO] Interruption received"
