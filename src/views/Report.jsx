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
      taskList: []
    };
  },

  componentDidMount: function() {
    ProjectStore.addListenerGetAllProjectSuccess(this._onGetAllProjectSuccess, this);
    ProjectStore.addListenerGetAllProjectFail(this._onGetAllProjectFail, this);

    TaskStore.addListenerOnFindTaskSuccess(this._onFindTaskSuccess, this);
    TaskStore.addListenerOnFindTaskFail(this._onFindTaskFail, this);

    TaskActions.find({
      q: { date: moment().format('YYYYMMDD') },
      // q: {},
      l: {}
    });
    ProjectActions.all();
  },

  componentWillUnmount: function() {
    ProjectStore.rmvListenerGetAllProjectSuccess(this._onGetAllProjectSuccess);
    ProjectStore.rmvListenerGetAllProjectFail(this._onGetAllProjectFail);

    TaskStore.rmvListenerOnFindTaskSuccess(this._onFindTaskSuccess, this);
    TaskStore.rmvListenerOnFindTaskFail(this._onFindTaskFail, this);
  },

  /**
   * function for handle data of task
   */
  _onFindTaskSuccess: function(data) {
    // map for usage data
    var data2 = data.map(function(item) {
      var newItem = lodash.clone(item);
      if (newItem._project) {
        newItem._project = newItem._project._id;
        newItem.id = newItem._id;
        newItem.estimation = newItem.estimation.toString();
      }
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

  render: function() {
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

    var renderList = this.state.taskList.map(function(item, i) {
      return (
        <li className="daily-item row" key={item.id}>
          <div className="col-sm-5">
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

    return (
      <div>
        {/*<div className="row">
          <div className="col-sm-5">
            <h4>CHOOSE PROJECT</h4>
            <Select name="form-field-name" value="nafoods" clearable={false}
              options={projectOptions} onChange={this.onSelectChanged} />
          </div>
        </div>*/}

        <h4 className="header-title">REPORT/TODAY</h4>
        <div className="day-block">
          <p>PHẠM MINH TÂM</p>
          <ul className="daily-list">
            {renderList}
            <li className="row daily-item">
              <div className="col-sm-5">
                <div className="pull-right">
                  <Rating />
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="day-block">
          <p>NGUYỄN DUY TÂN</p>
          <ul className="daily-list">
            {renderList}
            <li className="row daily-item">
              <div className="col-sm-5">
                <div className="pull-right">
                  <Rating />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = ReportPage;
