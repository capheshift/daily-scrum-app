/**
 * Action Type
 */

'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({
  LoginSuccess: null,
  LoginFail: null,

  LogoutSuccess: null,
  LogoutFail: null,

  RegisterSuccess: null,
  RegisterFail: null,

  CreateProjectSuccess: null,
  CreateProjectFail: null,

  GetAllProjectSuccess: null,
  GetAllProjectFail: null,

  GetAllSuccess: null,
  GetAllFail: null,

  GetAllUsersSuccess: null,
  GetAllUsersFail: null,

  NewTaskSuccess: null,
  NewTaskFail: null,
  UpdateTaskSuccess: null,
  UpdateTaskFail: null,

  GetAllUserProjectSuccess: null,
  GetAllUserProjectFail: null,

  FindTaskSuccess: null,
  FindTaskFail: null,

  REQUEST_START: null,
  REQUEST_END: null

});
