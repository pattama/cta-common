Config module
=============

This module allows you to load the configuration of a flowcontrol application.
It can load your default configuration but also override it with some environment configuration.

If your application folder name is `cta-app-myapp`, then you can load your configuration like this:
 
````js
const config = require('cta-common').config('cta-app-myapp');
````

Then launch your app by providing your environment either via application parameters or nodejs environment variable NODE_ENV, example:

````
# This command line will load your default configuration
node lib
# These command lines will load your default configuration and override it with your development configuration
# 1 - using application parameters
node lib --env development
# 2 - using node environment
# 2.a - Linux
NODE_ENV=development node lib
# 2.b - Windows
SET NODE_ENV=development
node lib
````
  
In order to work, your configuration folder must follow some conventions

Your configuration folder structure should look like:
  
````
cta-app-myapp/lib/apps/main/config
cta-app-myapp/lib/apps/main/config/tools
cta-app-myapp/lib/apps/main/config/tools/tool1.js # tools file names are not important
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