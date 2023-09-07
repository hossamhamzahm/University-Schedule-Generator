#!/usr/bin/env sh
npm i
sudo npm install pm2 -g
npm run build 
npm run migrate-dev
npm run stop
npm run start