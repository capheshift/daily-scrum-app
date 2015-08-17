/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));

var Libraries = React.createClass({
  displayName: 'Libraries.jsx',
  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },
  render: function() {
    return (
      <div>
        <p>Libraries</p>
      </div>
    );
  }
});

module.exports = Libraries;
