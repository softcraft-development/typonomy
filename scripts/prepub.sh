#!/bin/bash

if [ -f "RELEASE_NOTES.md" ]; then
  echo "Release notes already exist. Exiting..."
  exit 0
fi

version=$(jq -r '.version' package.json)
if [[ $version == *"-dev"* ]]; then
  echo "** Dropping the -dev prerelease ID"
  newVersion=$(npm version --preid "" --no-git-tag-version)
  git add package.json && git commit -m "$newVersion"
fi

previousRelease=$(gh release list --json tagName --jq ".[].tagName" --limit 1)
# Exit if the previous release was not retrieved correctly
if [ -z "$previousRelease" ]; then
  echo "Failed to retrieve previous release version from GitHub"
  exit 1
fi
echo "** Previous release is $previousRelease"
comparePrevious="https://github.com/softcraft-development/typonomy/compare/$previousRelease...main"
echo "** Comparison: $comparePrevious"
open $comparePrevious

# Create a markdown file with the version variable as the title
cp RELEASE_NOTES.template.md RELEASE_NOTES.md
echo "[$previousRelease...v$version](https://github.com/softcraft-development/typonomy/compare/$previousRelease...v$version)" >> RELEASE_NOTES.md
echo "** Launching VSCode to edit the release notes"
# Open VSCode to modify the release notes
code -w RELEASE_NOTES.md


