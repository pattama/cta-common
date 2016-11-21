root module
===========

This module allows you to find your application root path depending on the structure of your environment, either all is inside node_modules or not

# How to use it

````js
'use strict';
const root = require('cta-common').root('cta-app-myapp');
````

This will return the root path of your application whenever the structure of your environment

* eg. of a standalone app, this will return `var/www/cta-app-myapp` 
````
var/www/cta-app-myapp
var/www/cta-app-myapp/node_modules/cta-common
````

* eg. of an aggregated app, this will return `var/www/cta-app-myapp` 
````
var/www/cta-app-myapp
var/www/cta-app-myapp/node_modules/cta-app-someotherapp/node_modules/cta-common
````

* eg. of a 'all inside node_modules' structure, this will return `var/www/cta/node_modules/cta-app-myapp` 
````
var/www/cta/node_modules/cta-app-myapp
var/www/cta/node_modules/cta-common
````

* eg. of a 'all inside node_modules' structure with many node_modules folders, this will return `var/www/cta/node_modules/cta-oss/node_modules/cta-app-myapp` 
````
var/www/cta/node_modules/cta-oss/node_modules/cta-app-myapp
var/www/cta/node_modules/cta-oss/node_modules/cta-common
````