/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Actions = require('./actions');

//mostly based on
//http://codepen.io/codename065/pen/oGxfp
var ProfileCard = React.createClass({
  render: function() {
    var userName = '';
    if(this.props.params && this.props.params.userName) {
      userName = this.props.params.userName;
    }

    var newCard = (
      <div className="profile-card">
        <div className="item-1">
          <div className="img-container">
            <a href=""><img src="" /></a>
          </div>
          <div className="robin-key">
            <p>{userName}</p>
            <ul>
              <li><i className="fa fa-check"></i></li>
              <li><a href=""><i className="fa fa-plus"></i></a></li>
            </ul>
          </div>
          <ul className="follow-list">
            <li><a href=""><i className="fa fa-heart"></i> 150</a></li>
            <li><a href=""><i className="fa fa-users"></i> 200</a></li>
            <li><a href=""><i className="fa fa-building-o"></i> 80</a></li>
            <li><a href=""><i className="fa fa-comments"></i> 120</a></li>
          </ul>
        </div>
      </div>
    );

    return newCard;
  }
});

module.exports = ProfileCard;
