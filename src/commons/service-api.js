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
      var token = window.localStorage.getItem('token');
      var headers = {
        'Content-Type': 'application/json'
      };

      if (token) {
        headers.Authorization = 'Token token=' + token;
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
