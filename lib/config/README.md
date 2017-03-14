Config module
=============

This module allows you to load the configuration of a flowcontrol application.
It can load your default configuration and override it with some environment configuration if provided.

# How to use it

Simply use `const config = require('cta-common').config('path/to/your/config/folder')`

However, in order to work, your config folder must follow some conventions

# Config folder conventions

## main config

`/index.js` is the main config file. It should at least exports `name` property. Example:

````
// file /index.js
module.exports = {
  name: 'myapp',
  properties: {
    a: 'http://localhost:3000',
    b: 3200,
    d: 'd',
  },
};
````

## tools & bricks

You can also export `tools` & `bricks` properties in this file but it is better to put them in their separated folders.

`/bricks` folder should contain js files that export each a brick configuration. Example:

````
// file /bricks/receiver.js
module.exports = {
    name: 'receiver',
    module: 'cta-io',
    properties: {
        messaging: 'messaging',
    },
  },
};
````


`/tools` folder should contain js files that export each a tool configuration. Example:

````
// file /tools/messaging.js
module.exports = {
  name: 'messaging',
  module: 'cta-messaging',
  properties: {
    provider: 'rabbitmq',
    parameters: {
      url: 'amqp://localhost?heartbeat=60',
    },
  }],  
};
````

PS: tools & bricks file names are not important.

## environment

`/env` folder should contain js files that override default config depending on the environment. Example: 

````
// file /env/prod.js
module.exports = {
  properties: {
    a: 'http://global.mydomain.com:3000',
  },
  tools: [{
    name: 'messaging',  
    properties: {    
      parameters: {
        url: 'amqp://mq.mydomain.com?heartbeat=60',
      },
    },
  }],
};
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

PS: environment file names are not important but they should match --env application parameter or NODE_ENV

## local configuration

When `/env/local.js` is present (filename matter) it takes highest priority