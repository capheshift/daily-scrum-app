/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));

var LoginPage = React.createClass({
  displayName: 'Login Page',
  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },
  render: function() {
    return (
      <div>
        <p>Index</p>
      </div>
    );
  }
});

module.exports = LoginPage;
