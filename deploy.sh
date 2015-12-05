#!/bin/bash
set -e #exit with nonzero exit code if anything fails

#clear and recreate the dist directory
rm -rf dist || exit 0;
rm -rf build || exit 0;
mkdir dist

grunt

cd dist
git init

git config user.name "Travis CI"
git config user.email "tdukart@aloftinteractive.com"

git add .
git commit -m "Deploy to GitHub Pages"

git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
