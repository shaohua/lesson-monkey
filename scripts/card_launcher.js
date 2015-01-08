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
            {...this.props} />
        );
        break;
      case 'MonkeyImageTextEdit':
        component = (
          <MonkeyImageTextEdit
            {...this.props}
            isEditable = {true} />
        );
        break;
      case 'MonkeyText':
        component = (
          <MonkeyText
            {...this.props} />
        );
        break;
      case 'MonkeyTextEdit':
        component = (
          <MonkeyTextEdit
            {...this.props}
            isEditable = {true} />
        );
        break;
      default:
        component = (
          <MonkeyText
            {...this.props} />
        );
        break;
    }

    return component;
  }
});

module.exports = CardLauncher;
