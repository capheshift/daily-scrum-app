/**
 * @jsx React.DOM
 */
'use strict';

var moment = require('moment');
var lodash = require('lodash');
var React = require('react');
var DefaultLayout = React.createFactory(require('./layouts/Default'));
var Rating = React.createFactory(require('react-rating'));
var Select = React.createFactory(require('react-select'));

var ProjectActions = require('../actions/ProjectActions');
var ProjectStore = require('../stores/ProjectStore');
var TaskActions = require('../actions/TaskActions');
var TaskStore = require('../stores/TaskStore');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var ReportPage = React.createClass({
  displayName: 'Report',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  getInitialState: function() {
    return {
      projectList: [],
      taskList: [],
      userList: []
    };
  },

  getTotalTime: function(arr) {
    var total = 0;
    arr.forEach(function(item) {
      total += parseFloat(item.estimation) || 0;
    });
    return total;
  },

  componentDidMount: function() {
    ProjectStore.addListenerGetAllProjectSuccess(this._onGetAllProjectSuccess, this);
    ProjectStore.addListenerGetAllProjectFail(this._onGetAllProjectFail, this);

    TaskStore.addListenerOnFindTaskSuccess(this._onFindTaskSuccess, this);
    TaskStore.addListenerOnFindTaskFail(this._onFindTaskFail, this);

    UserStore.addListenerOnGetAllUsersSuccess(this._onGetAllUserSuccess, this);
    UserStore.addListenerOnGetAllUsersFail(this._onGetAllUserFail, this);

    TaskActions.find({
      q: { date: moment().format('YYYYMMDD') },
      l: {}
    });
    ProjectActions.all();
    UserActions.getAllUsers();
  },

  componentWillUnmount: function() {
    ProjectStore.rmvListenerGetAllProjectSuccess(this._onGetAllProjectSuccess);
    ProjectStore.rmvListenerGetAllProjectFail(this._onGetAllProjectFail);

    TaskStore.rmvListenerOnFindTaskSuccess(this._onFindTaskSuccess, this);
    TaskStore.rmvListenerOnFindTaskFail(this._onFindTaskFail, this);

    UserStore.rmvListenerOnGetAllUsersSuccess(this._onGetAllUserSuccess);
    UserStore.rmvListenerOnGetAllUsersFail(this._onGetAllUserFail);
  },

  _onGetAllUserSuccess: function(body) {
    console.log('_onGetAllUserSuccess', body);
    this.setState({
      userList: body.data
    });
  },

  _onGetAllUserFail: function(err) {
  },

  /**
   * function for handle data of task
   */
  _onFindTaskSuccess: function(data) {
    // map for usage data
    var data2 = data.map(function(item) {
      var newItem = lodash.clone(item);
      // parse data for view
      newItem.id = newItem._id;
      newItem._project = newItem._project && newItem._project._id;
      newItem.estimation = newItem.estimation && newItem.estimation.toString();
      // return the new one
      return newItem;
    });
    console.log('_onFindTaskSuccess', data2);
    this.setState({
      taskList: data2
    });
  },
  _onFindTaskFail: function(data) {
  },

  _onGetAllProjectSuccess: function(body) {
    var pList = body.data.map(function(item) {
      return {
        value: item._id,
        label: item.name
      };
    });
    this.setState({
      projectList: pList
    });
  },

  _onGetAllProjectFail: function() {
  },

  onSelectChanged: function() {
    console.log('onSelectChanged');
  },

  renderUserTask: function(arr, userId) {
    console.log('renderUserTask', arr, userId);
    var projectOptions = this.state.projectList;
    var timeRangeOptions = [
      { value: '0.5', label: '30 mins' },
      { value: '1', label: '1 hour' },
      { value: '1.5', label: '1 hours 30 mins' },
      { value: '2', label: '2 hours' },
      { value: '2.5', label: '2 hours 30 mins' },
      { value: '3', label: '3 hours' },
      { value: '3.5', label: '3 hours 30 mins' },
      { value: '4', label: '4 hours' },
      { value: '4.5', label: '4 hours 30 mins' },
      { value: '5', label: '5 hours' },
      { value: '5.5', label: '5 hours 30 mins' },
      { value: '6', label: '6 hours' },
      { value: '6.5', label: '6 hours 30 mins' },
      { value: '7', label: '7 hours' },
      { value: '7.5', label: '7 hours 30 mins' },
      { value: '8', label: '8 hours' },
    ];
    var filterUserList = lodash.filter(arr, function(item) {
      return (item._user._id === userId);
    });
    var item = {};
    var renderList = (
      <li className="daily-item row" key={item.id}>
        <div className="col-sm-6">
          <div className="input-group">
            <span className="input-group-addon">
              <input type="checkbox" checked={item.isCompleted} />
            </span>
            <input className="form-control" id="prependedcheckbox"
              placeholder="your task" type="text"
              ref="content" name="content"
              value={item.content} />
          </div>
        </div>
        <div className="col-sm-2">
          <Select name="_project" clearable={false} value={item._project}
            options={projectOptions} />
        </div>
        <div className="col-sm-2">
          <Select name="estimation" clearable={false}
            value={item.estimation} options={timeRangeOptions} />
        </div>
      </li>
    );

    if (filterUserList.length > 0) {
      renderList = filterUserList.map(function(item, i) {
        return (
          <li className="daily-item row" key={item.id}>
            <div className="col-sm-6">
              <div className="input-group">
                <span className="input-group-addon">
                  <input type="checkbox" checked={item.isCompleted} />
                </span>
                <input className="form-control" id="prependedcheckbox"
                  placeholder="your task" type="text"
                  ref="content" name="content"
                  value={item.content} />
              </div>
            </div>
            <div className="col-sm-2">
              <Select name="_project" clearable={false} value={item._project}
                options={projectOptions} />
            </div>
            <div className="col-sm-2">
              <Select name="estimation" clearable={false}
                value={item.estimation} options={timeRangeOptions} />
            </div>
          </li>
        )
      }.bind(this));
    }

    return renderList;
  },

  render: function() {
    var userListRender = (
      <div className="col-sm-12 day-block"></div>
    );

    if (this.state.userList.length) {
      userListRender = this.state.userList.map(function(item) {
        var taskByUser = this.state.taskList.filter(function(task) {
          return (task._user._id === item._id);
        });
        var totalTime = this.getTotalTime(taskByUser);

        return (
          <div className="col-sm-12 day-block">
            <p className="username-title">{item.fullName}</p>
            <ul className="daily-list">
              {this.renderUserTask(this.state.taskList, item._id)}
              <li className="row daily-item">
                <div className="col-sm-6">
                  {/*<div className="pull-right">
                    <Rating />
                  </div>*/}
                </div>
                <div className="col-sm-4">
                  <span className="pull-right">
                    Total: { totalTime || 0 } hours
                  </span>
                </div>
              </li>
            </ul>
          </div>
        );
      }.bind(this));
    }

    return (
      <div className="row">
        {/*<div className="row">
          <div className="col-sm-5">
            <h4>CHOOSE PROJECT</h4>
            <Select name="form-field-name" value="nafoods" clearable={false}
              options={projectOptions} onChange={this.onSelectChanged} />
          </div>
        </div>*/}
        <div className="col-sm-12">
          <h4>REPORT/TODAY</h4>
        </div>
        {userListRender}
      </div>
    );
  }
});

module.exports = ReportPage;
