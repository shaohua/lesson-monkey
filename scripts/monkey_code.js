/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RectangleBasic = require('./utils/rectangle_basic'),
  ContentEditable = require('./content_editable'),
  CodeMirrorEditor = require('./utils/code_mirror_editor'),
  RB = require('react-bootstrap');

var MonkeyCode = React.createClass({
  getInitialState: function(){
    return {
      code: 'var happy = "ever after"'
    };
  },

  handleCodeChange: function(){
    console.log('handleCodeChange');
  },

  render: function(){
    var card = this.props.card;

    var content = (
      <div className='monkey-code-container'>
        <CodeMirrorEditor
          onChange={this.handleCodeChange}
          codeText={this.state.code} />
      </div>
    );

    return (
      <RectangleBasic
        content={content} />
    );
  }
});

module.exports = MonkeyCode;
