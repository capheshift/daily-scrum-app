/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));

var ProjectPage = React.createClass({
  displayName: 'Project',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  render: function() {
    return (
      <div>
        <h4>PROJECT</h4>
      </div>
    );
  }
});

module.exports = ProjectPage;
