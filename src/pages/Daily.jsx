/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));

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
        value: '20150822'
      }],
      taskList: [{
        date: '2015022',
        task: 'Nếu biết tình như thế, chẳng lớn lên làm gì',
        isCompleted: false
      },
      {
        date: '2015022',
        task: 'Thà như ngày thơ ấu, hai đứa cầm tay đi',
        isCompleted: false
      }]
    }
  },

  newTaskOnClicked: function(dateItem) {
    console.log('newTaskOnClicked', dateItem);
    var newTaskList = this.state.taskList.concat([{
      date: dateItem.value,
      isCompleted: false,
      value: ''
    }]);

    this.setState({
      taskList: newTaskList
    });
  },

  renderTaskList: function(dateItem) {
    if (!this.state.taskList.length) {
      return '';
    }

    return (
      <ul className="daily-list">
        {this.state.taskList.map(function(item, i) {
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
        })}
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
