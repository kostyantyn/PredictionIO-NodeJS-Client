var connection = require('./connection');

module.exports = {
  getItem: function(itemId, customOptions, callback) {
    if (typeof customOptions == 'function') {
      callback      = customOptions;
      customOptions = {};
    }

    connection.getData('/items/' + itemId, customOptions, callback);
  },

  createItem: function(itemId, itemTypes, customOptions, callback) {
    if (typeof itemTypes == 'string') {
      itemTypes = itemTypes.split(',');
    }

    if (typeof customOptions == 'function') {
      callback      = customOptions;
      customOptions = {};
    }

    customOptions['pio_iid']    = itemId.toString();
    customOptions['pio_itypes'] = itemTypes.join(',');
    connection.postData('/items', customOptions, callback);
  },

  deleteItem: function(itemId, callback) {
    connection.deleteData('/items/' + itemId, callback);
  }
};