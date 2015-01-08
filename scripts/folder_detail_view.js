/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Folders = require('./folders'),
  Card = require('./card'),
  UrlInput = require('./url_input'),
  Store = require('./store'),
  Actions = require('./actions');

var FolderDetailView = React.createClass({
  mixins: [ ReactRouter.State ],

  getInitialState: function(){
    return {};
  },

  componentDidMount: function(){
    Actions.updateFolderIndex(this.getParams().folderName);
  },

  render: function() {
    var cards = this.props.data && this.props.data.cards;
    var folders = this.props.data && this.props.data.folders;

    var currentFolderIndex = this.getParams().folderName;

    var cardsInCurrentFolder = [];
    if( _.isArray(folders) ){
      cardsInCurrentFolder = _.map(folders[currentFolderIndex].cardIds, function(cardId){
        return cards[cardId];
      });
    }

    var cardsRendered = _.map(cardsInCurrentFolder, function(card, index){
      return (
        <Card
          cardId={card.id}
          card={card}
          params={this.getParams()}
          key={index} />
      );
    }, this);


    return (
      <RB.Row>
        <UrlInput />
        {cardsRendered}
      </RB.Row>
    );
  }
});

module.exports = FolderDetailView;
