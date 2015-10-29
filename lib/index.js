'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var storage = {
  setItem: function setItem(key, value) {
    if (window.localStorage) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        //f.log('failed to set value for key "' + key + '" to localStorage.');
      }
    }
  },
  getItem: function getItem(key, value) {
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
    expirationTime: 7 * 24 * 60 * 60 * 1000
  };
}

var Cache = (function () {
  function Cache(services) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Cache);

    this.init(services, options);

    this.type = 'cache';
  }

  _createClass(Cache, [{
    key: 'init',
    value: function init(services) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      this.services = services;
      this.options = utils.defaults(options, this.options || {}, getDefaults());
    }
  }, {
    key: 'load',
    value: function load(lngs, callback) {
      var _this = this;

      var store = {},
          nowMS = new Date().getTime();

      if (window.localStorage) {
        (function () {
          var todo = lngs.length;

          lngs.forEach(function (lng) {
            var local = storage.getItem(_this.options.prefix + lng);

            if (local) {
              local = JSON.parse(local);
              if (local.i18nStamp && local.i18nStamp + _this.options.expirationTime > nowMS) {
                store[lng] = local;
              }
            }

            todo--;
            if (todo === 0) callback(null, store);
          });
        })();
      }
    }
  }, {
    key: 'save',
    value: function save(store) {
      if (window.localStorage) {
        for (var m in store) {
          store[m].i18nStamp = new Date().getTime();
          storage.setItem(this.options.prefix + m, JSON.stringify(store[m]));
        }
      }
      return;
    }
  }]);

  return Cache;
})();

exports['default'] = Cache;
module.exports = exports['default'];