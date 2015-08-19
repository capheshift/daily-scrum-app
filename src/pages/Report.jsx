/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));

var ReportPage = React.createClass({
  displayName: 'Report',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  render: function() {
    return (
      <div>
        <h4>REPORT/MAY 5th</h4>
        <div className="day-block">
          <p>PHẠM MINH TÂM</p>
          <ul className="daily-list">
            <li className="daily-item">
              <div className="input-group">
                <span className="input-group-addon"> <input type="checkbox" /></span>
                <input className="form-control" id="prependedcheckbox"
                  name="prependedcheckbox" placeholder="your task" type="text"
                  value="Nếu biết tình như thế, chẳng lớn lên làm gì" />
              </div>
            </li>
            <li className="daily-item">
              <div className="input-group">
                <span className="input-group-addon"> <input type="checkbox" /></span>
                <input className="form-control" id="prependedcheckbox"
                  name="prependedcheckbox" placeholder="your task" type="text"
                  value="Thuở còn thơ ngày 3 cữ là thường, tôi lai rai qua từng chai lớn nhỏ" />
              </div>
            </li>
          </ul>
        </div>
        <div className="day-block">
          <p>NGUYỄN TRỌNG TẤN</p>
          <ul className="daily-list">
            <li className="daily-item">
              <div className="input-group">
                <span className="input-group-addon"> <input type="checkbox" /></span>
                <input className="form-control" id="prependedcheckbox"
                  name="prependedcheckbox" placeholder="your task" type="text"
                  value="Nếu biết tình như thế, chẳng lớn lên làm gì" />
              </div>
            </li>
            <li className="daily-item">
              <div className="input-group">
                <span className="input-group-addon"> <input type="checkbox" checked /></span>
                <input className="form-control" id="prependedcheckbox"
                  name="prependedcheckbox" placeholder="your task" type="text"
                  value="Thuở còn thơ ngày 3 cữ là thường, tôi lai rai qua từng chai lớn nhỏ" />
              </div>
            </li>
            <li className="daily-item">
              <div className="input-group">
                <span className="input-group-addon"> <input type="checkbox" checked /></span>
                <input className="form-control" id="prependedcheckbox"
                  name="prependedcheckbox" placeholder="your task" type="text"
                  value="Ai bảo say sưa là khổ" />
              </div>
            </li>
          </ul>
        </div>

        <h4>REPORT/TODAY</h4>
        <div className="day-block">
          <p>PHẠM MINH TÂM</p>
          <ul className="daily-list">
            <li className="daily-item">
              <div className="input-group">
                <span className="input-group-addon"> <input type="checkbox" /></span>
                <input className="form-control" id="prependedcheckbox"
                  name="prependedcheckbox" placeholder="your task" type="text"
                  value="Nếu biết tình như thế, chẳng lớn lên làm gì" />
              </div>
            </li>
            <li className="daily-item">
              <div className="input-group">
                <span className="input-group-addon"> <input type="checkbox" /></span>
                <input className="form-control" id="prependedcheckbox"
                  name="prependedcheckbox" placeholder="your task" type="text"
                  value="Thuở còn thơ ngày 3 cữ là thường, tôi lai rai qua từng chai lớn nhỏ" />
              </div>
            </li>
          </ul>
        </div>
        <div className="day-block">
          <p>NGUYỄN TRỌNG TẤN</p>
          <ul className="daily-list">
            <li className="daily-item">
              <div className="input-group">
                <span className="input-group-addon"> <input type="checkbox" /></span>
                <input className="form-control" id="prependedcheckbox"
                  name="prependedcheckbox" placeholder="your task" type="text"
                  value="Nếu biết tình như thế, chẳng lớn lên làm gì" />
              </div>
            </li>
            <li className="daily-item">
              <div className="input-group">
                <span className="input-group-addon"> <input type="checkbox" checked /></span>
                <input className="form-control" id="prependedcheckbox"
                  name="prependedcheckbox" placeholder="your task" type="text"
                  value="Thuở còn thơ ngày 3 cữ là thường, tôi lai rai qua từng chai lớn nhỏ" />
              </div>
            </li>
            <li className="daily-item">
              <div className="input-group">
                <span className="input-group-addon"> <input type="checkbox" checked /></span>
                <input className="form-control" id="prependedcheckbox"
                  name="prependedcheckbox" placeholder="your task" type="text"
                  value="Ai bảo say sưa là khổ" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = ReportPage;
