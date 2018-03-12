#!/bin/bash

source $(npm root -g)/pr-bumper/.travis/is-bump-commit.sh

if isBumpCommit
then
  echo "Skipping pr-bumper for version bump commit"
  exit 0
fi

if [[ ! "${PUBLISH_NODE_VERSION:-8.1.2}" =~ ^$TRAVIS_NODE_VERSION ]]
then
  echo "Skipping pr-bumper for TRAVIS_NODE_VERSION [${TRAVIS_NODE_VERSION}]"
  exit 0
fi

if [ "$EMBER_TRY_SCENARIO" != "ember-default" ]
then
  echo "Skipping pr-bumper for EMBER_TRY_SCENARIO [${EMBER_TRY_SCENARIO}]"
  exit 0
fi

cat coverage/lcov.info | coveralls
