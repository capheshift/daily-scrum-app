/**
 * Route Action
 */
'use strict';

var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../commons/enum/ActionTypes');

var Actions = {

  notification: function(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.Notification,
      data: data
    });
  },

  startRequest: function(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_START,
      data: data
    });
  },

  endRequest: function(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_END,
      data: data
    });
  }

};

module.exports = Actions;
