/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Navigation = ReactRouter.Navigation,
  ContentEditable = require('./content_editable'),
  Actions = require('./actions'),
  Rectangle = require('./utils/rectangle'),
  RB = require('react-bootstrap');

var MonkeyImageTextEdit = React.createClass({
  getRandomBgColor: function(){
    var bgColorList = ['green-sea', 'nephritis', 'belize-hole', 'wisteria', 'midnight-blue'];
    return _.sample(bgColorList);
  },

  onCardEdit: function(){
    console.log('onCardEdit');
  },

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
    var colorClass = this.getRandomBgColor();

    var left = (
      <img
        src={card.imgUrl}
        className="img-responsive"/>
    );
    var right = (
      <div>
        <h2>
          <ContentEditable
            isEditable={this.props.isEditable}
            html={card.title}
            onChange={this.handleTitleChange} />
        </h2>
        <div className="card-main-text">
          <ContentEditable
            isEditable={this.props.isEditable}
            html={card.content}
            onChange={this.handleContentChange} />
        </div>
        <div className='card-right-bottom-col'>
          <span
            onClick={this.onCardEdit}
            className="icon icon-edit"></span>
          <span>&nbsp;</span>
          <a href={card.htmlUrl} target='_blank'>
            <span className="icon icon-more"></span>
          </a>
        </div>
      </div>
    );

    return (
      <div className='card-row'>
        <Rectangle
          leftBgColor={colorClass}
          left={left}
          right={right} />
        <div
          onClick={this.onNavPrev}
          className="card-nav-prev">
          <span className="icon icon-left-nav"></span>
        </div>
        <div
          onClick={this.onNavNext}
          className="card-nav-next">
          <span className="icon icon-right-nav"></span>
        </div>
      </div>
    );
  }
});

module.exports = MonkeyImageTextEdit;
