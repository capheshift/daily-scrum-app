/**
 * Route Action
 */
'use strict';

var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../commons/enum/ActionTypes');

var Actions = {

  login: function(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.Login,
      data: data
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
  },

  getAllUsers: function() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.GetAllUsers
    });
  }

};

module.exports = Actions;
