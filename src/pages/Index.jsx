/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));

var HomePage = React.createClass({
  displayName: 'Index.jsx',
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

module.exports = HomePage;
