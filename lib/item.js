var connection = require('./connection');

module.exports = {
  getItem: function(userId, customOptions, callback) {
    if (typeof customOptions == 'function') {
      callback      = customOptions;
      customOptions = {};
    }

    connection.getData('/items/' + userId, customOptions, callback);
  },

  createItem: function(itemId, itemTypes, customOptions, callback) {
    if (typeof itemTypes == 'string') {
      itemTypes = [itemTypes];
    }

    if (typeof customOptions == 'function') {
      callback      = customOptions;
      customOptions = {};
    }

    customOptions['pio_iid']    = itemId.toString();
    customOptions['pio_itypes'] = itemTypes.join(',');
    connection.postData('/items', customOptions, callback);
  }
};