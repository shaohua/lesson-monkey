/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RectangleBasic = require('./utils/rectangle_basic'),
  ContentEditable = require('./content_editable'),
  CodeMirrorEditor = require('./utils/code_mirror_editor'),
  RB = require('react-bootstrap');

var MonkeyCode = React.createClass({
  render: function(){
    var card = this.props.card;

    var content = (
      <div className='monkey-code-container'>
        <h2>
          <ContentEditable
            isEditable={false}
            html={card.title} />
        </h2>
        <CodeMirrorEditor
          readOnly={true}
          codeText={card.content} />
      </div>
    );

    return (
      <RectangleBasic
        content={content} />
    );
  }
});

module.exports = MonkeyCode;
