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
var TaskApis = require('../commons/service-api').TaskApis;

/**
 * Variables
 */
var DEBUG = false;
var _name = 'TaskStore';

/**
 * Store Start
 */
var TaskStore = assign({}, EventEmitter.prototype, {
  // listener events zone
  addListenerOnNewTaskSuccess: function(callback, context) {
    this.on(Events.NewTaskSuccess, callback, context);
  },
  rmvListenerOnNewTaskSuccess: function(context) {
    this.removeListener(Events.NewTaskSuccess, context);
  },
  addListenerOnNewTaskFail: function(callback, context) {
    this.on(Events.NewTaskFail, callback, context);
  },
  rmvListenerOnNewTaskFail: function(context) {
    this.removeListener(Events.NewTaskFail, context);
  },

  // listener events zone
  addListenerOnUpdateTaskSuccess: function(callback, context) {
    this.on(Events.UpdateTaskSuccess, callback, context);
  },
  rmvListenerOnUpdateTaskSuccess: function(context) {
    this.removeListener(Events.UpdateTaskSuccess, context);
  },
  addListenerOnUpdateTaskFail: function(callback, context) {
    this.on(Events.UpdateTaskFail, callback, context);
  },
  rmvListenerOnUpdateTaskFail: function(context) {
    this.removeListener(Events.UpdateTaskFail, context);
  },

  // listener events zone
  addListenerOnFindTaskSuccess: function(callback, context) {
    this.on(Events.FindTaskSuccess, callback, context);
  },
  rmvListenerOnFindTaskSuccess: function(context) {
    this.removeListener(Events.FindTaskSuccess, context);
  },
  addListenerOnFindTaskFail: function(callback, context) {
    this.on(Events.FindTaskFail, callback, context);
  },
  rmvListenerOnFindTaskFail: function(context) {
    this.removeListener(Events.FindTaskFail, context);
  },

  newTask: function(data) {
    console.log('newTask', data);
    TaskApis.create(data).then(
    function(body) {
      this.emit(Events.NewTaskSuccess, body);
    }.bind(this),
    function(err) {
      this.emit(Events.NewTaskFail, err);
    }.bind(this));
  },

  updateTask: function(data) {
    var _id = data._id;
    delete data._id;
    TaskApis.update(data, {_id: _id}).then(
    function(body) {
      this.emit(Events.UpdateTaskSuccess, body);
    }.bind(this),
    function(err) {
      this.emit(Events.UpdateTaskFail, err);
    }.bind(this));
  },

  find: function(params) {
    TaskApis.find(null, params).then(
    function(body) {
      // console.log('find', Events.FindTaskSuccess, body.data);
      this.emit(Events.FindTaskSuccess, body.data);
    }.bind(this),
    function(err) {
      this.emit(Events.FindTaskFail, err);
    }.bind(this));
  },
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
    case Actions.TASK_NEW:
      TaskStore.newTask(payload.data);
      break;

    case Actions.TASK_UPDATE:
      TaskStore.updateTask(payload.data);
      break;

    case Actions.TASK_FIND:
      TaskStore.find(payload.data);
      break;

    default:
      if (DEBUG) {
        console.log('[x] ' + _name + ':actionType --- NOT MATCH');
      }
      return true;
  }

  // If action was responded to, emit change event
  // TaskStore.emitChange();

  if (DEBUG) {
    console.log('[*] ' + _name + ':emitChange ---');
  }

  return true;
});

module.exports = TaskStore;
