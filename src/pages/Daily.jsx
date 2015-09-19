/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react'),
  DefaultLayout = React.createFactory(require('../layouts/Default')),
  Select = React.createFactory(require('react-select')),
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
    var m = moment(), dateList = [], taskList = [];

    // create default data
    dateList.push({
      displayName: 'TODAY - ' + m.format('MMM DD'),
      value: m.format('YYYYMMDD'),
      index: 1
    });

    taskList.push({
      date: m.format('YYYYMMDD')
    });

    m.add(1, 'days');
    dateList.push({
      displayName: 'TOMORROW - ' + m.format('MMM DD'),
      value: m.format('YYYYMMDD'),
      index: 2
    });

    return {
      dateList: dateList,
      taskList: taskList
    };
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
    var projectOptions = [
      { value: 'vib', label: 'VIB' },
      { value: 'nafoods', label: 'Nafoods' },
      { value: 'daily-scrum', label: 'Daily Scrum' }
    ];
    var timeRangeOptions = [
      { value: '0.5hours', label: '30 phút' },
      { value: '1hours', label: '1 giờ' },
      { value: '1.5hours', label: '1 giờ 30 phút' },
      { value: '2hours', label: '2 giờ' },
      { value: '2.5hours', label: '2 giờ 30 phút' },
      { value: '3hours', label: '3 giờ' },
      { value: '3.5hours', label: '3 giờ 30 phút' },
      { value: '4hours', label: '4 giờ' },
      { value: '4.5hours', label: '4 giờ 30 phút' },
      { value: '5hours', label: '5 giờ' },
      { value: '5.5hours', label: '5 giờ 30 phút' },
      { value: '6hours', label: '6 giờ' },
      { value: '6.5hours', label: '6 giờ 30 phút' },
      { value: '7hours', label: '7 giờ' },
      { value: '7.5hours', label: '7 giờ 30 phút' },
      { value: '8hours', label: '8 giờ' },
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
                name="prependedcheckbox" placeholder="your task" type="text"
                value={item.task} />
            </div>
          </div>
          <div className="col-sm-2">
            <Select name="estimation" value="0.5hours" clearable={false}
              options={timeRangeOptions} />
          </div>
          <div className="col-sm-2">
            <Select name="project" value="vib" clearable={false}
              options={projectOptions} />
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
