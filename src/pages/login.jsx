/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));
// var Auth = require('');

var LoginPage = React.createClass({
  displayName: 'Login Page',
  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  login: function(e) {
    e.preventDefault();
  },

  render: function() {
    return (
      <div>
        <div className="panel panel-login col-sm-4 col-sm-offset-4">
          <div className="panel-heading">
            <div className="panel-title text-center">
              Login
            </div>
          </div>

          <div className="panel-body">
            <form className="form-horizontal" enctype="multipart/form-data" id="form" method="post" name="form">
              <div className="input-group">
                <span className="input-group-addon glyphicon glyphicon-user"></span>
                <input className="form-control" id="user" name="user" placeholder="User" type="text" />
              </div>

              <div className="input-group">
                <span className="input-group-addon glyphicon glyphicon-lock"></span>
                <input className="form-control" id="password" name="password" placeholder="Password" type="password" />
              </div>

              <div className="form-group">
                <div className="col-sm-12 controls">
                  <button className="btn btn-default pull-right" type="submit"
                    onClick={this.login.bind(this)}>
                    <i className="glyphicon glyphicon-log-in"></i> Log in
                  </button>
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
