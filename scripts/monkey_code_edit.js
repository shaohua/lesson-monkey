/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Actions = require('./actions'),
  RectangleBasic = require('./utils/rectangle_basic'),
  ContentEditable = require('./content_editable'),
  CodeMirrorEditor = require('./utils/code_mirror_editor'),
  RB = require('react-bootstrap');

var MonkeyCodeEdit = React.createClass({
  handleTitleChange: function(event){
    var cardCopy = JSON.parse(JSON.stringify(this.props.card));
    cardCopy.title = event.target.value;
    Actions.updateCard(cardCopy);
  },

  handleCodeChange: function(event){
    var cardCopy = JSON.parse(JSON.stringify(this.props.card));
    cardCopy.content = event.target.value;
    Actions.updateCard(cardCopy);
  },

  render: function(){
    var card = this.props.card;

    //key is important for the editor
    var content = (
      <div className='monkey-code-container'>
        <h2>
          <ContentEditable
            isEditable={this.props.isEditable}
            onChange={this.handleTitleChange}
            html={card.title} />
        </h2>
        <CodeMirrorEditor
          key={card.id}
          onChange={this.handleCodeChange}
          codeText={card.content} />
      </div>
    );

    return (
      <RectangleBasic
        content={content} />
    );
  }
});

module.exports = MonkeyCodeEdit;
