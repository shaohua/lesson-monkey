/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Actions = require('./actions'),
  ContentEditable = require('./content_editable'),
  RectangleBasic = require('./utils/rectangle_basic'),
  RB = require('react-bootstrap');

var MonkeyText = React.createClass({
  handleTitleChange: function(event){
    var cardCopy = JSON.parse(JSON.stringify(this.props.card));
    cardCopy.title = event.target.value;
    Actions.updateCard(cardCopy);
  },

  handleContentChange: function(event){
    var cardCopy = JSON.parse(JSON.stringify(this.props.card));
    cardCopy.content = event.target.value;
    Actions.updateCard(cardCopy);
  },

  render: function(){
    var card = this.props.card;

    var content = (
      <div className='monkey-text-edit-container'>
        <h2>
          <ContentEditable
            isEditable={this.props.isEditable}
            onChange={this.handleTitleChange}
            html={card.title} />
        </h2>
       <ContentEditable
          isEditable={this.props.isEditable}
          onChange={this.handleContentChange}
          html={card.content} />
      </div>
    );

    return (
      <RectangleBasic
        content={content} />
    );
  }
});

module.exports = MonkeyText;
