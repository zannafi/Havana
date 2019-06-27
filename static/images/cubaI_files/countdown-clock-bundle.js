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
})({"components/countdown-clock/countdown-clock-bundle.ts":[function(require,module,exports) {
(function ($interval, secondsInDay, secondsInHour, secondsInMinute, getDisplayStr, createDisplayHTML) {
  var workOutTimeDiff = function workOutTimeDiff() {
    var countdownClock = document.querySelector('[data-end-date-time]');

    if (countdownClock != undefined && countdownClock.dataset != undefined) {
      var clockEndTimeStr = countdownClock.dataset.endDateTime;
      var endDateTime = new Date(clockEndTimeStr);
      var difference = endDateTime.getTime() - new Date().getTime();

      if (difference <= 0) {
        countdownClock.remove();
      }

      var remaining = difference / 1000;
      var daysDiff = remaining / secondsInDay;
      remaining = daysDiff % 1 * secondsInDay;
      var hoursDiff = remaining / secondsInHour;
      remaining = hoursDiff % 1 * secondsInHour;
      var minsDiff = remaining / secondsInMinute;
      remaining = minsDiff % 1 * secondsInMinute;
      var daysDisplay = getDisplayStr(Math.floor(daysDiff));
      var hoursDisplay = getDisplayStr(Math.floor(hoursDiff));
      var minsDisplay = getDisplayStr(Math.floor(minsDiff));
      var secsDisplay = getDisplayStr(Math.floor(remaining));
      countdownClock.innerHTML = createDisplayHTML(daysDisplay, hoursDisplay, minsDisplay, secsDisplay);
    }
  };

  $interval(workOutTimeDiff, 500);
  workOutTimeDiff();
})(setInterval, 86400, 3600, 60, function (diff) {
  return diff >= 10 ? diff.toString() : "0" + diff;
}, function (days, hours, mins, secs) {
  return "<div class=\"time-display days-remaining\">\n        <div class=\"td-time-view\">" + days + "</div>\n        <div class=\"td-legend\">Days</div>\n    </div>\n    <div class=\"time-display hours-remaining\">\n        <div class=\"td-time-view\">" + hours + "</div>\n        <div class=\"td-legend\">Hrs</div>\n    </div>\n    <div class=\"time-display mins-remaining\">\n        <div class=\"td-time-view\">" + mins + "</div>\n        <div class=\"td-legend\">Mins</div>\n    </div>\n    <div class=\"time-display secs-remaining\">\n        <div class=\"td-time-view\">" + secs + "</div>\n        <div class=\"td-legend\">Secs</div>\n    </div>";
});
},{}]},{},["components/countdown-clock/countdown-clock-bundle.ts"], "rebuildJS")
//# sourceMappingURL=components/countdown-clock/countdown-clock-bundle.js.map