var config  = require('./config');
var request = require('request');
var qs      = require('qs');

module.exports = {
  getData: function(path, options, callback) {
    options['pio_appkey'] = config.APP_KEY;
    request.get(this._url(path, options), function(err, response) {
      if (err) callback(err);
      else callback(null, JSON.parse(response.body));
    });
  },
  postData: function(path, options, callback) {
    options['pio_appkey'] = config.APP_KEY;
    request.post(this._url(path), {form: options}, function(err, response) {
      if (err) callback(err);
      else callback(null, JSON.parse(response.body));
    });
  },
  deleteData: function(path, callback) {
    request.del(this._url(path, {pio_appkey: config.APP_KEY}), function(err, response) {
      if (err) callback(err);
      else callback(null, JSON.parse(response.body));
    });
  },
  _url: function(path, options) {
    var url = config.APP_HOST + path + '.json';

    if (typeof options == 'object') {
      var query = qs.stringify(options);
      if (query.length) url += '?' + query;
    }

    return url;
  }
};