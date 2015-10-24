// capheshift.github.io 2015
// @author: Tw

'use strict';

var $ = require('jquery');
var _ = require('lodash');
var Promise = require('promise');
var config = require('../config');
var apiList, result = {};
var NotificationActions = require('../actions/NotificationActions');

// define list of api
apiList = [
  // users
  { nspace: 'UserApis', name: 'register', path: '/users/signup', method: 'POST' },
  { nspace: 'UserApis', name: 'login', path: '/users/login', method: 'POST' },
  { nspace: 'UserApis', name: 'logout', path: '/users/logout', method: 'POST' },
  { nspace: 'UserApis', name: 'getById', path: '/users/${_id}/detail', method: 'GET' },
  { nspace: 'UserApis', name: 'find', path: '/users/find?q=${q}&l=${l}', method: 'GET' },
  { nspace: 'UserApis', name: 'all', path: '/users/all', method: 'GET' },
  // task
  { nspace: 'TaskApis', name: 'all', path: '/tasks/all', method: 'GET' },
  { nspace: 'TaskApis', name: 'find', path: '/tasks/find?q=${q}&l=${l}', method: 'GET' },
  { nspace: 'TaskApis', name: 'detail', path: '/tasks/${_id}/all', method: 'GET' },
  { nspace: 'TaskApis', name: 'create', path: '/tasks/', method: 'POST' },
  { nspace: 'TaskApis', name: 'update', path: '/tasks/${_id}', method: 'PUT' },
  { nspace: 'TaskApis', name: 'delete', path: '/tasks/${_id}', method: 'DELETE' },
  // project
  { nspace: 'ProjectApis', name: 'all', path: '/projects/all', method: 'GET' },
  { nspace: 'ProjectApis', name: 'find', path: '/projects/find?q=${q}&l=${l}', method: 'GET' },
  { nspace: 'ProjectApis', name: 'detail', path: '/projects/${_id}/all', method: 'GET' },
  { nspace: 'ProjectApis', name: 'create', path: '/projects/', method: 'POST' },
  { nspace: 'ProjectApis', name: 'update', path: '/projects/${_id}', method: 'PUT' },
  { nspace: 'ProjectApis', name: 'delete', path: '/projects/${_id}', method: 'DELETE' },
  // user-project
  { nspace: 'UProjectApis', name: 'all', path: '/user-project/all', method: 'GET' },
  { nspace: 'UProjectApis', name: 'find', path: '/user-project/find?q=${q}&l=${l}', method: 'GET' },
  { nspace: 'UProjectApis', name: 'detail', path: '/user-project/${_id}/all', method: 'GET' },
  { nspace: 'UProjectApis', name: 'create', path: '/user-project/', method: 'POST' },
  { nspace: 'UProjectApis', name: 'update', path: '/user-project/${_id}', method: 'PUT' },
  { nspace: 'UProjectApis', name: 'delete', path: '/user-project/${_id}', method: 'DELETE' },
];

// create functions with each api link
$.each(apiList, function(index, item) {
  if (result[item.nspace] === undefined) {
    result[item.nspace] = {};
  }

  /**
   * wrapper to make request easier
   * @param  data   [that data wanna passed into body of request]
   * @param  params [that data wanna passed into url]
   */
  result[item.nspace][item.name] = function(data, params) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        NotificationActions.startRequest({});
      }, 0);

      var realPath = '';
      var token = window.localStorage.getItem('token');
      var headers = {
        'Content-Type': 'application/json'
      };

      if (token) {
        headers.Authorization = 'Bearer ' + token;
      }

      if (item.name === 'find') {
        realPath = _.template(item.path)({
          q: JSON.stringify(params.q),
          l: JSON.stringify(params.l)
        });
      } else {
        realPath = _.template(item.path)(params);
      }

      console.log('service', data, params, realPath);
      $.ajax({
        url: config.apiPath + realPath,
        type: item.method,
        method: item.method,
        data: JSON.stringify(data),
        headers: headers,
        cache: false,
        crossDomain: true,
        dataType: 'json',
        success: function(data) {
          NotificationActions.endRequest({});
          resolve(data);
        },
        error: function(err) {
          NotificationActions.endRequest({});
          reject(err);
        }
      });
    });
  };
});
console.log('API', result);
module.exports = result;
