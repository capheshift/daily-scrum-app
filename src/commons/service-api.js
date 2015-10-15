'use strict';

var Promise = require('promise');
var $ = require('jquery');
var config = require('../config');
var apiList, result = {};

// define list of api
apiList = [
  // users
  { name: 'register', path: '/users/signup', method: 'POST' },
  { name: 'login', path: '/users/login', method: 'POST' },
  { name: 'logout', path: '/users/logout', method: 'POST' },
  { name: 'getUserById', path: '/users/${userId}/detail', method: 'GET' },

  // task
  // project
  { name: 'projectAll', path: '/projects/all', method: 'GET' },
  // user-project
];

// create functions with each api link
$.each(apiList, function(index, item) {
  result[item.name] = function(data) {
    return new Promise(function(resolve, reject) {
      var token = window.localStorage.getItem('token');
      var headers = {
        'Content-Type': 'application/json'
      };

      if (token) {
        headers.Authorization = 'Bearer ' + token;
      }

      $.ajax({
        url: config.apiPath + item.path,
        type: item.method,
        method: item.method,
        data: JSON.stringify(data),
        headers: headers,
        cache: false,
        crossDomain: true,
        dataType: 'json',
        success: function(data) {
          console.log('API', item.path, data);
          resolve(data);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  };
});

module.exports = result;
