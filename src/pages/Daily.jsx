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
    var m = moment(), dateList = [];

    // create default data
    dateList.push({
      displayName: 'TODAY - ' + m.format('MMM DD'),
      value: m.format('YYYYMMDD'),
      index: 1
    });

    m.add(1, 'days');
    dateList.push({
      displayName: 'TOMORROW - ' + m.format('MMM DD'),
      value: m.format('YYYYMMDD'),
      index: 2
    });

    return {
      dateList: dateList,
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
      var m = moment(dateItem.value, 'YYYYMMDD').add(1, 'days');
      newDateList.push({
        displayName: m.format('MMM DD ddd'),
        value: m.format('YYYYMMDD'),
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
