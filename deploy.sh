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


npm run forever stop dist/index.js
if [ $? -eq 0 ]; then
  echo "stopped forever"
else
  echo "No node process is found"
fi

npm run start
# exit 0