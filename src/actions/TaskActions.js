/**
 * Route Action
 */
'use strict';

var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../commons/enum/ActionTypes');

var AppActions = {

  /**
   * Set the current route.
   * @param {string} route Supply a route value, such as `todos/completed`.
   */
  newTask: function(data) {
    console.log('Action newTask', data);
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.TASK_NEW,
      data: data
    });
  },

  updateTask: function(data) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.TASK_UPDATE,
      data: data
    });
  }
};

module.exports = AppActions;
