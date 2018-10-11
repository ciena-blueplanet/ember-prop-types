#!/bin/bash

if [[ ! "${PUBLISH_NODE_VERSION:-10.7.0}" =~ ^$TRAVIS_NODE_VERSION ]]
then
  echo "Skipping pr-bumper bump step for TRAVIS_NODE_VERSION [${TRAVIS_NODE_VERSION}]. Current publish node version [${PUBLISH_NODE_VERSION}]"
  exit 0
fi

if [ "$EMBER_TRY_SCENARIO" != "ember-default" ]
then
  echo "Skipping pr-bumper bump step for EMBER_TRY_SCENARIO [${EMBER_TRY_SCENARIO}]"
  exit 0
fi

$(npm root -g)/pr-bumper/.travis/maybe-bump-version.sh
