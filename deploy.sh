#!/usr/bin/env sh
npm i

npm run build 

npm run migrate-dev

# stop the current node server
ps | grep node
if [ $? -eq 0 ]; then
  killall -9 node
else
  echo "No node process is found"
fi
# exit 0