/**
 * Application Config File
 */

'use strict';

var CFG = {
  // Paint Area for this application
  container: document.getElementById('app'),
  // apiPath: 'http://daily-scrum-api.herokuapp.com',
  apiPath: 'http://localhost:5000',

  estimateList: [
    { value: '0.5', label: '30 mins' },
    { value: '1', label: '1 hour' },
    { value: '1.5', label: '1 hours 30 mins' },
    { value: '2', label: '2 hours' },
    { value: '2.5', label: '2 hours 30 mins' },
    { value: '3', label: '3 hours' },
    { value: '3.5', label: '3 hours 30 mins' },
    { value: '4', label: '4 hours' },
    { value: '4.5', label: '4 hours 30 mins' },
    { value: '5', label: '5 hours' },
    { value: '5.5', label: '5 hours 30 mins' },
    { value: '6', label: '6 hours' },
    { value: '6.5', label: '6 hours 30 mins' },
    { value: '7', label: '7 hours' },
    { value: '7.5', label: '7 hours 30 mins' },
    { value: '8', label: '8 hours' },
  ]
};

module.exports = CFG;
