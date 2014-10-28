/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap');

var InputEditable = React.createClass({
  getInitialState: function(){
    return {
      text: this.props.text
    };
  },

  componentWillReceiveProps: function(nextProps){
    this.setState({
      text: nextProps.text
    });
  },

  onEnterInput: function(event){
    if(event.which === 13){
      this.emitChange();
    }
  },

  updateText: function(event){
    this.setState({
      text: event.target.value
    });
  },

  emitChange: function(){
    if (this.props.onChange && this.state.text !== this.lastText) {
      this.props.onChange({
        target: {
          value: this.state.text
        }
      });
    }
    this.lastText = this.state.text;
  },

  render: function(){
    if(this.props.isEditable){
      return (
        <input
          className="input-editable"
          onInput={this.updateText}
          onChange={this.updateText}
          onBlur={this.emitChange}
          onKeyPress={this.onEnterInput}
          value={this.state.text} />
      );
    }else{
      return (
        <div className="input-editable">
          {this.props.text}
        </div>
      );
    }
  }
});

module.exports = InputEditable;
