/**
 * @jsx React.DOM
 */
'use strict';

var DEBUG = false;
var _name = 'Navbar.jsx';
var React = require('react');
var Link = React.createFactory(require('./Link'));

var Navbar = React.createClass({

  displayName: _name,

  render() {
    return (
      <nav className="navbar">
        {Link({ className: 'navbar-brand', to: '/' }, 'DAILY SCRUM')}

        <ul className="nav navbar-nav">
          <li className={this._checkUri('')}>
            {Link({ className: 'navbar-item', to: '/daily' }, 'DAILY')}
          </li>
          <li className={this._checkUri('libraries')}>
            {Link({ className: 'navbar-item', to: '/report' }, 'REPORT')}
          </li>
          <li className={this._checkUri('todo')}>
            {Link({ className: 'navbar-item', to: '/project' }, 'PROJECT')}
          </li>
          <li className={this._checkUri('todo')}>
            {Link({ className: 'navbar-item', to: '/member' }, 'MEMBER')}
          </li>
        </ul>
      </nav>
    );
  },

  /**
   * Internal Methods
   */
  _checkUri: function(uriCompare) {
    var _uri = this.props.uri[0];
    if (DEBUG) {
      console.log('[*] ' + _name + ':_checkUri ---');
      console.log(uriCompare);
      console.log(this.props.uri);
    }
    return (_uri === uriCompare) ? 'active': '';
  }

});

module.exports = Navbar;
