/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));

var DailyPage = React.createClass({
  displayName: 'Daily',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  render: function() {
    return (
      <div className="container">
        <h4>DAILY <small>The more you plan, the better you success !</small></h4>
        <p>TODAY</p>

      </div>
    );
  }
});

module.exports = DailyPage;
