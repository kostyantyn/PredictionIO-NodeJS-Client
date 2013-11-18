var config      = require('./config');
var request     = require('request');
var querystring = require('querystring');

module.exports = {
  getData: function(path, options, callback) {
    options['pio_appkey'] = config.APP_KEY;
    request.get(config.APP_HOST + path + '.json?' + querystring.stringify(options), function(err, response) {
      if (err) callback(err);
      else callback(null, JSON.parse(response.body));
    });
  },
  postData: function(path, options, callback) {
    options['pio_appkey'] = config.APP_KEY;
    request.post(config.APP_HOST + path + '.json', {form: options}, function(err, response) {
      if (err) callback(err);
      else callback(null, JSON.parse(response.body));
    });
  }
};