/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Folders = require('./folders'),
  Card = require('./card_pop_view'),
  UrlInput = require('./url_input'),
  Store = require('./store'),
  Actions = require('./actions');

var FolderPopView = React.createClass({
  getInitialState: function(){
    return {};
  },

  render: function() {
    var cards = this.props.data && this.props.data.cards;
    if (typeof cards === 'undefined') return (<div/>);

    var  folderName = this.props.params.folderName,
      cardId = this.props.params.cardId,
      prevCardId = parseInt(cardId, 10) - 1,
      nextCardId = parseInt(cardId, 10) + 1,
      card = cards[cardId];

    return (
      <RB.Row>
        <RB.Col sm={12} className='card-pop'>
          <Card
            cardId={card.id}
            prevCardId={prevCardId}
            nextCardId={nextCardId}
            folderName={folderName}
            card={card} />
        </RB.Col>
      </RB.Row>
    );
  }
});

module.exports = FolderPopView;
