#!/usr/bin/env bash

./node_modules/.bin/jsdoc2md './src/*.js' > 'API.md'
./node_modules/.bin/jsdoc2md './src/validators/*.js' > 'VALIDATORS.md'