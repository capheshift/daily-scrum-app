/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('./layouts/Default'));
var UserApis = require('../commons/service-api').UserApis;

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
    UserApis.all().then(function(data) {
      this.setState({members: data});
    }.bind(this));
  },

  render: function() {
    var members = {};

    if (this.state.members.success) {
      members = this.state.members.data.map(function(data, index) {
        return (
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="./img/avt.png" />
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{data.email}</h4>
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
