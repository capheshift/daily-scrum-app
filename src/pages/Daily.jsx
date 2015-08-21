/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react'),
  DefaultLayout = React.createFactory(require('../layouts/Default')),
  lodash = require('lodash'),
  moment = require('moment');

var DailyPage = React.createClass({
  displayName: 'Daily',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  getInitialState: function() {
    return {
      dateList: [{
        displayName: 'TODAY',
        value: '20150822',
        index: 1
      },{
        displayName: 'TOMORROW',
        value: '20150823',
        index: 2
      }],
      taskList: []
    }
  },

  newTaskOnClicked: function(dateItem) {
    console.log('newTaskOnClicked', dateItem);
    var newDateList, newTaskList;

    newTaskList = this.state.taskList.concat([{
      date: dateItem.value,
      isCompleted: false,
      value: ''
    }]);

    // only add the next day, when click on the last item
    newDateList = this.state.dateList;
    if (dateItem.index === newDateList.length) {
      newDateList.push({
        displayName: 'TOMORROW',
        value: '20150822',
        index: dateItem.index + 1
      });
    }

    this.setState({
      taskList: newTaskList,
      dateList: newDateList
    });
  },

  renderTaskList: function(dateItem) {
    if (!this.state.taskList) {
      return '';
    }

    var filterTask = lodash.filter(this.state.taskList, {date: dateItem.value});
    var renderList = filterTask.map(function(item, i) {
      return (
        <li className="daily-item">
          <div className="input-group">
            <span className="input-group-addon"> <input type="checkbox" /></span>
            <input className="form-control" id="prependedcheckbox"
              name="prependedcheckbox" placeholder="your task" type="text"
              value={item.task} />
          </div>
        </li>
      )
    })

    return (
      <ul className="daily-list">
        {renderList}
        <li className="daily-item">
          <button className="btn btn-sm btn-default"
            onClick={this.newTaskOnClicked.bind(null, dateItem)}>+ new task</button>
        </li>
      </ul>
    );
  },

  renderDateList: function() {
    if (!this.state.dateList.length) {
      return '';
    }

    return (
      <div>
        {this.state.dateList.map(function(item, i) {
          return (
            <div className="day-block">
              <p>{item.displayName}</p>
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
