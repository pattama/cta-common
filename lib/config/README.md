config module
=============

This module allows you to load configuration of a flowcontrol application that follows conventions below

If your application folder name is `cta-app-myapp`

Then your config folder structure should be
  
````
cta-app-myapp/lib/apps/main/config
cta-app-myapp/lib/apps/main/config/tools
cta-app-myapp/lib/apps/main/config/bricks
cta-app-myapp/lib/apps/main/config/properties.js
cta-app-myapp/lib/apps/main/config/env
````

# How to use it

````js
'use strict';
const config = require('cta-common').config('cta-app-myapp');
````