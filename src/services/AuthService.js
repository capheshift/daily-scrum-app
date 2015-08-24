
var LoginAction = require('../actions/LoginAction');

var AppServices = {
  login: function(userName, password) {
    LoginAction.login(userName, password);
  },

  logout: function() {
    LoginAction.logout();
  },

  register: function(userName, password, extra) {

  }
}
