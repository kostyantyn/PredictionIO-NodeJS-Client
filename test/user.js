var nock       = require('nock');
var prediction = require('..');
var assert     = require('assert');

prediction.config.APP_KEY = 'key';

function assert_objects(actual, expected) {
  assert.equal(JSON.stringify(actual), JSON.stringify(expected));
}

describe('User', function() {
  describe('getUser', function() {
    before(function() {
      nock('http://localhost:8000').get('/users/1.json?pio_appkey=key').reply(200, {uid: 1});
      nock('http://localhost:8000').get('/users/2.json?pio_appkey=key').reply(400, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
      nock('http://localhost:8000').get('/users/3.json?pio_appkey=key').reply(404, {message: 'Cannot find user.'});
    });

    it('should return user object', function(done) {
      prediction.user.getUser(1, function(err, data) {
        assert_objects(data, {uid: 1});
        done();
      });
    });

    it('should return error message if pio_appkey is missed', function(done) {
      prediction.user.getUser(2, function(err, data) {
        assert_objects(data, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
        done();
      });
    });

    it('should return error message if cannot find user by ID', function(done) {
      prediction.user.getUser(3, function(err, data) {
        assert_objects(data, {message: 'Cannot find user.'});
        done();
      });
    });
  });

  describe('createUser', function() {
    before(function() {
      nock('http://localhost:8000').post('/users.json', {pio_appkey: 'key', pio_uid: 1}).reply(201, {message: 'User created.'});
      nock('http://localhost:8000').post('/users.json', {pio_appkey: 'key', pio_uid: 2}).reply(400, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
    });

    it('should return created user object', function(done) {
      prediction.user.createUser(1, function(err, data) {
        assert_objects(data, {message: 'User created.'});
        done();
      });
    });

    it('should return error message if pio_appkey is missed', function(done) {
      prediction.user.createUser(2, function(err, data) {
        assert_objects(data, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
        done();
      });
    });
  });

  describe('deleteUser', function() {
    before(function() {
      nock('http://localhost:8000').delete('/users/1.json?pio_appkey=key').reply(200, {message: 'User deleted.'});
      nock('http://localhost:8000').delete('/users/2.json?pio_appkey=key').reply(400, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
    });

    it('should return created user object', function(done) {
      prediction.user.deleteUser(1, function(err, data) {
        assert_objects(data, {message: 'User deleted.'});
        done();
      });
    });

    it('should return error message if pio_appkey is missed', function(done) {
      prediction.user.deleteUser(2, function(err, data) {
        assert_objects(data, {errors: [{field: 'pio_appkey', message: 'This field is required'}]});
        done();
      });
    });
  });
});