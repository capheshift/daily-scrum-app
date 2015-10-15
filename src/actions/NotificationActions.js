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
  }

};

module.exports = Actions;
