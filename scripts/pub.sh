#!/bin/bash

# Check if fast-forward is not possible
git fetch
git merge-base --is-ancestor origin/main HEAD
if [ $? -ne 0 ]; then
  echo "Fast-forward is not possible. Exiting..."
  exit 1
fi

echo "** Building"
pnpm run build && pnpm run lint && pnpm run test
if [ $? -ne 0 ]; then
  echo "Error during the build. Exiting..."
  exit 1
fi

echo "** Generating Docs"
pnpm run docs
if [ $? -ne 0 ]; then
  echo "Error during the documentation build. Exiting..."
  exit 1
fi

echo "** Pushing Docs to Git"
git add docs && git commit -m "Rebuild documentation" --allow-empty && git push
if [ $? -ne 0 ]; then
  echo "Error pushing docs to Git. Exiting..."
  exit 1
fi

# Get the version number from package.json
version=$(jq -r '.version' package.json)
# Exit if the version was not retrieved correctly
if [ -z "$version" ]; then
  echo "Failed to retrieve version from package.json"
  exit 1
fi
echo "** Version is $version"

rm RELEASE_NOTES.old.md
mv RELEASE_NOTES.md RELEASE_NOTES.old.md
# Create a markdown file with the version variable as the title
cp RELEASE_NOTES.template.md RELEASE_NOTES.md
echo "** Launching VSCode to edit the release notes"
# Open VSCode to modify the release notes
code -w RELEASE_NOTES.md

# Exit if RELEASE_NOTES.md is missing or has zero length
if [ ! -s "RELEASE_NOTES.md" ]; then
  echo "RELEASE_NOTES.md is missing or empty"
  exit 1
fi

# Create a GitHub release and tag with the version number
echo "** Creating GitHub Release"
if [[ $version == 0* ]]; then
  gh release create v$version --title "Prerelease $version" --notes-file RELEASE_NOTES.md --prerelease
else
  gh release create v$version --title "Release $version" --notes-file RELEASE_NOTES.md
fi

# Exit if anything failed
if [ $? -ne 0 ]; then
  echo "An error publishing to GitHub. Exiting..."
  exit 1
fi

# Publish the package to npm
echo "** Publishing to NPM"
npm publish --access public

if [ $? -ne 0 ]; then
  echo "An error occurred publishing to NPM. Exiting..."
  exit 1
fi

echo "** Incrementing version number for next round of development"
pnpm version patch --no-git-tag-version && git add package.json && git commit -m "v$version"

echo "** Publish complete"
