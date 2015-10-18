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

  GetAllUsersSuccess: null,
  GetAllUsersFail: null,

  NewTaskSuccess: null,
  NewTaskFail: null,
  UpdateTaskSuccess: null,
  UpdateTaskFail: null
});
