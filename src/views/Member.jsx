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
  },

  componentDidMount: function() {
    UserStore.addListenerOnGetAllUsersSuccess(this.onGetAllUsersSuccess, this);
    UserStore.addListenerOnGetAllUsersFail(this.onGetAllUsersFail, this);

    UserActions.getAllUsers();
  },

  componentWillUnmount: function() {
    UserStore.rmvListenerOnGetAllUsersSuccess(this.onGetAllUsersSuccess);
    UserStore.rmvListenerOnGetAllUsersFail(this.onGetAllUsersFail);
  },

  onGetAllUsersSuccess: function(response) {
    this.setState({members: response.data});
  },

  onGetAllUsersFail: function(data) {
    console.log('data fail', data);
  },

  render: function() {
    var members = [];

    if (this.state.members.length) {
      members = this.state.members.map(function(member, index) {
        return (
          <div className="col-sm-4 member-list">
            <div className="media">
              <div className="media-left">
                <a href="#">
                  <img className="media-object" src={"http://avatars.io/email/" + member.email} />
                </a>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{member.fullName}</h4>
                <h5>Javascript Developer</h5>
              </div>
            </div>
          </div>
        );
      });
    }


    return (
      <div className="row">
        <div className="col-sm-12">
          <h3 className="title-label">MEMBER</h3>
        </div>
        {members}
      </div>
    );
  }
});

module.exports = MemberPage;
