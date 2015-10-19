/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('./layouts/Default'));
var Select = React.createFactory(require('react-select'));
var Guid = require('guid');
var lodash = require('lodash');
var moment = require('moment');

var ProjectActions = require('../actions/ProjectActions');
var ProjectStore = require('../stores/ProjectStore');

var TaskActions = require('../actions/TaskActions');
var TaskStore = require('../stores/TaskStore');

var DailyPage = React.createClass({
  displayName: 'Daily',
  currentUser: '',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  getInitialState: function() {
    var m = moment(), dateList = [], taskList = [];
    this.currentUser = window.localStorage.getItem('_id');

    // create default data
    dateList.push({
      displayName: m.format('MMM DD ddd') + ' - TODAY',
      value: m.format('YYYYMMDD'),
      index: 1
    });
    // add task list for today day
    taskList.push({
      _user: this.currentUser,
      id: Guid.raw(),
      date: m.format('YYYYMMDD'),
      isCompleted: false,
      content: ''
    });

    // add
    m.add(1, 'days');
    dateList.push({
      displayName: m.format('MMM DD ddd') + ' - TOMORROW',
      value: m.format('YYYYMMDD'),
      index: 2
    });
    taskList.push({
      _user: this.currentUser,
      id: Guid.raw(),
      date: m.format('YYYYMMDD'),
      isCompleted: false,
      content: ''
    });

    return {
      dateList: dateList,
      taskList: taskList,
      projectList: []
    };
  },

  componentDidMount: function() {
    ProjectStore.addListenerGetAllProjectSuccess(this._onGetAllProjectSuccess, this);
    ProjectStore.addListenerGetAllProjectFail(this._onGetAllProjectFail, this);

    TaskStore.addListenerOnNewTaskSuccess(this._onNewTaskSuccess, this);
    TaskStore.addListenerOnNewTaskFail(this._onNewTaskFail, this);

    ProjectActions.all();
  },

  componentWillUnmount: function() {
    ProjectStore.rmvListenerGetAllProjectSuccess(this._onGetAllProjectSuccess);
    ProjectStore.rmvListenerGetAllProjectFail(this._onGetAllProjectFail);

    TaskStore.rmvListenerOnNewTaskSuccess(this._onNewTaskSuccess, this);
    TaskStore.rmvListenerOnNewTaskFail(this._onNewTaskFail, this);
  },

  _onNewTaskSuccess: function(data) {
  },

  _onNewTaskFail: function(err) {
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

  newTaskOnClicked: function(dateItem) {
    // save the last task
    var filterTaskByDate = lodash.filter(this.state.taskList, {date: dateItem.value});
    var taskItem = filterTaskByDate[filterTaskByDate.length - 1];
    console.log('newTaskOnClicked', taskItem);
    TaskActions.newTask(taskItem);

    console.log('newTaskOnClicked', dateItem, this.state.taskList);
    var newDateList, newTaskList;

    newTaskList = this.state.taskList.concat([{
      _user: this.currentUser,
      id: Guid.raw(),
      date: dateItem.value,
      isCompleted: false,
      content: ''
    }]);

    // only add the next day, when click on the last item
    newDateList = this.state.dateList;
    if (dateItem.index === newDateList.length) {
      var m = moment(dateItem.value, 'YYYYMMDD').add(1, 'days');
      newDateList.push({
        displayName: m.format('MMM DD ddd'),
        value: m.format('YYYYMMDD'),
        index: dateItem.index + 1,
        totalTime: 0
      });
    }

    this.setState({
      taskList: newTaskList,
      dateList: newDateList
    });
  },

  findItem: function(arr, id) {
    for (var i=0; i<arr.length; i++) {
      if (arr[i].id === id) {
        return arr[i];
      }
    }

    return null;
  },

  findDateItem: function(arr, dateStr) {
    for (var i=0; i<arr.length; i++) {
      if (arr[i].value === dateStr) {
        return arr[i];
      }
    }
    return null;
  },

  /**
   * [getTotalTime description]
   * @param  {[type]} item [a task item]
   * @return {[type]}      [description]
   */
  getTotalTime: function(arr, item) {
    var filterTask = lodash.filter(arr, {date: item.date});
    var total = 0;

    for (var i = 0; i < filterTask.length; i++) {
      total += parseFloat(filterTask[i].estimation) || 0;
    }

    return total;
  },

  onTaskChanged: function(id, e) {
    var nList = this.state.taskList;
    var currItem = this.findItem(nList, id);
    currItem[e.target.name] = e.target.value;
    console.log('onTaskChanged', nList);

    this.setState({
      taskList: nList
    });
  },

  onEstimateChanged: function(id, newValue) {
    var nList = this.state.taskList;
    var nDateList = this.state.dateList;
    var currItem = this.findItem(nList, id);
    var currDate = this.findDateItem(this.state.dateList, currItem.date);

    currItem.estimation = newValue;
    // update total time
    currDate.totalTime = this.getTotalTime(nList, currItem);

    this.setState({
      taskList: nList,
      dateList: nDateList
    });
  },

  onProjectChanged: function(id, newValue) {
    var nList = this.state.taskList;
    var currItem = this.findItem(nList, id);
    currItem._project = newValue;

    this.setState({
      taskList: nList
    });
  },

  renderTaskList: function(dateItem) {
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

    if (!this.state.taskList) {
      return '';
    }

    var filterTask = lodash.filter(this.state.taskList, {date: dateItem.value});
    var renderList = filterTask.map(function(item, i) {
      return (
        <li className="daily-item row">
          <div className="col-sm-5">
            <div className="input-group">
              <span className="input-group-addon"> <input type="checkbox" /></span>
              <input className="form-control" id="prependedcheckbox"
                placeholder="your task" type="text"
                ref="content" name="content"
                value={item.content}
                onChange={this.onTaskChanged.bind(null, item.id)} />
            </div>
          </div>
          <div className="col-sm-2">
            <Select name="_project" clearable={false} value={item._project}
              options={projectOptions} onChange={this.onProjectChanged.bind(null, item.id)} />
          </div>
          <div className="col-sm-2">
            <Select name="estimation" clearable={false}
              value={item.estimation} options={timeRangeOptions}
              onChange={this.onEstimateChanged.bind(null, item.id)} />
          </div>
        </li>
      )
    }.bind(this));

    return (
      <ul className="daily-list">
        {renderList}
        <li className="daily-item row">
          <div className="col-sm-9">
            <button className="btn btn-sm btn-default"
              onClick={this.newTaskOnClicked.bind(null, dateItem)}>+ new task</button>

            <span className="pull-right">
              Total: { dateItem.totalTime || 0 } hours
            </span>
          </div>
        </li>
      </ul>
    );
  },

  renderDateList: function() {
    if (!this.state.dateList) {
      return '';
    }

    return (
      <div>
        {this.state.dateList.map(function(item, i) {
          return (
            <div className="day-block">
              <p className="day-title">{item.displayName}</p>
              {this.renderTaskList(item)}
            </div>
          )
        }.bind(this))}
      </div>
    );
  },

  render: function() {
    return (
      <div className="">
        <h4>DAILY <small>The more you plan, the better you success !</small></h4>

        {this.renderDateList()}
      </div>
    );
  }
});

module.exports = DailyPage;
