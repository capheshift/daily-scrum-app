/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Navbar = React.createFactory(require('../components/Navbar'));
var NotificationStore = require('../../stores/NotificationStore');

var DefaultLayout = React.createClass({
  displayName: 'Default.jsx',

  getDefaultProps: function() {
    return {};
  },

  componentDidMount: function() {
    NotificationStore.addListenerOnNotification(this._onNotification, this);
  },

  componentWillUnmount: function() {
    NotificationStore.rmvListenerOnNotification(this._onNotification, this);
  },

  _onNotification: function(data) {
    console.log('_onNotification', data);
  },

  render: function() {
    return (
      <div>
        {Navbar({uri: this.props.uri})}

        <div className="container" style={{marginTop:'20px', marginBottom:'50px'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = DefaultLayout;
