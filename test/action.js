var nock       = require('nock');
var prediction = require('..');
var assert     = require('assert');

prediction.config.APP_KEY = 'key';

function assert_objects(actual, expected) {
  assert.equal(JSON.stringify(actual), JSON.stringify(expected));
}

describe('Action', function() {
  before(function() {
    nock('http://localhost:8000').post('/actions/u2i.json', {pio_appkey: 'key', pio_action: 'rate', pio_uid: 1, pio_iid: 2, pio_rate: 3}).reply(201, {message: 'Action rate recorded.'});
    nock('http://localhost:8000').post('/actions/u2i.json', {pio_appkey: 'key', pio_action: 'like', pio_uid: 1, pio_iid: 2}).reply(201, {message: 'Action like recorded.'});
    nock('http://localhost:8000').post('/actions/u2i.json', {pio_appkey: 'key', pio_action: 'dislike', pio_uid: 1, pio_iid: 2}).reply(201, {message: 'Action dislike recorded.'});
    nock('http://localhost:8000').post('/actions/u2i.json', {pio_appkey: 'key', pio_action: 'view', pio_uid: 1, pio_iid: 2}).reply(201, {message: 'Action view recorded.'});
    nock('http://localhost:8000').post('/actions/u2i.json', {pio_appkey: 'key', pio_action: 'conversion', pio_uid: 1, pio_iid: 2}).reply(201, {message: 'Action conversion recorded.'});
  });

  describe('rate', function(done) {
    prediction.action.rate(1, 2, 3, function(err, data) {
      assert_objects(data, {message: 'Action rate recorded.'});
      done();
    });
  });

  describe('like', function(done) {
    prediction.action.like(1, 2, function(err, data) {
      assert_objects(data, {message: 'Action like recorded.'});
      done();
    });
  });

  describe('dislike', function(done) {
    prediction.action.dislike(1, 2, function(err, data) {
      assert_objects(data, {message: 'Action dislike recorded.'});
      done();
    });
  });

  describe('view', function(done) {
    prediction.action.view(1, 2, 3, function(err, data) {
      assert_objects(data, {message: 'Action view recorded.'});
      done();
    });
  });

  describe('conversion', function(done) {
    prediction.action.conversion(1, 2, 3, function(err, data) {
      assert_objects(data, {message: 'Action conversion recorded.'});
      done();
    });
  });
});