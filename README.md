# PredictionIO Client

## Installation

## Configuration
Set up PredictionIO credentials
```javascript
var prediction = require('predictionio');
prediction.config.APP_KEY = '...';
prediction.config.APP_URL = 'http://localhost:8000' // default
```

## Usage
Manage users
```javascript
var prediction = require('predictionio');
prediction.user.getUser(userId, customOptions, callback);
prediction.user.createUser(userId, customOptions, callback);
prediction.user.deleteUser(userId, customOptions, callback);
```

Manage items
```javascript
var prediction = require('predictionio');
prediction.item.getItem(itemId, customOptions, callback);
prediction.item.postItem(itemId, itemTypes, customOptions, callback);
prediction.item.deleteItem(itemId, customOptions, callback);
```

Create actions
```javascript
var prediction = require('predictionio');
prediction.action.rate(userId, itemId, rate, customOptions, callback);
prediction.action.like(userId, itemId, customOptions, callback);
prediction.action.dislike(userId, itemId, customOptions, callback);
prediction.action.view(userId, itemId, customOptions, callback);
prediction.action.conversion(userId, itemId, customOptions, callback);
```

Fetch similar/recommended items
```javascript
var prediction = require('predictionio');
prediction.engine.similarItems(engineName, itemId, maxNumber, customOptions, callback);
prediction.engine.recommendedItems(engineName, userId, maxNumber, customOptions, callback);
```
