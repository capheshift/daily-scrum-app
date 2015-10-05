/**
 * Route Action
 */
'use strict';

var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../commons/enum/ActionTypes');

var Actions = {

  login: function(jwt) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.Login,
      jwt: jwt
    });
  },

  logout: function() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.Logout
    });
  },

  register: function(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.Register,
      data: data
    });
  }

};

module.exports = Actions;
