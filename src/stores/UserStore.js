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
var ServiceApi = require('../commons/service-api');

/**
 * Variables
 */
var DEBUG = false;
var _name = 'UserStore';

/**
 * Store Start
 */
var UserStore = assign({}, EventEmitter.prototype, {
  // listener events zone
  addListenerOnRegisterSuccess: function(callback, context) {
    this.on(Events.RegisterSuccess, callback, context);
  },
  rmvListenerOnRegisterSuccess: function(context) {
    this.removeListener(Events.RegisterSuccess, context);
  },
  addListenerOnRegisterFail: function(callback, context) {
    this.on(Events.RegisterFail, callback, context);
  },
  rmvListenerOnRegisterFail: function(context) {
    this.removeListener(Events.RegisterFail, context);
  },

  // functions
  login: function(data) {
    console.log('login data', data);
  },

  logout: function(data) {
    console.log('logout data', data);
  },

  register: function(data) {
    console.log('register data', data);

    ServiceApi.register(data).then(
    function(body) {
      console.log('register', body);
      this.emit(Events.RegisterSuccess, body);
    }.bind(this),
    function(err) {
      this.emit(Events.RegisterFail, err);
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
    case Actions.Login:
      UserStore.login(payload.data);
      break;

    case Actions.Logout:
      UserStore.logout(payload.data);
      break;

    case Actions.Register:
      UserStore.register(payload.data);
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

module.exports = UserStore;
