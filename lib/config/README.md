Config module
=============

This module allows you to load the configuration of a flowcontrol application.
It can load your default configuration but also override it with some environment configuration.

# How to use it

If your application folder name is `cta-app-myapp`, then you can load your configuration like this:
 
````js
const config = require('cta-common').config('cta-app-myapp');
````
Then launch your app by providing your environment
* either via application parameters
* or nodejs environment variable NODE_ENV

Examples:

* The command line `node lib` will load your default configuration
* These command lines will load your default configuration and override it with your 'development' configuration
    * using application parameters `node lib --env development`
    * using node environment
        * Linux `NODE_ENV=development node lib`
        * Windows `SET NODE_ENV=development; node lib`
  
In order to work, your configuration folder must follow some conventions

# Conventions

Your configuration folder structure should look like:
  
````
cta-app-myapp/lib/apps/main/config
cta-app-myapp/lib/apps/main/config/tools
cta-app-myapp/lib/apps/main/config/tools/tool1.js
cta-app-myapp/lib/apps/main/config/tools/tool2.js
cta-app-myapp/lib/apps/main/config/bricks
cta-app-myapp/lib/apps/main/config/tools/brick1.js # bricks file names are not important
cta-app-myapp/lib/apps/main/config/tools/brick2.js
cta-app-myapp/lib/apps/main/config/properties.js
cta-app-myapp/lib/apps/main/config/env
cta-app-myapp/lib/apps/main/config/env/development.js # environment file names are not important but they should match --env application parameter or NODE_ENV 
cta-app-myapp/lib/apps/main/config/env/test.js
cta-app-myapp/lib/apps/main/config/env/local.js # if this file is present (filename matter) it takes highest priority
````

* tools and bricks file names don't matter
* environments configurations file names don't matter but they should match passed environment variable
* environment file local.js (when present) takes highest priority, you should add it to .gitignore file