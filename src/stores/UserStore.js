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
var UserApis = require('../commons/service-api').UserApis;

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
  // listener for login
  addListenerOnLoginSuccess: function(callback, context) {
    this.on(Events.LoginSuccess, callback, context);
  },
  rmvListenerOnLoginSuccess: function(context) {
    this.removeListener(Events.LoginSuccess, context);
  },
  addListenerOnLoginFail: function(callback, context) {
    this.on(Events.LoginFail, callback, context);
  },
  rmvListenerOnLoginFail: function(context) {
    this.removeListener(Events.LoginFail, context);
  },
  // listener for login
  addListenerOnLogoutSuccess: function(callback, context) {
    this.on(Events.LogoutSuccess, callback, context);
  },
  rmvListenerOnLogoutSuccess: function(context) {
    this.removeListener(Events.LogoutSuccess, context);
  },
  addListenerOnLogoutFail: function(callback, context) {
    this.on(Events.LogoutFail, callback, context);
  },
  rmvListenerOnLogoutFail: function(context) {
    this.removeListener(Events.LogoutFail, context);
  },
  // listener for getAllUsers
  addListenerOnGetAllUsersSuccess: function(callback, context) {
    this.on(Events.GetAllUsersSuccess, callback, context);
  },
  rmvListenerOnGetAllUsersSuccess: function(context) {
    this.removeListener(Events.GetAllUsersSuccess, context);
  },
  addListenerOnGetAllUsersFail: function(callback, context) {
    this.on(Events.GetAllUsersFail, callback, context);
  },
  rmvListenerOnGetAllUsersFail: function(context) {
    this.removeListener(Events.GetAllUsersFail, context);
  },

  // functions
  login: function(data) {
    console.log('login data', data);
    console.log('register data', data);

    UserApis.login(data).then(
    function(body) {
      // set token into localstorage
      window.localStorage.setItem('token', body.data.token);
      window.localStorage.setItem('fullName', body.data.user.fullName);
      window.localStorage.setItem('_id', body.data.user._id);
      this.emit(Events.LoginSuccess, body.data.user);
    }.bind(this),
    function(err) {
      this.emit(Events.LoginFail, err);
    }.bind(this));
  },

  logout: function(data) {
    console.log('logout data', data);
    window.localStorage.clear();
    this.emit(Events.LogoutSuccess);
  },

  register: function(data) {
    console.log('register data', data);

    UserApis.register(data).then(
    function(body) {
      console.log('register', body);
      // set token into localstorage
      window.localStorage.setItem('token', body.data.token);
      window.localStorage.setItem('fullName', body.data.user.fullName);
      window.localStorage.setItem('_id', body.data.user._id);
      this.emit(Events.RegisterSuccess, body);
    }.bind(this),
    function(err) {
      this.emit(Events.RegisterFail, err);
    }.bind(this));
  },

  getAllUsers: function() {
    UserApis.all().then(
    function(data) {
      this.emit(Events.GetAllUsersSuccess, data);
    }.bind(this),
    function(err) {
      this.emit(Events.GetAllUsersFail, err);
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

    case Actions.GetAllUsers:
      UserStore.getAllUsers();
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
