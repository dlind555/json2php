# json2php

## About
Json2Php is a VueJS application which simulates the json_decode PHP function for converting JSON data to PHP arrays and PHP arrays to JSON, all in the browser, without any need for calling a server API.

It even preserves the order of the elements in JSON objects!

Use it at https://json2php.netlify.com

## Project setup
```
yarn install
```

### Development
```
yarn serve
yarn test:unit
yarn test:unit --watch
yarn lint
```

### Deployment
```
yarn build
```

## Changelog

### 0.3.0

* Added toggles for setting the conversion options
* Compact mode setting for converting without new lines / tabs
* Align Array Values setting for aligning all array values horizontally

### 0.2.0

* Added support for converting PHP to JSON

### 0.1.0

* Added support for converting JSON to PHP
