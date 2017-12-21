'use strict';

(function () {
  window.synchronizeField = function (changedElement, dependentElement, changedValues, dependentValues, callback, runOnInit) {
    var changeEventHandler = function () {
      for (var i = 0; i < changedValues.length; i++) {
        if (changedElement.value === changedValues[i].toString()) {
          callback(dependentElement, dependentValues[i]);
          return;
        }
      }
    };
    changedElement.addEventListener('change', changeEventHandler);

    if (runOnInit) {
      changeEventHandler();
    }
  };

  window.synchronizeDisabledValues = function (element, value) {
    Array.prototype.forEach.call(element, function (item) {
      if (value.constructor === Array) {
        item.disabled = true;

        if (value.indexOf(parseInt(item.value, 10)) > -1) {
          item.disabled = false;
          element.value = item.value;
        }
        return;
      }

      item.disabled = true;
      if (parseInt(item.value, 10) === parseInt(value, 10)) {
        item.disabled = false;
        element.value = item.value;
      }
    });
  };
})();
