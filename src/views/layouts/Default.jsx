/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Navbar = React.createFactory(require('../components/Navbar'));
var NotificationStore = require('../../stores/NotificationStore');
var Loader = React.createFactory(require('halogen/BounceLoader'));

var DefaultLayout = React.createClass({
  displayName: 'Default.jsx',
  amountOfRequests: 0,

  getDefaultProps: function() {
    return {
    };
  },

  getInitialState: function() {
    return {
      isLoading: false
    };
  },

  componentDidMount: function() {
    NotificationStore.addListenerOnNotification(this._onNotification, this);
    NotificationStore.addListenerOnStartRequest(this._onStartRequest, this);
    NotificationStore.addListenerOnEndRequest(this._onEndRequest, this);
  },

  componentWillUnmount: function() {
    NotificationStore.rmvListenerOnNotification(this._onNotification, this);
    NotificationStore.rmvListenerOnStartRequest(this._onStartRequest, this);
    NotificationStore.rmvListenerOnEndRequest(this._onEndRequest, this);
  },

  _onNotification: function(data) {
    console.log('_onNotification', data);
  },

  _onStartRequest: function(data) {
    var amount = this.amountOfRequests;
    amount++;
    if (amount === 1) {
      this.setState({
        isLoading: true
      });
    }
    this.amountOfRequests = amount;
  },

  _onEndRequest: function(data) {
    var amount = this.amountOfRequests;
    amount--;
    this.amountOfRequests = amount;
    if (amount === 1) {
      this.setState({
        isLoading: false
      });
    }
  },

  render: function() {
    return (
      <div>
        <div className={"loader-wrapper " + (this.state.isLoading?'':'__hidden')}>
          <Loader color="#b92b27" size="30px" margin="4px" />
        </div>
        {Navbar({uri: this.props.uri})}
        <div className="container" style={{marginTop:'20px', marginBottom:'50px'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = DefaultLayout;
