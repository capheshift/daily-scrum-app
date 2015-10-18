/**
 * Action Type
 */

'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({
  LoginSuccesss: null,
  LoginFail: null,

  RegisterSuccess: null,
  RegisterFail: null,

  GetAllSuccess: null,
  GetAllFail: null
});
