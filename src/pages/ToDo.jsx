/**
 * @jsx React.DOM
 */
'use strict';
var DEBUG = false;
var _name = 'ToDo.jsx';
var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));
var ToDoRequestActions = require('../actions/ToDoRequestActions');
var ToDoStore = require('../stores/ToDoStore');
var ToDoElement = React.createFactory(require('../components/ToDoElement'));

function getToDoState() {
  return {
    todo: ToDoStore.getAllToDo()
  };
}

var ToDo = React.createClass({
  /**
   * Initialization
   */
  displayName: _name,

  getInitialState: function() {
    return getToDoState();
  },

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  /**
   * Render
   */
  render: function() {
    var todos = this.state.todo;
    return (
      <div>
        <p>Todos</p>
      </div>
    );
  },

  /**
   * Internal Methods
   */
  _toDoSubmit: function(e) {
    e.preventDefault();
    var txtBox = this.refs['todo-text'].getDOMNode();
    var text = txtBox.value;
    if (!text || text === '') {
      return;
    }
    // Pass Validation
    var length = this.state.todo.length;
    ToDoRequestActions.addNewTodo({
      id: length + 1,
      text: text,
      complete: false
    });
    // Clear Value
    txtBox.value = '';
  },

  _toDoChange: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':_toDoChange ---');
    }
    this.setState(getToDoState());
  },

  /**
   * Life-cycle Methods
   */
  componentWillMount: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':componentWillMount ---');
    }
    ToDoStore.addChangeListener(this._toDoChange);
    ToDoRequestActions.fetchTodos();
  },
  componentDidMount: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':componentDidMount ---');
      console.log(' States:');
      console.log(this.state);
      console.log(' Props:');
      console.log(this.props);
    }
  },
  componentWillUnmount: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':componentWillUnmount ---');
    }
    ToDoStore.removeChangeListener(this._toDoChange);
  }
});

module.exports = ToDo;
