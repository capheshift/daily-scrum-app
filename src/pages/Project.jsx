/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));

var ProjectPage = React.createClass({
  displayName: 'Project',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <h4>PROJECT</h4>
        </div>

        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-addon"> <input type="checkbox" /></span>
            <input className="form-control" id="prependedcheckbox"
              name="prependedcheckbox" placeholder="your task" type="text" />
          </div>
        </div>

        <div className="col-sm-12">
          <ul className="project-list">
            <li className="project-item">VIB</li>
            <li className="project-item">Nafoods</li>
            <li className="project-item">Daily Scrum</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = ProjectPage;
