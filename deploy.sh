#!/usr/bin/env sh

git pull origin deploy
npm i
npm run build 
npm run migrate-dev
npm run start