# Introduction

This is a i18next cache layer to be used in the browser. It will load and cache resources from localStorage.

# Getting started

Source can be loaded via [npm](https://www.npmjs.com/package/i18next-localstorage-cache), bower or [downloaded](https://github.com/i18next/i18next-localStorage-cache/blob/master/i18nextLocalStorageCache.min.js) from this repo.

- If you don't use a module loader it will be added to window.i18nextLocalStorageCache

```
# npm package
$ npm install i18next-localstorage-cache

# bower
$ bower install i18next-localstorage-cache
```

Wiring up:

```js
import i18next from 'i18next';
import Cache from 'i18next-localstorage-cache';

i18next
  .use(Cache)
  .init(i18nextOptions);
```

As with all modules you can either pass the constructor function (class) to the i18next.use or a concrete instance.

## Cache Options

**hint:** the cache plugin is disabled by default. Enable it by setting `enabled: true` in init options for production usage.

```js
{
  // turn on or off
  enabled: false,

  // prefix for stored languages
  prefix: 'i18next_res_',

  // expiration
  expirationTime: 7*24*60*60*1000,

  // language versions
  versions: {}
};
```

- Contrary to cookies behavior, the cache will respect updates to `expirationTime`. If you set 7 days and later update to 10 days, the cache will persist for 10 days

- Passing in a `versions` object (ex.: `versions: { en: 'v1.2', fr: 'v1.1' }`) will give you control over the cache based on translations version. This setting works along `expirationTime`, so a cached translation will still expire even though the version did not change. You can still set `expirationTime` far into the future to avoid this


Options can be passed in:

**preferred** - by setting options.cache in i18next.init:

```js
import i18next from 'i18next';
import Cache from 'i18next-localstorage-cache';

i18next
  .use(Cache)
  .init({
    cache: options
  });
```

on construction:

```js
  import Cache from 'i18next-localstorage-cache';
  const cache = new Cache(null, options);
```

via calling init:

```js
  import Cache from 'i18next-localstorage-cache';
  const cache = new Cache();
  cache.init(options);
```
