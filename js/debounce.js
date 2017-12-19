'use strict';

(function () {

  window.debounce = function (fun, argument, interval) {
    window.setTimeout(function () {
      fun(argument);
    }, interval);
  };
})();
