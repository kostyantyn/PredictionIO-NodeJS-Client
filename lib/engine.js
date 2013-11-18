var connection = require('./connection');

module.exports = {
  similarItems: function(engineName, itemId, maxNumber, customOptions, callback) {
    if (typeof customOptions == 'function') {
      callback      = customOptions;
      customOptions = {};
    }

    customOptions['pio_iid'] = itemId.toString();
    customOptions['pio_n']   = maxNumber;

    connection.getData('/engines/itemsim/' + engineName + '/topn', customOptions, callback);
  },
  recommendedItems: function(engineName, userId, maxNumber, customOptions, callback) {
    if (typeof customOptions == 'function') {
      callback      = customOptions;
      customOptions = {};
    }

    customOptions['pio_uid'] = userId.toString();
    customOptions['pio_n']   = maxNumber;

    connection.getData('/engines/itemrec/' + engineName + '/topn', customOptions, callback);
  }
};