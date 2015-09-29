/**
 * Route Action
 */
'use strict';

var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../commons/ActionTypes');

var AppActions = {

  loginUser: function(jwt) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.Login,
      jwt: jwt
    });
  },

  logoutUser: function() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.Logout
    });
  }

};

module.exports = AppActions;
