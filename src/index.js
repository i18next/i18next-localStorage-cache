import * as utils from './utils';

let storage = {
  setItem: function(key, value) {
    if (window.localStorage) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        //f.log('failed to set value for key "' + key + '" to localStorage.');
      }
    }
  },
  getItem: function(key, value) {
    if (window.localStorage) {
      try {
        return window.localStorage.getItem(key, value);
      } catch (e) {
        //f.log('failed to get value for key "' + key + '" from localStorage.');
        return undefined;
      }
    }
  }
};

function getDefaults() {
  return {
    enabled: false,
    prefix: 'i18next_res_',
    expirationTime: 7*24*60*60*1000
  };
}

class Cache {
  constructor(services, options = {}) {
    this.init(services, options);

    this.type = 'cache';
    this.debouncedStore = utils.debounce(this.store, 10000);
  }

  init(services, options = {}) {
    this.services = services;
    this.options = utils.defaults(options, this.options || {}, getDefaults());
  }

  load(lngs, callback) {
    let store = {}
      , nowMS = new Date().getTime();

    if(window.localStorage) {
      let todo = lngs.length;

      lngs.forEach(lng => {
        var local = storage.getItem(this.options.prefix + lng);

        if (local) {
          local = JSON.parse(local);
          if (local.i18nStamp && local.i18nStamp + this.options.expirationTime > nowMS) {
            store[lng] = local;
          }
        }

        todo--;
        if (todo === 0) callback(null, store);
      });
    }
  }

  store(store) {
    if(window.localStorage) {
      for (var m in store) {
        store[m].i18nStamp = new Date().getTime();
        storage.setItem(this.options.prefix + m, JSON.stringify(store[m]));
      }
    }
    return;
  }

  save(store) {
    this.debouncedStore(store);
    return;
  }
}

Cache.type = 'cache';

export default Cache;
