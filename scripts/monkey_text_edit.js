/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  ContentEditable = require('./content_editable'),
  RectangleBasic = require('./utils/rectangle_basic'),
  RB = require('react-bootstrap');

var MonkeyText = React.createClass({
  render: function(){
    var card = this.props.card;

    var content = (
      <div className='monkey-text-edit-container'>
        <h2>
         <ContentEditable
                isEditable={this.props.isEditable}
                html={card.title} />
        </h2>
       <ContentEditable
          isEditable={this.props.isEditable}
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
