/**
 * Route Action
 */
'use strict';

var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../commons/enum/ActionTypes');

var Actions = {

  create: function(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CreateProject,
      data: data
    });
  },

};

module.exports = Actions;
