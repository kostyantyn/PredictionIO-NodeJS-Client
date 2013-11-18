var connection = require('./connection');

module.exports = {
  createAction: function(actionName, userId, itemId, customOptions, callback) {
    if (typeof customOptions == 'function') {
      callback      = customOptions;
      customOptions = {};
    }

    customOptions['pio_action'] = actionName;
    customOptions['pio_uid']    = userId.toString();
    customOptions['pio_iid']    = itemId.toString();

    connection.postData('/actions/u2i', customOptions, callback);
  },
  rate: function(userId, itemId, rate, customOptions, callback) {
    if (typeof customOptions == 'function') {
      callback      = customOptions;
      customOptions = {};
    }
    customOptions['pio_rate'] = rate;

    this.createAction('rate', userId, itemId, customOptions, callback);
  },
  like: function(userId, itemId, customOptions, callback) {
    this.createAction('like', userId, itemId, customOptions, callback);
  },
  dislike: function(userId, itemId, customOptions, callback) {
    this.createAction('dislike', userId, itemId, customOptions, callback);
  },
  view: function(userId, itemId, customOptions, callback) {
    this.createAction('view', userId, itemId, customOptions, callback);
  },
  conversion: function(userId, itemId, customOptions, callback) {
    this.createAction('conversion', userId, itemId, customOptions, callback);
  }
};