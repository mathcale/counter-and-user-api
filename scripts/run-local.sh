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

sam local start-api \
  -t infra/$PROJECT/template-$PROJECT-application.yaml \
  --warm-containers LAZY
