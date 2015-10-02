/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('./layouts/Default'));
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
        <div className="panel-login col-sm-4 col-sm-offset-4">
          <div className="panel-heading">
            <div className="panel-title text-center">
              Register
            </div>
          </div>

          <div className="panel-body">
            <form className="form-horizontal" enctype="multipart/form-data" id="form" method="post" name="form">
              <div className="input-group">
                <span className="input-group-addon glyphicon glyphicon-knight"></span>
                <input className="form-control" id="fullname" name="fullname" placeholder="full name" type="text" />
              </div>

              <div className="input-group">
                <span className="input-group-addon glyphicon glyphicon-send"></span>
                <input className="form-control" id="email" name="email" placeholder="your email" type="text" />
              </div>

              <div className="input-group">
                <span className="input-group-addon glyphicon glyphicon-lock"></span>
                <input className="form-control" id="password" name="password" placeholder="password" type="password" />
              </div>

              <div className="form-group">
                <div className="col-sm-12 controls">
                  <button className="btn btn-default pull-right" type="submit"
                    onClick={this.login.bind(this)}>
                    Register
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
