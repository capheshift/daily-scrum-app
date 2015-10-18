/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('./layouts/Default'));
var Select = React.createFactory(require('react-select'));
var ProjectApis = require('../commons/service-api').ProjectApis;
var UserApis = require('../commons/service-api').UserApis;
var ProjectActions = require('../actions/ProjectActions');
var ProjectStore = require('../stores/ProjectStore');
var UserActions = require('../actions/UserActions');

var ProjectPage = React.createClass({
  displayName: 'Project',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  getInitialState: function() {
      return {
      model: {},
      projectList: [],
      userOptions: []
    };
  },

  componentDidMount: function() {
    ProjectActions.all();

    ProjectStore.addListenerOnCreateSuccess(this._onCreateSuccess, this);
    ProjectStore.addListenerOnCreateFail(this._onCreateFail, this);

    ProjectStore.addListenerGetAllProjectSuccess(this._onGetAllSuccess, this);
    ProjectStore.addListenerGetAllProjectFail(this._onGetAllFail, this);
  },

  componentWillUnmount: function() {
    ProjectStore.rmvListenerOnCreateSuccess(this._onCreateSuccess);
    ProjectStore.rmvListenerOnCreateFail(this._onCreateFail);

    ProjectStore.rmvListenerGetAllProjectSuccess(this._onGetAllSuccess);
    ProjectStore.rmvListenerGetAllProjectFail(this._onGetAllFail);
  },

  _onCreateSuccess: function(data) {
    console.log('_onCreateSuccess', data);
    window.location.hash = 'project';
  },

  _onCreateFail: function(data) {
    console.log('_onCreateFail', data);
  },

  _onGetAllSuccess: function(data) {
    console.log('_onGetAllSuccess', data);
    this.setState({projectList: data.data});
    window.location.hash = 'project';
  },

  _onGetAllFail: function(data) {
    console.log('_onGetAllFail', data);
  },

  onCreateProjectClicked: function(e) {
    e.preventDefault();

    var pList = this.state.projectList;

    ProjectActions.create(this.state.model);

    pList.push({
      name: this.state.model.name
      //leader: "Giang"
    });

    this.setState({
      projectList: pList,
      model: { name: '' }
    });
  },

  onChange: function(e) {
    var model = this.state.model;
    model[e.target.name] = e.target.value;
    this.setState({model: model});
    console.log(model);
  },

  onSelectChangedMaster: function(e) {
    var model = this.state.model;
    model._scrumMaster = e;
    this.setState({model: model});
  },

    onSelectChangedMember: function(data) {
    var model = this.state.model;
    model.members = data;
    this.setState({model: model});
  },

  render: function() {

    var userOptionsType = [
      { value: '561fd827b668ae030085a6d6', label: 'Tam Pham' },
      { value: '5621fe76bb87350300195ce0', label: 'Tan Nguyen' },
      { value: '5621d55a6d7edd0300e0417b', label: 'Giang Strider' },
      { value: '562261c643ecfd0300b15f5a', label: 'Nguyễn Văn Sơn' }
    ];

    return (
      <div className="row">
        <div className="col-sm-12">
          <h4>PROJECT</h4>
        </div>

        <div className="col-sm-8">
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
              {this.state.projectList.map(function(item, index) {

                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item._id}</td>
                    <td><a href="">Detail</a></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="col-sm-4 ">
          <form className="form-horizontal">
            <fieldset>
              <div className="form-group">
                <label className="col-sm-12 control-label" for="textinput">Project</label>
                <div className="col-sm-12">
                  <input id="textinput" name="name" type="text" placeholder="name of project"
                    className="form-control input-md"
                    value={this.state.model.name} onChange={this.onChange} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-12 control-label" for="textinput">Scrum Master</label>
                <div className="col-sm-12">
                  <Select name="form-field-name" value={this.state.model._scrumMaster} clearable={false}
                    options={userOptionsType} onChange={this.onSelectChangedMaster} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-12 control-label" for="textinput">Team Members</label>
                <div className="col-sm-12">
                  <Select name="form-field-name" value={this.state.model.members}
                    multi={true} clearable={true}
                    options={userOptionsType} onChange={this.onSelectChangedMember} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-12 control-label" for="button1id"></label>
                <div className="col-md-12">
                  <button id="button1id" name="button1id"
                    className="btn btn-success pull-right"
                    onClick={this.onCreateProjectClicked}>Create project</button>
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
