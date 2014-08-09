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
      <RB.Row>
        <RB.Col sm={3}>
          {this.props.params}
        </RB.Col>
        <RB.Col sm={9}>
          {this.props.params}
        </RB.Col>
      </RB.Row>
    );
  }
});

module.exports = UserView;
