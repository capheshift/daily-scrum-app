/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('./layouts/Default'));
var Rating = React.createFactory(require('react-rating'));
var Select = React.createFactory(require('react-select'));

var ProjectActions = require('../actions/ProjectActions');
var ProjectStore = require('../stores/ProjectStore');

var ReportPage = React.createClass({
  displayName: 'Report',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  getInitialState: function() {
    return {
      projectList: []
    };
  },

  componentDidMount: function() {
    ProjectStore.addListenerGetAllProjectSuccess(this._onGetAllProjectSuccess, this);
    ProjectStore.addListenerGetAllProjectFail(this._onGetAllProjectFail, this);

    ProjectActions.all();
  },

  componentWillUnmount: function() {
    ProjectStore.rmvListenerGetAllProjectSuccess(this._onGetAllProjectSuccess);
    ProjectStore.rmvListenerGetAllProjectFail(this._onGetAllProjectFail);
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

    return (
      <div>
        <div className="row">
          <div className="col-sm-5">
            <h4>CHOOSE PROJECT</h4>
            <Select name="form-field-name" value="nafoods" clearable={false}
              options={projectOptions} onChange={this.onSelectChanged} />
          </div>
        </div>

        <h4 className="header-title">REPORT/TODAY</h4>
        <div className="day-block">
          <p>PHẠM MINH TÂM</p>
          <ul className="daily-list">
            <li className="row daily-item">
              <div className="col-sm-5">
                <div className="input-group">
                  <span className="input-group-addon"> <input type="checkbox" /></span>
                  <input className="form-control" id="prependedcheckbox"
                    name="prependedcheckbox" placeholder="your task" type="text"
                    value="Nếu biết tình như thế, chẳng lớn lên làm gì" />
                </div>
              </div>
              <div className="col-sm-2">
                <Select name="project" clearable={false} value='vib' options={projectOptions} />
              </div>
              <div className="col-sm-2">
                <Select name="estimation" clearable={false} value='4' options={timeRangeOptions} />
              </div>
            </li>
            <li className="row daily-item">
              <div className="col-sm-5">
                <div className="input-group">
                  <span className="input-group-addon"> <input type="checkbox" /></span>
                  <input className="form-control" id="prependedcheckbox"
                    name="prependedcheckbox" placeholder="your task" type="text"
                    value="Thuở còn thơ ngày 3 cữ là thường, tôi lai rai qua từng chai lớn nhỏ" />
                </div>
              </div>
              <div className="col-sm-2">
                <Select name="project" clearable={false} value='vib' options={projectOptions} />
              </div>
              <div className="col-sm-2">
                <Select name="estimation" clearable={false} value='3.5' options={timeRangeOptions} />
              </div>
            </li>
            <li className="row daily-item">
              <div className="col-sm-5">
                <div className="pull-right">
                  <Rating />
                </div>
              </div>
              <div className="col-sm-4">
                <span className="pull-right">Total: 7.5 hours</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="day-block">
          <p>NGUYỄN DUY TÂN</p>
          <ul className="daily-list">
            <li className="row daily-item">
              <div className="col-sm-5">
                <div className="input-group">
                  <span className="input-group-addon"> <input type="checkbox" /></span>
                  <input className="form-control" id="prependedcheckbox"
                    name="prependedcheckbox" placeholder="your task" type="text"
                    value="Nếu biết tình như thế, chẳng lớn lên làm gì" />
                </div>
              </div>
              <div className="col-sm-2">
                <Select name="project" clearable={false} value='' options={projectOptions} />
              </div>
              <div className="col-sm-2">
                <Select name="estimation" clearable={false} value='' options={timeRangeOptions} />
              </div>
            </li>
            <li className="row daily-item">
              <div className="col-sm-5">
                <div className="input-group">
                  <span className="input-group-addon"> <input type="checkbox" checked /></span>
                  <input className="form-control" id="prependedcheckbox"
                    name="prependedcheckbox" placeholder="your task" type="text"
                    value="Thuở còn thơ ngày 3 cữ là thường, tôi lai rai qua từng chai lớn nhỏ" />
                </div>
              </div>
              <div className="col-sm-2">
                <Select name="project" clearable={false} value='' options={projectOptions} />
              </div>
              <div className="col-sm-2">
                <Select name="estimation" clearable={false} value='' options={timeRangeOptions} />
              </div>
            </li>
            <li className="row daily-item">
              <div className="col-sm-5">
                <div className="input-group">
                  <span className="input-group-addon"> <input type="checkbox" checked /></span>
                  <input className="form-control" id="prependedcheckbox"
                    name="prependedcheckbox" placeholder="your task" type="text"
                    value="Ai bảo say sưa là khổ" />
                </div>
              </div>
              <div className="col-sm-2">
                <Select name="project" clearable={false} value='' options={projectOptions} />
              </div>
              <div className="col-sm-2">
                <Select name="estimation" clearable={false} value='' options={timeRangeOptions} />
              </div>
            </li>
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
