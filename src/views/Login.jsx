/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('./layouts/Default'));
var CommonMixins = require('./mixins/CommonMixins.jsx');
var UserActions = require('../actions/UserActions');
var NotificationActions = require('../actions/NotificationActions');
var UserStore = require('../stores/UserStore');

var LoginPage = React.createClass({
  mixins: [CommonMixins],

  displayName: 'Login Page',
  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  getInitialState: function() {
    return {
      model: {}
    };
  },

  componentDidMount: function() {
    UserStore.addListenerOnLoginSuccess(this._onLoginSuccess, this);
    UserStore.addListenerOnLoginFail(this._onLoginFail, this);
  },
  componentWillUnmount: function() {
    UserStore.rmvListenerOnLoginSuccess(this._onLoginSuccess);
    UserStore.rmvListenerOnLoginFail(this._onLoginFail);
  },

  _onLoginSuccess: function(data) {
    console.log('_onLoginSuccess', data);
    window.location.hash = 'daily';
  },
  _onLoginFail: function(data) {
    console.log('_onLoginFail', data);
  },

  login: function(e) {
    e.preventDefault();
    var m = this.getModel();
    var model = {
      username: m.email,
      password: m.password
    };
    console.log('model', model);
    UserActions.login(model);
  },

  render: function() {
    return (
      <div>
        <div className="panel-login col-sm-4 col-sm-offset-4">
          <div className="panel-heading">
            <div className="panel-title text-center">
              Login
            </div>
          </div>

          <div className="panel-body">
            <form className="form-horizontal" enctype="multipart/form-data" id="form" method="post" name="form">
              <div className="input-group">
                <span className="input-group-addon glyphicon glyphicon-send"></span>
                <input className="form-control" id="email" name="email" placeholder="your email" type="text"
                  value={this.state.model.email} onChange={this.onChange} />
              </div>

              <div className="input-group">
                <span className="input-group-addon glyphicon glyphicon-lock"></span>
                <input className="form-control" id="password" name="password" placeholder="password" type="password"
                  value={this.state.model.password} onChange={this.onChange} />
              </div>

              <div className="form-group">
                <div className="col-sm-12 controls">
                  <button className="btn btn-default pull-right" type="submit"
                    onClick={this.login}>
                    Log in
                  </button>
                  <a href="#/register" className="btn btn-link pull-right">Register</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LoginPage;
