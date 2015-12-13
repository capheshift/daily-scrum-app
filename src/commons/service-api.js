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
  { nspace: 'UserApis', name: 'register', path: '/api/user/register', method: 'POST' },
  { nspace: 'UserApis', name: 'logout', path: '/api/user/logout', method: 'POST' },
  { nspace: 'UserApis', name: 'login', path: '/api/user/login', method: 'POST' },
  { nspace: 'UserApis', name: 'getById', path: '/api/user/${_id}/detail', method: 'GET' },
  { nspace: 'UserApis', name: 'find', path: '/api/user/find?q=${q}&l=${l}', method: 'GET' },
  { nspace: 'UserApis', name: 'all', path: '/api/user/all', method: 'GET' },
  // task
  { nspace: 'TaskApis', name: 'all', path: '/api/task/all', method: 'GET' },
  { nspace: 'TaskApis', name: 'find', path: '/api/task/find?q=${q}&l=${l}', method: 'GET' },
  { nspace: 'TaskApis', name: 'detail', path: '/api/task/${_id}/all', method: 'GET' },
  { nspace: 'TaskApis', name: 'create', path: '/api/task/', method: 'POST' },
  { nspace: 'TaskApis', name: 'update', path: '/api/task/${_id}', method: 'PUT' },
  { nspace: 'TaskApis', name: 'delete', path: '/api/task/${_id}', method: 'DELETE' },
  // project
  { nspace: 'ProjectApis', name: 'all', path: '/api/project/all', method: 'GET' },
  { nspace: 'ProjectApis', name: 'find', path: '/api/project/find?q=${q}&l=${l}', method: 'GET' },
  { nspace: 'ProjectApis', name: 'detail', path: '/api/project/${_id}/all', method: 'GET' },
  { nspace: 'ProjectApis', name: 'create', path: '/api/project/', method: 'POST' },
  { nspace: 'ProjectApis', name: 'update', path: '/api/project/${_id}', method: 'PUT' },
  { nspace: 'ProjectApis', name: 'delete', path: '/api/project/${_id}', method: 'DELETE' },

  // user-project
  // { nspace: 'UProjectApis', name: 'all', path: '/api/user-project/all', method: 'GET' },
  // { nspace: 'UProjectApis', name: 'find', path: '/api/user-project/find?q=${q}&l=${l}', method: 'GET' },
  // { nspace: 'UProjectApis', name: 'detail', path: '/api/user-project/${_id}/all', method: 'GET' },
  // { nspace: 'UProjectApis', name: 'create', path: '/api/user-project/', method: 'POST' },
  // { nspace: 'UProjectApis', name: 'update', path: '/api/user-project/${_id}', method: 'PUT' },
  // { nspace: 'UProjectApis', name: 'delete', path: '/api/user-project/${_id}', method: 'DELETE' },
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
          if (data.success) {
            resolve(data);
          } else {
            reject(data);
          }
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
