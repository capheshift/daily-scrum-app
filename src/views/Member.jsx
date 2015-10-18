/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('./layouts/Default'));
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var MemberPage = React.createClass({
  displayName: 'Member',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  getInitialState: function() {
    return {
      members: {}
    };
  },

  componentWillMount: function() {
    UserActions.getAll();
  },

  componentDidMount: function() {
    UserStore.addListenerOnGetAllSuccess(this.onGetAllSuccess, this);
    UserStore.addListenerOnGetAllFail(this.onGetAllFail, this);
  },

  componentWillUnmount: function() {
    UserStore.rmvListenerOnGetAllSuccess(this.onGetAllSuccess);
    UserStore.rmvListenerOnGetAllFail(this.onGetAllFail);
  },

  onGetAllSuccess: function(response) {
    this.setState({members: response.data});
  },

  onGetAllFail: function(data) {
    console.log('data fail', data);
  },

  render: function() {
    var members = [];

    if (this.state.members.length) {
      members = this.state.members.map(function(member, index) {
        return (
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="./img/avt.png" />
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{member.fullName}</h4>
              <h5>Javascript Developer</h5>
            </div>
          </div>
        );
      });
    }


    return (
      <div className="row">
        <div className="col-sm-12">
          <h4>MEMBER</h4>
        </div>
        <div className="col-sm-6 member-list">
          {members}
        </div>
      </div>
    );
  }
});

module.exports = MemberPage;
