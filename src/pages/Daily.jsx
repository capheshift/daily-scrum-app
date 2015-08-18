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

  render: function() {
    return (
      <div className="container">
        <h4>DAILY <small>The more you plan, the better you success !</small></h4>

        <div className="day-block">
          <p>TODAY</p>
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
            <li className="daily-item">
              <button className="btn btn-sm btn-default">+ new task</button>
            </li>
          </ul>
        </div>

        <div className="day-block">
          <p>TOMORROW</p>
          <ul className="daily-list">
            <li className="daily-item">
              <div className="input-group">
                <span className="input-group-addon"> <input type="checkbox" /></span>
                <input className="form-control" id="prependedcheckbox"
                  name="prependedcheckbox" placeholder="your task" type="text"
                  value="Ai bảo say sưa là khổ" />
              </div>
            </li>
            <li className="daily-item">
              <div className="input-group">
                <span className="input-group-addon"> <input type="checkbox" /></span>
                <input className="form-control" id="prependedcheckbox"
                  name="prependedcheckbox" placeholder="your task" type="text"
                  value="Tôi mơ màng nghe men vút lên cao," />
              </div>
            </li>
            <li className="daily-item">
              <button className="btn btn-sm btn-default">+ new task</button>
            </li>
          </ul>
        </div>

        <div className="day-block">
          <p>MAY 5th</p>
          <ul className="daily-list">
            <li className="daily-item">
              <div className="input-group">
                <span className="input-group-addon"> <input type="checkbox" /></span>
                <input className="form-control" id="prependedcheckbox"
                  name="prependedcheckbox" placeholder="your task" type="text" />
              </div>
            </li>
            <li className="daily-item">
              <button className="btn btn-sm btn-default">+ new task</button>
            </li>
          </ul>
        </div>

      </div>
    );
  }
});

module.exports = DailyPage;
