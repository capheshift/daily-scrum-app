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

  all: function(){
    AppDispatcher.dispatch({
      actionType: ActionTypes.All
    });
  }

};

module.exports = Actions;
