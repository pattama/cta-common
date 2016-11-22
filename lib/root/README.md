root module
===========

This module allows you to find your application root path depending on the structure of your environment:
* your app is a standalone application
* your app is is inside node_modules of an aggregated application
* all is inside node_modules

# How to use it

````js
'use strict';
const root = require('cta-common').root('cta-app-myapp');
````

This will return the root path of your application however is the structure of your environment

# Examples

* In case of a standalone app: 
````
var/www/cta-app-myapp
var/www/cta-app-myapp/node_modules/cta-common
````
It will return `var/www/cta-app-myapp`

* In case of an app inside an aggregated app: 
````
var/www/cta-app-aggregated
var/www/cta-app-aggregated/node_modules/cta-app-myapp/node_modules/cta-common
````
It will return `var/www/cta-app-aggregated/node_modules/cta-app-myapp`

* In case of all is inside node_modules: 
````
var/www/cta/node_modules/cta-app-aggregated
var/www/cta/node_modules/cta-app-myapp
var/www/cta/node_modules/cta-common
````
It will return `var/www/cta/node_modules/cta-app-myapp`

* In case of all is inside node_modules, with many node_modules folders: 
````
var/www/cta/node_modules/cta-oss/node_modules/cta-app-aggregated
var/www/cta/node_modules/cta-oss/node_modules/cta-app-myapp
var/www/cta/node_modules/cta-oss/node_modules/cta-common
````
It will return `var/www/cta/node_modules/cta-oss/node_modules/cta-app-myapp`