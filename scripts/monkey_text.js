/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Rectangle = require('./utils/rectangle'),
  RB = require('react-bootstrap');

var MonkeyText = React.createClass({
  render: function(){
    var card = this.props.card;
    return (
      <Rectangle
        left='left'
        right='right' />
    );
  }
});

module.exports = MonkeyText;
