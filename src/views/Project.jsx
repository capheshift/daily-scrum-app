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
var async = require('async');

var ProjectPage = React.createClass({
  displayName: 'Project',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  getInitialState: function() {
    return {
      selectedProject: {},
      model: {},
      projectList: [],
      userProject: [],
      userProjectList: [],
      userOptions: [],
      userOptionsType: []
    };
  },

  componentDidMount: function() {
    ProjectActions.all();
    UserActions.getAllUsers();
    // ProjectActions.getAllUserProjects();

    ProjectStore.addListenerOnCreateSuccess(this._onCreateSuccess, this);
    ProjectStore.addListenerOnCreateFail(this._onCreateFail, this);

    ProjectStore.addListenerGetAllProjectSuccess(this._onGetAllSuccess, this);
    ProjectStore.addListenerGetAllProjectFail(this._onGetAllFail, this);

    UserStore.addListenerOnGetAllUsersSuccess(this._onGetAllUserSuccess, this);
    UserStore.addListenerOnGetAllUsersFail(this._onGetAllUserFail, this);

    // ProjectStore.addListenerGetAllUserProjectSuccess(this._onGetAllUserProjectSuccess, this);
    // ProjectStore.addListenerGetAllUserProjectFail(this._onGetGetAllUserProjectFail, this);
  },

  componentWillUnmount: function() {
    ProjectStore.rmvListenerOnCreateSuccess(this._onCreateSuccess);
    ProjectStore.rmvListenerOnCreateFail(this._onCreateFail);

    ProjectStore.rmvListenerGetAllProjectSuccess(this._onGetAllSuccess);
    ProjectStore.rmvListenerGetAllProjectFail(this._onGetAllFail);

    UserStore.rmvListenerOnGetAllUsersSuccess(this._onGetAllUserSuccess);
    UserStore.rmvListenerOnGetAllUsersFail(this._onGetAllUserFail);

    ProjectStore.rmvListenerGetAllUserProjectSuccess(this._onGetAllUserProjectSuccess);
    ProjectStore.rmvListenerGetAllUserProjectFail(this._onGetGetAllUserProjectFail);
  },

  _onCreateSuccess: function(data) {
    // window.location.hash = 'project';
    $('.js-modal').modal('hide');
  },

  _onCreateFail: function(data) {
    console.log('_onCreateFail', data);
    $('.js-modal').modal('hide');
  },

  _onGetAllSuccess: function(data) {
    console.log('_onGetAllSuccess', data);
    var pList = data.data;
    pList.forEach(function(item) {
      if (!item._scrumMaster) {
        item._scrumMaster = {};
      } else {
        // item._scrumMaster.fullName = item._scrumMaster.name.first + ' ' + item._scrumMaster.name.last;
      }
    });
    this.setState({projectList: pList});
  },

  _onGetAllFail: function(data) {
    console.log('_onGetAllFail', data);
  },

  _onGetAllUserSuccess: function(data) {
    console.log('_onGetAllUserSuccess', data.data);
    var userList = data.data.map(function(u) {
      // u.fullName = u.name.first + u.name.last;
      return u;
    });

    this.setState({
      userOptions: userList
    });

    // this.setState({userOptionsType: });
    this.passValueUser(userList);
  },

  _onGetAllUserFail: function(data) {
    console.log('data fail', data);
  },

  _onGetAllUserProjectSuccess: function(data){
    this.setState({userProject: data.data});
    // $('.js-modal').model('hide');
  },

  _onGetGetAllUserProjectFail: function(data){
    // $('.js-modal').model('hide');
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

  onDetailProjectClicked: function(projectId){
    var pList = this.state.userProject;

    var list = pList.filter(function(item) {
      // return false when project was not defined
      if (!item._project) { return false; }
      return (item._project._id === projectId);
    });

    this.setState({userProjectList: list});
    console.log(list);
  },

  onCreateProjectClicked: function(e) {
    e.preventDefault();
    var pList = this.state.projectList;
    var model = this.state.model;

    if (model.name === null || model.name.length <= 0) {
      alert('Project name is required !');
      return;
    }

    ProjectActions.create(model);
    this.setState({
      projectList: pList,
      model: { name: '' }
    });
    ProjectActions.all();
    ProjectActions.getAllUserProjects();
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
    console.log('onSelectChangedMember', data, listUser);
    var model = this.state.model;
    model._user = listUser;
    this.setState({model: model});
  },

  onNewProjectClicked: function() {
    console.log('onNewProjectClicked');
    $('.js-modal').modal({
      backdrop: 'static'
    });
  },

  onProjectClicked: function(item) {
    console.log('onProjectClicked', item);
    var memberList = item.members.map(function(u) {
      return {
        label: u.fullName,
        value: u._id
      };
    });

    item.memberList = memberList;
    this.setState({
      selectedProject: item
    });

    $('.js-project-modal').modal({
      backdrop: 'static'
    });
  },

  render: function() {
    var projectDetail = (
      <div className="modal fade js-project-modal"></div>
    );
    if (this.state.selectedProject._scrumMaster) {
      projectDetail = (
        <div className="modal fade js-project-modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Project details</h4>
              </div>
              <div className="modal-body">
                <form className="form-horizontal">
                  <fieldset>
                    <div className="form-group">
                      <label className="col-sm-12 control-label" for="textinput">Project</label>
                      <div className="col-sm-12">
                        <input id="textinput" name="name" type="text" placeholder="name of project"
                          className="form-control input-md" disabled
                          value={this.state.selectedProject.name} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-sm-12 control-label" for="textinput">Scrum Master</label>
                      <div className="col-sm-12">
                        <Select name="form-field-name"
                          clearable={false} disabled={false}
                          value={this.state.selectedProject._scrumMaster._id}
                          options={this.state.userOptionsType} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-sm-12 control-label" for="textinput">Team Members</label>
                      <div className="col-sm-12">
                        <Select name="form-field-name" value={this.state.selectedProject.memberList}
                          multi={true} clearable={true}
                          options={this.state.userOptionsType} onChange={this.onSelectChangedMember} />
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-8">
            <h3 className="title-label">PROJECT</h3>
          </div>
          <div className="col-sm-4">
            <button className="btn btn-success pull-right" onClick={this.onNewProjectClicked}>New Project</button>
          </div>
        </div>

        <div className="row">
          {this.state.projectList.map(function(item, index) {
            return (
              <div className="col-sm-4">
                <div className="project-item">
                  <h4>
                    {item.name}
                    <a href="javascript:;" onClick={this.onProjectClicked.bind(null, item)}>
                      <i className="glyphicon glyphicon-bookmark pull-right"></i>
                    </a>
                  </h4>
                  <p>Total: 468 hours</p>
                  <p>Scrum master: {item._scrumMaster.fullName}</p>
                  <p>Team members: {item.members ? item.members.length : 0}</p>
                </div>
              </div>
            );
          }.bind(this))}
        </div>

        {projectDetail}

        <div className="modal fade js-modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">New Project</h4>
              </div>
              <div className="modal-body">
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
                  </fieldset>
                </form>
              </div>
              <div className="modal-footer">
                <button id="button1id" name="button1id"
                  className="btn btn-success pull-right"
                  onClick={this.onCreateProjectClicked}>Create project</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = ProjectPage;
