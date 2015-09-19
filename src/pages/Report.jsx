/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));
var Rating = require('react-rating');
var Select = React.createFactory(require('react-select'));

var ReportPage = React.createClass({
  displayName: 'Report',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  onSelectChanged: function() {
    console.log('onSelectChanged');
  },

  render: function() {
    var projectOptions = [
      { value: 'vib', label: 'VIB' },
      { value: 'nafoods', label: 'Nafoods' },
      { value: 'daily-scrum', label: 'Daily Scrum' }
    ];

    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
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
              <div className="col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon"> <input type="checkbox" /></span>
                  <input className="form-control" id="prependedcheckbox"
                    name="prependedcheckbox" placeholder="your task" type="text"
                    value="Nếu biết tình như thế, chẳng lớn lên làm gì" />
                </div>
              </div>
            </li>
            <li className="row daily-item">
              <div className="col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon"> <input type="checkbox" /></span>
                  <input className="form-control" id="prependedcheckbox"
                    name="prependedcheckbox" placeholder="your task" type="text"
                    value="Thuở còn thơ ngày 3 cữ là thường, tôi lai rai qua từng chai lớn nhỏ" />
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="day-block">
          <p>NGUYỄN TRỌNG TẤN</p>
          <ul className="daily-list">
            <li className="row daily-item">
              <div className="col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon"> <input type="checkbox" /></span>
                  <input className="form-control" id="prependedcheckbox"
                    name="prependedcheckbox" placeholder="your task" type="text"
                    value="Nếu biết tình như thế, chẳng lớn lên làm gì" />
                </div>
              </div>
            </li>
            <li className="row daily-item">
              <div className="col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon"> <input type="checkbox" checked /></span>
                  <input className="form-control" id="prependedcheckbox"
                    name="prependedcheckbox" placeholder="your task" type="text"
                    value="Thuở còn thơ ngày 3 cữ là thường, tôi lai rai qua từng chai lớn nhỏ" />
                </div>
              </div>
            </li>
            <li className="row daily-item">
              <div className="col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon"> <input type="checkbox" checked /></span>
                  <input className="form-control" id="prependedcheckbox"
                    name="prependedcheckbox" placeholder="your task" type="text"
                    value="Ai bảo say sưa là khổ" />
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
