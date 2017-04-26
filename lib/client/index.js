var userClient = require('./user-client');

module.exports = function(modrain) {

  var userModule = modrain.registerModule('user');

  userModule.registerHandler('create', function(userToCreate) {
      return userClient.create(userToCreate);
  });

  userModule.registerHandler('list', function() {
    return userClient.list();
  });
};