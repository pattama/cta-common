loader module
=============

This module allows you to load all nodejs modules that are inside a directory

It is mostly dedicated to load huge flowcontrol configurations that have been split to multiple stand-alone files  
 
Assuming you have a directory structure like below
/config/index.js
/config/tools/a.js
/config/tools/b.js
/config/bricks/c.js
/config/bricks/d.js

Your index.js should look like

````js
'use strict';
const loader = require('cta-common').loader;
module.exports = {
    name: 'sample-app',
    tools: loader.asArray('tools', __dirname),
    bricks: loader.asArray('bricks', __dirname),
};

````

# asArray method

This method takes 2 arguments:
- The first one is the path to the directory where files are located, it is relative to the location of the script
- The second one (mostly __dirname) is the base directory where the relative path resolves

It includes all js files inside passed directory and returns an array of what those files export

If included files export objects with a key "order", the returned array will be sorted according to this field from lowe to higher

See tests for a working sample