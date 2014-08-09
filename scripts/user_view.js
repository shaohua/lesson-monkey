/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Store = require('./store'),
  Actions = require('./actions');

var UserView = React.createClass({
  getInitialState: function(){
    return {};
  },

  render: function() {
    return (
      <div>
        User View{this.props.params}
      </div>
    );
  }
});

module.exports = UserView;