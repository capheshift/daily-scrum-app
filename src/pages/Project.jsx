/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));
var Select = React.createFactory(require('react-select'));

var ProjectPage = React.createClass({
  displayName: 'Project',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  render: function() {
    var projectOptions = [
      { value: 'vib', label: 'VIB' },
      { value: 'nafoods', label: 'Nafoods' },
      { value: 'daily-scrum', label: 'Daily Scrum' }
    ];

    return (
      <div className="row">
        <div className="col-sm-12">
          <h4>PROJECT</h4>
        </div>

        <div className="col-sm-6">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Project Name</th>
                <th>Leader</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>VIB</td>
                <td>Otto</td>
                <td><a href="">Detail</a></td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Nafoods</td>
                <td>Thornton</td>
                <td><a href="">Detail</a></td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Daily Scrum</td>
                <td>the Bird</td>
                <td><a href="">Detail</a></td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Daily Scrum</td>
                <td>the Bird</td>
                <td><a href="">Detail</a></td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Daily Scrum</td>
                <td>the Bird</td>
                <td><a href="">Detail</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-sm-6">
          <form className="form-horizontal">
            <fieldset>
              <div className="form-group">
                <label className="col-sm-3 control-label" for="textinput">Project</label>
                <div className="col-sm-9">
                  <input id="textinput" name="textinput" type="text" placeholder="name of project"
                    className="form-control input-md" />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3 control-label" for="textinput">Leader</label>
                <div className="col-sm-9">
                  <Select name="form-field-name" value="nafoods" clearable={false}
                    options={projectOptions} onChange={this.onSelectChanged} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3 control-label" for="textinput">Members</label>
                <div className="col-sm-9">
                  <Select name="form-field-name" value="nafoods" clearable={false}
                    options={projectOptions} onChange={this.onSelectChanged} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3 control-label" for="button1id"></label>
                <div className="col-md-9">
                  <button id="button1id" name="button1id" className="btn btn-success pull-right">Create project</button>
                </div>
              </div>

            </fieldset>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = ProjectPage;
