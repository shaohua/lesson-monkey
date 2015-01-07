/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  MonkeyText = require('./monkey_text'),
  MonkeyTextEdit = require('./monkey_text_edit'),
  MonkeyImageText = require('./monkey_image_text'),
  MonkeyImageTextEdit = require('./monkey_image_text_edit'),
  RB = require('react-bootstrap');

var CardLauncher = React.createClass({
  render: function(){
    var component;

    switch (this.props.type) {
      case 'MonkeyImageText':
        component = (
          <MonkeyImageText
            card = {this.props.card} />
        );
        break;
      case 'MonkeyImageTextEdit':
        component = (
          <MonkeyImageTextEdit
            isEditable = {true}
            card = {this.props.card} />
        );
        break;
      case 'MonkeyText':
        component = (
          <MonkeyText
            card = {this.props.card} />
        );
        break;
      case 'MonkeyTextEdit':
        component = (
          <MonkeyTextEdit
            isEditable = {true}
            card = {this.props.card} />
        );
        break;
      default:
        component = (
          <MonkeyText
            card = {this.props.card} />
        );
        break;
    }

    return component;
  }
});

module.exports = CardLauncher;
