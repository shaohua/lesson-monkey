/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Actions = require('./actions'),
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

  handleTitleChange: function(event){
    var cardCopy = JSON.parse(JSON.stringify(this.props.card));
    cardCopy.title = event.target.value;
    Actions.updateCard(cardCopy);
  },

  handleCodeChange: function(){
    console.log('handleCodeChange');
  },

  render: function(){
    var card = this.props.card;

    var content = (
      <div className='monkey-code-container'>
        <h2>
          <ContentEditable
            isEditable={this.props.isEditable}
            onChange={this.handleTitleChange}
            html={card.title} />
        </h2>
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
