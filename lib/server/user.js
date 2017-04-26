
/**
 * Setting up the user store to handle topics related to users.
 *
 * Whenever one of the topics below are published elsewhere (in this example, it is published by the http request handler in the router.js file),
 * the mediator will execute the relevant topic below to perform some logic to satify the topic.
 *
 * @param {ModRain} modrain
 */
module.exports = function setUpUserStore(modrain) {
  var userModule = modrain.registerModule('user');


  //This can also be done by passing a set of handlers to the `registerModule` function
  userModule.registerHandler('create', function(userToCreate) {

    //Business logic related to creating the user.
    userToCreate.timeCreated = new Date();

    //Expecting the store.user namespace to be created.
    return modrain.store.user.create(userToCreate);
  });

  //Handling Listing Users
  userModule.registerHandler('list', function() {
    return modrain.store.user.list();
  });
};