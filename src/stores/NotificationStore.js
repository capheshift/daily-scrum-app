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

/**
 * Variables
 */
var DEBUG = false;
var _name = 'Store';

/**
 * Store Start
 */
var Store = assign({}, EventEmitter.prototype, {
  // listener events zone
  addListenerOnNotification: function(callback, context) {
    this.on(Events.Notification, callback, context);
  },
  rmvListenerOnNotification: function(context) {
    this.removeListener(Events.Notification, context);
  },

  notification: function(data) {
    setTimeout(function() {
      this.emit(Events.Notification, data);
    }.bind(this), 0);
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
    case Actions.Notification:
      Store.notification(payload.data);
      break;

    default:
      if (DEBUG) {
        console.log('[x] ' + _name + ':actionType --- NOT MATCH');
      }
      return true;
  }

  // If action was responded to, emit change event
  // Store.emitChange();

  if (DEBUG) {
    console.log('[*] ' + _name + ':emitChange ---');
  }

  return true;
});

module.exports = Store;
