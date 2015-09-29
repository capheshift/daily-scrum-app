/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var DefaultLayout = React.createFactory(require('./layouts/Default'));

var MemberPage = React.createClass({
  displayName: 'Member',

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <h4>MEMBER</h4>
        </div>

        <div className="col-sm-6 member-list">
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="./img/avt.png" />
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">Tam Pham</h4>
              <h5>Javascript Developer</h5>
            </div>
          </div>
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="./img/avt.png" />
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">Tan Nguyễn</h4>
              <h5>Javascript Developer</h5>
            </div>
          </div>
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="./img/avt.png" />
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">Nguyễn Văn Sơn</h4>
              <h5>Javascript Developer</h5>
            </div>
          </div>
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="./img/avt.png" />
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">Giang Strider</h4>
              <h5>Javascript Developer</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MemberPage;
