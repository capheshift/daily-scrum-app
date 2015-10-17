/**
 * ToDo Store
 */
'use strict';

/**
 * Libraries
 */
var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('react/lib/Object.assign');
var Actions = require('../commons/enum/ActionTypes');
var Events = require('../commons/enum/EventTypes');
var ProjectApis = require('../commons/service-api').ProjectApis;

/**
 * Variables
 */
var DEBUG = false;
var _name = 'ProjectStore';

/**
 * Store Start
 */
var ProjectStore = assign({}, EventEmitter.prototype, {
  // listener events zone
  addListenerOnCreateSuccess: function(callback, context) {
    this.on(Events.CreateSuccess, callback, context);
  },
  rmvListenerOnCreateSuccess: function(context) {
    this.removeListener(Events.CreateSuccess, context);
  },
  addListenerOnCreateFail: function(callback, context) {
    this.on(Events.CreateFail, callback, context);
  },
  rmvListenerOnCreateFail: function(context) {
    this.removeListener(Events.CreateFail, context);
  },

  // functions
  create: function(data) {

    ProjectApis.create(data).then(
    function(body) {
      // set token into localstorage
      window.localStorage.setItem('token', body.data.token);
      this.emit(Events.CreateSuccess, body);
    }.bind(this),
    function(err) {
      this.emit(Events.CreateFail, err);
    }.bind(this));
  }
});

/**
 * Integrated with Dispatcher
 */
AppDispatcher.register(function(payload) {

  var action = payload.actionType;

  if (DEBUG) {
    console.log('[*] ' + _name + ':Dispatch-Begin --- ' + action);
    console.log('     Payload:');
    console.log(payload);
  }

  // Route Logic
  switch (action) {
    case Actions.Create:
      ProjectStore.create(payload.data);
      break;

    default:
      if (DEBUG) {
        console.log('[x] ' + _name + ':actionType --- NOT MATCH');
      }
      return true;
  }

  // If action was responded to, emit change event
  // UserStore.emitChange();

  if (DEBUG) {
    console.log('[*] ' + _name + ':emitChange ---');
  }

  return true;
});

module.exports = ProjectStore;
