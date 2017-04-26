var express = require('express');
var user = require('./user');
var config = require('../config-user');

/**
 * Setting up an ExpressJS router to handle requests from the client side of this module.
 * @param {Module} modrain
 */
module.exports = function setUpEventRouter(modrain) {

  //Setting up the user store on the same mediator
  //This registers the events needed to deal with the user store.
  user(modrain);

  //Creating a new standard ExpressJS router to deal with http requests.
  //This router can be mounted on any ExpressJS route.
  var userRouter = express.Router();

  //Mounting the user routes on the same API Path as used by the client side `angular/services/user-client`
  var userRoute = userRouter.route(config.apiPath);

  //This route handles https request from the client side to list all users.
  //This is called from the `angular/services/user-client.js` on the client side.
  userRoute.get(function(req, res) {
    modrain.user.list().then(function(users) {
      res.json(users);
    }).catch(function(err) {
      res.status(500).json(err);
    });
  });

  //Handler to process a request to create a new user.
  //This endpoint is called from the `angular/services/user-client.js`
  userRoute.post(function(req, res) {
    modrain.user.create(req.body).then(function(createdUser) {
      res.json(createdUser);
    }).catch(function(err) {
      res.status(500).end(err.message);
    });
  });

  return userRouter;
};