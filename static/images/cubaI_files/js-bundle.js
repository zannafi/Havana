// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"OFI9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ARRAY = Array;
var matchesAdded = false;

function asArray(arr) {
  if (arr != undefined) {
    if (ARRAY.from != undefined) return ARRAY.from(arr);else {
      var newArr = [];

      for (var i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
      }

      return newArr;
    }
  } else {
    console.debug('Array was undefined.');
    return [];
  }
}

exports.asArray = asArray;

function isDefined(obj) {
  return obj != undefined;
}

exports.isDefined = isDefined;

function isNotBlank(obj) {
  return isDefined(obj) && obj !== '';
}

exports.isNotBlank = isNotBlank;

function isNotEmpty(obj) {
  return isDefined(obj) && isDefined(obj.length) && obj.length > 0;
}

exports.isNotEmpty = isNotEmpty;

function getIfDefined(obj, truthyFunc, defaultValue) {
  return isDefined(obj) ? isDefined(truthyFunc) ? truthyFunc(obj) : obj : defaultValue;
}

exports.getIfDefined = getIfDefined;

function matchesFunctionAdd() {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;

      while (--i >= 0 && matches.item(i) !== this) {}

      return i > -1;
    };

    matchesAdded = true;
  }
}

function findAncestor(el, sel) {
  if (!matchesAdded) matchesFunctionAdd();

  if (typeof el.closest === 'function') {
    return el.closest(sel) || null;
  }

  while (el) {
    if (el.matches(sel)) {
      return el;
    }

    el = el.parentElement;
  }

  return null;
}

exports.findAncestor = findAncestor;
},{}],"d7bd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function sendToEndpoint(url, method, body) {
  return new Promise(function (resolve, reject) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener('load', function (e) {
      var response = e.currentTarget;
      if (response.readyState === 4 && response.status === 200) resolve(response);else reject("Endpoint returned " + response.status + " status.");
    });
    httpRequest.addEventListener('error', function (e) {
      return reject(e);
    });
    httpRequest.open(method != undefined ? method : 'GET', url, true);
    httpRequest.setRequestHeader('Content-type', 'application/json');
    httpRequest.send(body);
  });
}

exports.sendToEndpoint = sendToEndpoint;
},{}],"P7qR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

var rest_service_1 = require("./rest-service");

(function ($window) {
  setTimeout(function () {
    var INPUT_VALIDATION_TRIGGER_EVENTS = ['change', 'keyup'];
    var signupForms = utils_1.asArray($window.document.querySelectorAll('[email-signup]'));
    var openerElement = $window.document.getElementById('mvhtrn-opener');
    var linksElement = $window.document.querySelector('.mvhc-links');
    signupForms.forEach(function (signupForm) {
      var signupSubmit = signupForm.querySelector('[email-signup-submit]');
      var signupElements = utils_1.asArray(signupForm.querySelectorAll('[email-signup] [form-validate]'));
      signupElements.forEach(function (element) {
        return INPUT_VALIDATION_TRIGGER_EVENTS.forEach(function (event) {
          return element.querySelector('input').addEventListener(event, function (e) {
            if (e.keyCode !== 9) {
              if (signupForm.checkValidity()) signupSubmit.disabled = false;else signupSubmit.disabled = true;
              element.classList.remove('pristine');
            }
          });
        });
      });
      signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        rest_service_1.sendToEndpoint('/.rest/newsletter/v1/signup', 'POST', JSON.stringify({
          forename: signupElements[0].querySelector('input').value,
          email: signupElements[1].querySelector('input').value
        })).then(function (res) {
          var result = JSON.parse(res.response);

          if (result != undefined && result.success != undefined && result.success) {
            utils_1.asArray($window.document.querySelectorAll('[email-signup-popup], [signup-content-container]')).forEach(function (successContainer) {
              return successContainer.classList.add('mvhtrn-success');
            });
          }
        }).catch(function (e) {
          return console.error(e);
        });
      });
    });
    openerElement && openerElement.addEventListener('change', function (e) {
      return linksElement.classList.toggle('mvhf-freeze');
    });
  });
})(window);
},{"./utils":"OFI9","./rest-service":"d7bd"}],"kqpr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var BannerSwitch =
/** @class */
function () {
  function BannerSwitch() {}

  BannerSwitch.switchBanner = function (selector, lsKey) {
    var bannerSwitch = document.getElementById(selector);
    var bannerDismissed = localStorage.getItem(lsKey);

    if (bannerSwitch != undefined && (bannerDismissed == undefined || bannerDismissed !== 'true')) {
      bannerSwitch.addEventListener('change', function () {
        localStorage.setItem(lsKey, 'true');
        bannerSwitch.checked = false;
      });
      bannerSwitch.checked = true;
    }
  };

  return BannerSwitch;
}();

exports.default = BannerSwitch;
},{}],"Zbiv":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var banner_switch_1 = __importDefault(require("../common/banner-switch"));

(function (bannerSwitch, localStorageKey) {
  return banner_switch_1.default.switchBanner(bannerSwitch, localStorageKey);
})('mvh-gdpr-banner-switch', 'gdpr-dismissed');
},{"../common/banner-switch":"kqpr"}],"51TX":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var banner_switch_1 = __importDefault(require("../common/banner-switch"));

(function (bannerSwitch, localStorageKey) {
  return banner_switch_1.default.switchBanner(bannerSwitch, localStorageKey);
})('mvh-emergency-banner-switch', 'emergency-dismissed');
},{"../common/banner-switch":"kqpr"}],"mI6u":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../common/utils");

(function (hotlistListLinkAttr, hotlistStorageKey, callback) {
  setTimeout(function () {
    return callback(hotlistListLinkAttr, hotlistStorageKey);
  });
  window.addEventListener('message', function (message) {
    if (utils_1.isDefined(message) && utils_1.isDefined(message.data) && message.data === 'HOTLISTS_UPDATED') {
      callback(hotlistListLinkAttr, hotlistStorageKey);
    }
  });
})('header-hotlist-link', 'HOTLIST_STORE', function (hotlistListLinkAttr, hotlistStorageKey) {
  var hotlistStore = localStorage.getItem(hotlistStorageKey);

  if (utils_1.isNotBlank(hotlistStore)) {
    try {
      var hotlistStorage = JSON.parse(hotlistStore);

      if (utils_1.isNotEmpty(hotlistStorage.lists)) {
        document.querySelector("[" + hotlistListLinkAttr + "]").classList.add('full-mode');
      }
    } catch (e) {
      console.error(e);
    }
  }
});
},{"../common/utils":"OFI9"}],"lwLV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // Common

require("../common/email-signup"); // Header


require("./gdpr-banner");

require("./emergency-banner");

require("./hotlist-link");
},{"../common/email-signup":"P7qR","./gdpr-banner":"Zbiv","./emergency-banner":"51TX","./hotlist-link":"mI6u"}]},{},["lwLV"], null)
//# sourceMappingURL=/js-bundle.js.map