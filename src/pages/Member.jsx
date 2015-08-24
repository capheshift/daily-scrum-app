/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));

var MemberPage = React.createClass({
  displayName: 'Member',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  render: function() {
    return (
      <div>
        <h4>MEMBER</h4>
      </div>
    );
  }
});

module.exports = MemberPage;
