var nock       = require('nock');
var prediction = require('..');
var assert     = require('assert');

prediction.config.APP_KEY = 'key';

function assert_objects(actual, expected) {
  assert.equal(JSON.stringify(actual), JSON.stringify(expected));
}

describe('Item', function() {
  describe('getItem', function() {
    before(function() {
      nock('http://localhost:8000').get('/items/1.json?pio_appkey=key').reply(200, {pio_iid: 1, pio_itypes: ['one', 'two']});
      nock('http://localhost:8000').get('/items/2.json?pio_appkey=key').reply(400, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
      nock('http://localhost:8000').get('/items/3.json?pio_appkey=key').reply(404, {message: 'Cannot find item.'});
    });

    it('should return item object', function(done) {
      prediction.item.getItem(1, function(err, data) {
        assert_objects(data, {pio_iid: 1, pio_itypes: ['one', 'two']});
        done();
      });
    });

    it('should return error message if pio_appkey is missed', function(done) {
      prediction.item.getItem(2, function(err, data) {
        assert_objects(data, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
        done();
      });
    });

    it('should return error message if cannot find item by ID', function(done) {
      prediction.item.getItem(3, function(err, data) {
        assert_objects(data, {message: 'Cannot find item.'});
        done();
      });
    });
  });

  describe('createItem', function() {
    before(function() {
      nock('http://localhost:8000').post('/items.json', {pio_appkey: 'key', pio_iid: 1, pio_itypes: 'one,two'}).reply(201, {message: 'Item created.'});
      nock('http://localhost:8000').post('/items.json', {pio_appkey: 'key', pio_iid: 2, pio_itypes: 'one,two'}).reply(400, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
    });

    it('should return created item object', function(done) {
      prediction.item.createItem(1, ['one', 'two'], function(err, data) {
        assert_objects(data, {message: 'Item created.'});
        done();
      });
    });

    it('should return error message if pio_appkey is missed', function(done) {
      prediction.item.createItem(2, ['one', 'two'], function(err, data) {
        assert_objects(data, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
        done();
      });
    });
  });

  describe('deleteItem', function() {
    before(function() {
      nock('http://localhost:8000').delete('/items/1.json?pio_appkey=key').reply(200, {message: 'Item deleted.'});
      nock('http://localhost:8000').delete('/items/2.json?pio_appkey=key').reply(400, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
    });

    it('should return created item object', function(done) {
      prediction.item.deleteItem(1, function(err, data) {
        assert_objects(data, {message: 'Item deleted.'});
        done();
      });
    });

    it('should return error message if pio_appkey is missed', function(done) {
      prediction.item.deleteItem(2, function(err, data) {
        assert_objects(data, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
        done();
      });
    });
  });
});