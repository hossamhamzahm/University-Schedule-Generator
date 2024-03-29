#!/usr/bin/env sh
npm i

npm run build 


# stop the current node server
ps | grep node
if [ $? -eq 0 ]; then
  killall -9 node
else
  echo "No node process is found"
fi

# stop previous forever runs
npm run stop


CERT_DIR="/etc/letsencrypt/live/$URL"
if sudo test -d $CERT_DIR ; then
    echo 'Certificate exists.'
    mkdir ./cert
    sudo cp "$CERT_DIR/fullchain.pem" ./cert
    sudo cp "$CERT_DIR/privkey.pem" ./cert
    sudo chmod 777 ./cert/*
else
    echo 'Certificate does not exist.'
fi


npm run start
# exit 0