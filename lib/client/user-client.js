var config = require('../config-user');
var Promise = require('bluebird');
var request = require('request');

//A client for making requests to the cloud side of the user module.
function UserClient() {
}

/**
 * Calling the list endpoint in the `server/router.js` file.
 *
 * This endpoint will be mounted on the cloud side of the module.
 *
 * @param callback - function to be called when the response has returned from the cloud.
 */
UserClient.prototype.list = Promise.promisify(function list(callback) {

  //This url is where the users cloud side router is mounted in a cloud app.
  var listUrl = config.apiHost + config.apiPath;

  //Making a get request that will get a list of users.
  request.get({
    url: listUrl,
    json: true
  }, function(error, httpResponse, body) {
    return callback(error, body);
  });
});


/**
 * Calling the create endpoint to create a new user.
 *
 * @param userToCreate - Object describing the user to create.
 * @param callback     - function to be called when the response has returned from the cloud.
 */
UserClient.prototype.create = Promise.promisify(function create(userToCreate, callback) {
  //This url is where the users cloud side router is mounted in a cloud app. See `server/router.js`
  var createUrl = config.apiHost + config.apiPath;

  //Making a POST request that will add the user and return the created user from the cloud.
  request.post({
    url: createUrl,
    body: userToCreate,
    json: true
  }, function(error, httpResponse, body) {

    if (httpResponse.statusCode > 200) {
      error = body;
    }

    return callback(error, body);
  });

});


module.exports = new UserClient();