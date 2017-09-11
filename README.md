# cta-common [ ![build status](https://git.sami.int.thomsonreuters.com/compass/cta-common/badges/master/build.svg)](https://git.sami.int.thomsonreuters.com/compass/cta-common/commits/master) [![coverage report](https://git.sami.int.thomsonreuters.com/compass/cta-common/badges/master/coverage.svg)](https://git.sami.int.thomsonreuters.com/compass/cta-common/commits/master)

Common Modules for Compass Test Automation, One of Libraries in CTA-OSS Platform

## General Overview

### Overview

In cta-common, there are four modules as following:

1. [ConfigModule](#1-configmodule)
1. [LoaderModule](#2-loadermodule)
1. [RootModule](#rootmodule)
1. [ValidateModule](#validatemodule)

These modules providing common functions across CTA-OSS.

## Guidelines

We aim to give you brief guidelines here.

```javascript
const cta_common = require("cta-common");
```

### 1 ConfigModule

It loads the config for specified module using file structure: **[module_root]/lib/apps/main/config**.

```javascript
const moduleName = "sample-module";
const config = cta_common.config(moduleName);
```

The file, which locates at _sample-module/lib/apps/main/config/index.js_, is loaded as the **config**.

### 2 LoaderModule

It loads modules from _(*.js)_ files in specified directory.

#### Output as Array

```javascript
const sampleDirectory = "sample-directory";
const array_output = cta_common.loader.asArray(sampleDirectory);
```

#### Output as Object

```javascript
const sampleDirectory = "sample-directory";
const object_output = cta_common.loader.asObject(sampleDirectory);
```

### RootModule

### ValidateModule


