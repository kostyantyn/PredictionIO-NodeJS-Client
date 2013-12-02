var nock       = require('nock');
var prediction = require('..');
var assert     = require('assert');

prediction.config.APP_KEY = 'key';

function assert_objects(actual, expected) {
  assert.equal(JSON.stringify(actual), JSON.stringify(expected));
}

describe('Engine', function() {
  describe('similarItems', function() {
    before(function() {
      nock('http://localhost:8000').get('/engines/itemsim/one/topn.json?pio_iid=1&pio_n=5&pio_appkey=key').reply(200, {pio_iids: ['1', '2', '3']});
      nock('http://localhost:8000').get('/engines/itemsim/two/topn.json?pio_iid=1&pio_n=5&pio_appkey=key').reply(400, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
    });

    it('should return similar item ids', function(done) {
      prediction.engine.similarItems('one', 1, 5, function(err, data) {
        assert_objects(data, {pio_iids: ['1', '2', '3']});
        done();
      });
    });

    it('should return error message if pio_appkey is missed', function(done) {
      prediction.engine.similarItems('two', 1, 5, function(err, data) {
        assert_objects(data, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
        done();
      });
    });
  });

  describe('recommendedItems', function() {
    before(function() {
      nock('http://localhost:8000').get('/engines/itemrec/one/topn.json?pio_uid=1&pio_n=5&pio_appkey=key').reply(200, {pio_iids: ['1', '2', '3']});
      nock('http://localhost:8000').get('/engines/itemrec/two/topn.json?pio_uid=1&pio_n=5&pio_appkey=key').reply(400, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
    });

    it('should return similar item ids', function(done) {
      prediction.engine.recommendedItems('one', 1, 5, function(err, data) {
        assert_objects(data, {pio_iids: ['1', '2', '3']});
        done();
      });
    });

    it('should return error message if pio_appkey is missed', function(done) {
      prediction.engine.recommendedItems('two', 1, 5, function(err, data) {
        assert_objects(data, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
        done();
      });
    });
  });
});