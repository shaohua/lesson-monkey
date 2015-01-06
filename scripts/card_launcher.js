/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  MonkeyText = require('./monkey_text'),
  MonkeyImageText = require('./monkey_image_text'),
  RB = require('react-bootstrap');

var CardLauncher = React.createClass({
  render: function(){
    if(this.props.card.type === 'MonkeyImageText'){
      return (
        <MonkeyImageText
          card = {this.props.card} />
      );
    }else{
      return (
        <MonkeyText
          card = {this.props.card} />
      );
    }
  }
});

module.exports = CardLauncher;
