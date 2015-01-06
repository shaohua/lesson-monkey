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

var FolderView = React.createClass({
  mixins: [ ReactRouter.State ],

  getInitialState: function(){
    return {};
  },

  componentDidMount: function(){
    Actions.updateFolderIndex(this.getParams().folderName);
  },

  render: function() {
    var cards = this.props.data && this.props.data.cards;
    var cardsInCurrentFolder = _.filter(cards, function(card){
      return card.folderIndex + '' === this.getParams().folderName + '';
    }, this);
    var cardsRendered = _.map(cardsInCurrentFolder, function(card){
      return (<Card cardId={card.id} card={card} params={this.getParams()}/>);
    }, this);


    return (
      <RB.Row>
        <RB.Col sm={12}>
          <UrlInput />
          {cardsRendered}
        </RB.Col>
      </RB.Row>
    );
  }
});

module.exports = FolderView;
