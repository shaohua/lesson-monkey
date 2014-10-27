/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap');

var ContentEditable = React.createClass({
  componentWillReceiveProps: function(nextProps){
    //todo
    //why is this necessary
    this.forceUpdate();
  },

  render: function(){
    if(this.props.isEditable){
      return (
        <div
          onInput={this.emitChange}
          onBlur={this.emitChange}
          contentEditable
          dangerouslySetInnerHTML={{__html: this.props.html}}>
        </div>
      );
    }else{
      return (
        <div dangerouslySetInnerHTML={{__html: this.props.html}} />
      );
    }
  },

  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.getDOMNode().innerHTML;
  },

  emitChange: function(){
    var html = this.getDOMNode().innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {

      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  }
});

module.exports = ContentEditable;
