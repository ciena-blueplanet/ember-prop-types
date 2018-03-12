#!/bin/bash

source $(npm root -g)/pr-bumper/.travis/is-bump-commit.sh

if isBumpCommit
then
  echo "Skipping gh-pages publish for pr-bumper commit"
  exit 0
fi

VERSION=`node -e "console.log(require('./package.json').version)"`
TMP_GH_PAGES_DIR=.gh-pages-demo

# We only want to deploy to gh-pages from "master"
if [ "${TRAVIS_BRANCH}" != "master" ]
then
    echo "Skipping gh-pages publish for branch [${TRAVIS_BRANCH}]"
    exit 0
fi

ember build --prod
git clone https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG} ${TMP_GH_PAGES_DIR} > /dev/null 2>&1
cd ${TMP_GH_PAGES_DIR}
git checkout gh-pages
git rm -rf *
cp -r ../dist/* .
git add --all
git commit -m "[ci skip] Automated gh-pages commit of ${VERSION}"
git push origin gh-pages > /dev/null 2>&1
