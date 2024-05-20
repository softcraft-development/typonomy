#!/bin/bash

pnpm build

# Get the version number from package.json
version=$(jq -r '.version' package.json)
# Exit if the version was not retrieved correctly
if [ -z "$version" ]; then
  echo "Failed to retrieve version from package.json"
  exit 1
fi

rm RELEASE_NOTES.md
# Create a markdown file with the version variable as the title
cp RELEASE_NOTES.template.md RELEASE_NOTES.md
# Open VSCode to modify the release notes
code -w RELEASE_NOTES.md

# Exit if RELEASE_NOTES.md is missing or has zero length
if [ ! -s "RELEASE_NOTES.md" ]; then
  echo "RELEASE_NOTES.md is missing or empty"
  exit 1
fi

# Create a GitHub release and tag with the version number
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
npm publish --access public

if [ $? -ne 0 ]; then
  echo "An error occurred publishing to NPM. Exiting..."
  exit 1
fi

pnpm version patch