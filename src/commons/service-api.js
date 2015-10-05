'use strict';

var Promise = require('promise');
var $ = require('jquery');
var config = require('../config');
var apiList, result = {};

// define list of api
apiList = [
  { name: 'register', path: '/users/signup', method: 'POST'},
];

// create functions with each api link
$.each(apiList, function(index, item) {
  result[item.name] = function(data) {
    return new Promise(function(resolve, reject) {
      var path = '';
      var token = window.localStorage.getItem('token');
      var headers = {
        'Content-Type': 'application/json'
      };

      if (token) {
        headers.Authorization = 'Token token=' + token;
      }

      $.ajax({
        url: config.apiPath + path,
        type: item.method,
        headers: headers,
        cache: false,
        data: data,
        success: function(data) {
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
