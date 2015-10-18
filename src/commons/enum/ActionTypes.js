/**
 * Action Type
 */

'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({
  Login: null,
  Register: null,
  GetAllUsers: null,

  SET_CURRENT_ROUTE: null,

  TASK_NEW: null,
  TASK_UPDATE: null
});
