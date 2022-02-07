
   
#!/usr/bin/env bash

## Got to parent directory
cd `git rev-parse --show-toplevel`

echo "Checking for changes to: $1"

changed=false
previous_commit=`git log --format="%H" -n 2`
echo "Comparing to commit: $previous_commit"
git diff --quiet $previous_commit $1 || changed=true

if [ "$changed" == "true" ]; then
 if [$1 == ""]; then
   echo "Root directory comparison detected"
   i=`basename "$PWD"`
 fi
 echo "Changes detected for $1. $1 will deploy"
else
  echo "No changes detected for $1. Ending Circle CI step"
  circleci-agent step halt
fi