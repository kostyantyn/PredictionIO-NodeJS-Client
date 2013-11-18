var connection = require('./connection');

module.exports = {
  getUser: function(userId, customOptions, callback) {
    if (typeof customOptions == 'function') {
      callback      = customOptions;
      customOptions = {};
    }

    connection.getData('/users/' + userId, customOptions, callback);
  },

  createUser: function(userId, customOptions, callback) {
    if (typeof customOptions == 'function') {
      callback      = customOptions;
      customOptions = {};
    }

    customOptions['pio_uid'] = userId.toString();
    connection.postData('/users', customOptions, callback);
  }
};