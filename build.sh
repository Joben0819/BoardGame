#!/bin/bash

sed -i "s/variants\/[a-zA-Z0-9]*/variants\/$1/g" src/index.js
sed -i "s/variants\/[a-zA-Z0-9]*/variants\/$1/g" src/api/game/gamelist.js
sed -i "s/variants\/[a-zA-Z0-9]*/variants\/$1/g" src/utils/audio-player.js
sed -i "s/variants\/[a-zA-Z0-9]*/variants\/$1/g" src/utils/hooks/useLineSwitch.js
sed -i "s/variants\/[a-zA-Z0-9]*/variants\/$1/g" src/reducers/baccarat.js
sed -i "s/\.\/assets\/[a-zA-Z0-9]*\//\.\/assets\/$1\//g" public/index.html
sed -i "s/\.\/assets\/[a-zA-Z0-9]*\//\.\/assets\/$1\//g" public/manifest.json

sed -i "s/<title>page_title<\/title>/<title>$2<\/title>/g" public/index.html
sed -i 's/"apple_title"/"'$2'"/g' public/index.html
sed -i "s/short_name_value/$2/g" public/manifest.json

sed -i 's/agent: "[a-zA-Z0-9]*\"/agent: "'"$3"\"'/g' src/api/game/gamelist.js

find src/variants/* -maxdepth 0 -type d ! -name "$1" -exec rm -rf {} +
npm run build