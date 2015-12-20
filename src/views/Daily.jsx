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
// var DayPicker = React.createFactory(require('react-day-picker'));

var DailyPage = React.createClass({
  displayName: 'Daily',
  currentUser: '',

  getNewDate: function(moment) {
    return {
      displayName: moment.format('MMM DD ddd'),
      value: moment.format('YYYYMMDD'),
      index: 1
    };
  },

  getNewTask: function(moment) {
    return {
      _user: this.currentUser,
      id: Guid.raw(),
      date: moment.format('YYYYMMDD'),
      isCompleted: false,
      content: ''
    };
  },

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  getInitialState: function() {
    var dateList = [], taskList = [];
    var currentDate = moment();
    this.currentUser = window.localStorage.getItem('_id');

    // create default data
    dateList.push(this.getNewDate(currentDate));
    // add task list for today day
    taskList.push(this.getNewTask(currentDate));

    return {
      dateList: dateList,
      taskList: taskList,
      projectList: [],
      currentDate: currentDate,
      currentDateStr: currentDate.format('DD/MM/YYYY')
    };
  },

  componentDidMount: function() {
    ProjectStore.addListenerGetAllProjectSuccess(this._onGetAllProjectSuccess, this);
    ProjectStore.addListenerGetAllProjectFail(this._onGetAllProjectFail, this);

    TaskStore.addListenerOnNewTaskSuccess(this._onNewTaskSuccess, this);
    TaskStore.addListenerOnNewTaskFail(this._onNewTaskFail, this);

    TaskStore.addListenerOnFindTaskSuccess(this._onFindTaskSuccess, this);
    TaskStore.addListenerOnFindTaskFail(this._onFindTaskFail, this);

    TaskActions.find({
      q: {
        _user: this.currentUser,
        date: this.state.currentDate.format('YYYYMMDD')
      },
      l: {}
    });
    ProjectActions.all();
  },

  componentWillUnmount: function() {
    ProjectStore.rmvListenerGetAllProjectSuccess(this._onGetAllProjectSuccess);
    ProjectStore.rmvListenerGetAllProjectFail(this._onGetAllProjectFail);

    TaskStore.rmvListenerOnNewTaskSuccess(this._onNewTaskSuccess, this);
    TaskStore.rmvListenerOnNewTaskFail(this._onNewTaskFail, this);

    TaskStore.rmvListenerOnFindTaskSuccess(this._onFindTaskSuccess, this);
    TaskStore.rmvListenerOnFindTaskFail(this._onFindTaskFail, this);
  },

  _onFindTaskSuccess: function(data) {
    console.log('_onFindTaskSuccess', data);

    var dateList = this.state.dateList;
    var taskList = data.map(function(item) {
      var newItem = lodash.clone(item);
      // parse data for view
      newItem.id = newItem._id;
      newItem._project = newItem._project && newItem._project._id;
      newItem.estimation = newItem.estimation && newItem.estimation.toString();
      // return the new one
      return newItem;
    });

    taskList.push(this.getNewTask(this.state.currentDate));
    console.log('_onFindTaskSuccess taskList', taskList);
    dateList[0].totalTime = this.getTotalTime(taskList, this.state.currentDate.format('YYYYMMDD'));
    console.log('_onFindTaskSuccess', dateList);

    this.setState({
      taskList: taskList,
      dateList: dateList
    });
  },

  _onSelectedDateChanged: function(taskList, dateList) {
    taskList = this.addEmptyTask(taskList, dateList);
    this.setState({
      taskList: taskList
    });
  },

  _onFindTaskFail: function(err) {
    console.log('_onFindTaskFail', err);
  },

  _onNewTaskSuccess: function(data) {
    console.log('_onNewTaskSuccess', data);
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
    alert('Server gets error, please try again later!');
  },

  newTaskOnClicked: function(dateItem) {
    // save the last task
    var filterTaskByDate = lodash.filter(this.state.taskList, {date: dateItem.value});
    var taskItem = filterTaskByDate[filterTaskByDate.length - 1];

    console.log('newTaskOnClicked', taskItem);
    if (taskItem.content) {
      TaskActions.newTask(taskItem);
    } else {
      alert('Task content is required!');
      return;
    }

    // add empty task at the end
    var newTaskList;
    newTaskList = this.state.taskList.concat([this.getNewTask(this.state.currentDate)]);

    this.setState({
      taskList: newTaskList
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
  getTotalTime: function(arr, dateStr) {
    if (!arr) {
      arr = this.state.taskList;
    }
    var total = 0;
    var filterTask = lodash.filter(arr, {date: dateStr});
    console.log('filterTask', filterTask);
    console.log('filterTask', arr, dateStr);

    for (var i = 0; i < filterTask.length; i++) {
      total += parseFloat(filterTask[i].estimation) || 0;
    }

    return total;
  },

  onCheckChanged: function(id, e) {
    console.log('onCheckChanged', id, e);
    var nList = this.state.taskList;
    var currItem = this.findItem(nList, id);
    // below is a trick, it should be get data from e.target.checked
    currItem.isCompleted = !currItem.isCompleted;
    if (currItem._id) {
      currItem.isEdited = true;
    }

    this.setState({
      taskList: nList
    });
  },

  onTaskChanged: function(id, e) {
    var nList = this.state.taskList;
    var currItem = this.findItem(nList, id);
    currItem[e.target.name] = e.target.value;
    if (currItem._id) {
      currItem.isEdited = true;
    }

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
    currDate.totalTime = this.getTotalTime(nList, currItem.date);
    if (currItem._id) {
      currItem.isEdited = true;
    }

    this.setState({
      taskList: nList,
      dateList: nDateList
    });
  },

  onProjectChanged: function(id, newValue) {
    console.log('onProjectChanged', id, newValue);
    var nList = this.state.taskList;
    var currItem = this.findItem(nList, id);
    currItem._project = newValue;
    if (currItem._id) {
      currItem.isEdited = true;
    }

    this.setState({
      taskList: nList
    });
  },

  onUpdateTaskClicked: function(id, e) {
    var nList = this.state.taskList;
    var currItem = this.findItem(nList, id);
    var model = lodash.clone(currItem);
    currItem.isEdited = false;

    model._user = model._user && model._user._id;
    // send action to update modal
    TaskActions.updateTask(model);

    this.setState({
      taskList: nList
    });
  },

  renderTaskList: function(dateItem) {
    if (!this.state.taskList) {
      return '';
    }

    var projectOptions = this.state.projectList;
    var taskList = this.state.taskList;
    var renderList = [];
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

    renderList = taskList.map(function(item, i) {
      return (
        <li className="daily-item row" key={item.id}>
          <div className="col-sm-6">
            <div className="input-group">
              <span className="input-group-addon">
                <input type="checkbox" checked={item.isCompleted}
                  onChange={this.onCheckChanged.bind(null, item.id)} />
              </span>
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
          <div className="col-sm-2">
            <a href="javascript:;" className={"btn btn-link " + (item.isEdited?'':'hidden')}
              onClick={this.onUpdateTaskClicked.bind(null, item.id)}>Update</a>
          </div>
        </li>
      )
    }.bind(this));

    return (
      <ul className="daily-list">
        {renderList}
        <li className="daily-item row">
          <div className="col-sm-10">
            <button className="btn btn-sm btn-default"
              onClick={this.newTaskOnClicked.bind(null, dateItem)}>Save task</button>

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

  setNewDate: function(moment) {
    TaskActions.find({
      q: {
        _user: this.currentUser,
        date: moment.format('YYYYMMDD')
      },
      l: {}
    });

    this.setState({
      currentDate: moment,
      currentDateStr: moment.format('DD/MM/YYYY'),
      dateList: [this.getNewDate(moment)]
    });
  },

  onPrevClicked: function(e) {
    var currentDate = this.state.currentDate;
    var prevDate = currentDate.add(-1, 'days');
    this.setNewDate(prevDate);
  },

  onNextClicked: function(e) {
    var currentDate = this.state.currentDate;
    var nextDate = currentDate.add(1, 'days');
    this.setNewDate(nextDate);
  },

  inputDateOnKeyDown: function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();

      var dateStr = this.state.currentDateStr;
      var m = moment(dateStr, 'DD/MM/YYYY');

      if (m == null || !m.isValid()) {
        alert('Input date is not valid!');
      } else {
        this.setNewDate(m);
      }
    }
  },

  onDateChanged: function(e) {
    console.log('onDateChanged', e.target.value);
    this.setState({
      currentDateStr: e.target.value
    });
  },

  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <h3 className="title-label">DAILY <small className={this.state.isCurrent?"":"__hidden"}>/ TODAY</small>
            </h3>
          </div>
          <div className="col-sm-2">
            <div className="input-group">
              <span className="input-group-addon" id=""><i className="glyphicon glyphicon-calendar"></i></span>
              <input className="form-control" placeholder="dd/mm/yyyy"
                type="text" name="inputCurrentDate"
                value={this.state.currentDateStr}
                onKeyDown={this.inputDateOnKeyDown}
                onChange={this.onDateChanged} />
            </div>
          </div>
          <div className="col-sm-2">
            <div className="btn-group btn-group-justified" role="group" aria-label="...">
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-success" onClick={this.onPrevClicked}>
                  <i className="glyphicon _default glyphicon-menu-left"></i> Prev</button>
              </div>
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-success" onClick={this.onNextClicked}>
                  Next <i className="glyphicon _default glyphicon-menu-right"></i></button>
              </div>
            </div>
          </div>
        </div>
        {this.renderDateList()}
      </div>
    );
  }
});

module.exports = DailyPage;
