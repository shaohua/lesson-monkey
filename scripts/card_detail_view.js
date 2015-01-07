/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  Backbone = require('backbone'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Folders = require('./folders'),
  UrlInput = require('./url_input'),
  Store = require('./store'),
  Navigation = ReactRouter.Navigation,
  CardLauncher = require('./card_launcher'),
  Actions = require('./actions');

var FolderPopView = React.createClass({
  mixins: [ ReactRouter.State, Navigation ],

  getInitialState: function(){
    return {};
  },

  onNavPrev: function(){
    var prevRoute = '/' + this.props.userId +
      '/folder/' + this.props.card.folderIndex +
      '/card/' + this.props.prevCardId;
    this.transitionTo(prevRoute);
  },

  onNavNext: function(){
    var nextRoute = '/' + this.props.userId +
      '/folder/' + this.props.card.folderIndex +
      '/card/' + this.props.nextCardId;
    this.transitionTo(nextRoute);
  },

  render: function() {
    var cards = this.props.data && this.props.data.cards;
    if (typeof cards === 'undefined') return (<div/>);

    var  folderName = this.getParams().folderName,
      userId = this.getParams().userId,
      cardId = this.getParams().cardId,
      prevCardId = parseInt(cardId, 10) - 1,
      nextCardId = parseInt(cardId, 10) + 1,
      card = cards[cardId];

    return (
      <RB.Row>
        <RB.Col sm={12} className='card-pop'>
          <CardLauncher
            type = {card.type + 'Edit'}
            isEditable={this.props.data.isEditable}
            cardId={card.id}
            prevCardId={prevCardId}
            nextCardId={nextCardId}
            folderName={folderName}
            userId={userId}
            card={card} />
        </RB.Col>
      </RB.Row>
    );
  }
});

module.exports = FolderPopView;
