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
var UserStore = require('../stores/UserStore');

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
      userOptions: [],
      userOptionsType: []
    };
  },

  componentDidMount: function() {
    ProjectActions.all();
    UserActions.getAllUsers();

    ProjectStore.addListenerOnCreateSuccess(this._onCreateSuccess, this);
    ProjectStore.addListenerOnCreateFail(this._onCreateFail, this);

    ProjectStore.addListenerGetAllProjectSuccess(this._onGetAllSuccess, this);
    ProjectStore.addListenerGetAllProjectFail(this._onGetAllFail, this);

    UserStore.addListenerOnGetAllUsersSuccess(this._onGetAllUserSuccess, this);
    UserStore.addListenerOnGetAllUsersFail(this._onGetAllUserFail, this);
  },

  componentWillUnmount: function() {
    ProjectStore.rmvListenerOnCreateSuccess(this._onCreateSuccess);
    ProjectStore.rmvListenerOnCreateFail(this._onCreateFail);

    ProjectStore.rmvListenerGetAllProjectSuccess(this._onGetAllSuccess);
    ProjectStore.rmvListenerGetAllProjectFail(this._onGetAllFail);

    UserStore.rmvListenerOnGetAllUsersSuccess(this._onGetAllUserSuccess);
    UserStore.rmvListenerOnGetAllUsersFail(this._onGetAllUserFail);
  },

  _onCreateSuccess: function(data) {
    window.location.hash = 'project';
  },

  _onCreateFail: function(data) {
    console.log('_onCreateFail', data);
  },

  _onGetAllSuccess: function(data) {
    console.log('_onGetAllSuccess', data);
    var pList = data.data;
    pList.forEach(function(item) {
      if (!item._scrumMaster) {
        item._scrumMaster = {};
      }
    });
    this.setState({projectList: pList});
  },

  _onGetAllFail: function(data) {
    console.log('_onGetAllFail', data);
  },

  _onGetAllUserSuccess: function(data) {
    this.setState({userOptions: data.data});
    this.passValueUser(data.data);
  },

  _onGetAllUserFail: function(data) {
    console.log('data fail', data);
  },

  passValueUser: function(data){
    var list = data.map(function(item){
      return {
        label: item.fullName,
        value: item._id
      };
    });
    this.setState({userOptionsType: list});
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
  },

  onSelectChangedMaster: function(e) {
    var model = this.state.model;
    model._scrumMaster = e;
    this.setState({model: model});
  },

  onSelectChangedMember: function(data, listUser) {
    var model = this.state.model;
    model._user = listUser;
    console.log(listUser);
    this.setState({model: model});
  },

  render: function() {

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
                    <td>{item._scrumMaster.fullName}</td>
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
                    options={this.state.userOptionsType} onChange={this.onSelectChangedMaster} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-12 control-label" for="textinput">Team Members</label>
                <div className="col-sm-12">
                  <Select name="form-field-name" value={this.state.model._user}
                    multi={true} clearable={true}
                    options={this.state.userOptionsType} onChange={this.onSelectChangedMember} />
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
