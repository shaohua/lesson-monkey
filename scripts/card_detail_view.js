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
    return this.getStateFromProps(this.props);
  },

  onNavPrev: function(){
    var prevRoute = '/' + this.getParams().userId +
      '/folder/' + this.getParams().folderName +
      '/card/' + this.props.prevCardId;
    this.transitionTo(prevRoute);
  },

  onNavNext: function(){
    var nextRoute = '/' + this.getParams().userId +
      '/folder/' + this.getParams().folderName +
      '/card/' + this.props.nextCardId;
    this.transitionTo(nextRoute);
  },

  //based on https://github.com/rackt/react-router/blob/master/UPGRADE_GUIDE.md
  componentWillReceiveProps: function(nextProps){
    this.setState( this.getStateFromProps(nextProps) );
  },
  getStateFromProps: function(props){
    return {
      prevCardId: this.getAdjacentCardId('prev'),
      nextCardId: this.getAdjacentCardId('next'),
      data: props.data
    };
  },

  getAdjacentCardId: function(adjacent){
    if(_.isUndefined(this.state) || _.isNull(this.state)){
      return '';
    }

    if(_.isUndefined(this.state.data.folders)){
      return '';
    }

    console.log('this.state', this.state);

    var cards = this.state.data && this.state.data.cards;

    var  folderName = this.getParams().folderName,
      userId = this.getParams().userId,
      cardId = this.getParams().cardId,
      currentFolder = this.state.data.folders[folderName],
      cardIds = currentFolder.cardIds,
      card = cards[cardId];

    //similar to pageNumber
    var cardNumber = _.indexOf(cardIds, cardId);

    var prevCardId = cardIds[cardNumber - 1],
      nextCardId = cardIds[cardNumber + 1];

    if(adjacent === 'prev'){
      return prevCardId;
    }else{
      return nextCardId;
    }

  },

  render: function() {
    //use this.state.data instead of this.props.data due to react router
    console.log('card detail', this.state);

    var cards = this.state.data && this.state.data.cards;
    if (typeof cards === 'undefined') return (<div/>);

    var  folderName = this.getParams().folderName,
      userId = this.getParams().userId,
      cardId = this.getParams().cardId,
      currentFolder = this.state.data.folders[folderName],
      cardIds = currentFolder.cardIds,
      card = cards[cardId];

    //similar to pageNumber
    var cardNumber = _.indexOf(cardIds, cardId);

    var prevCardId = cardIds[cardNumber - 1],
      nextCardId = cardIds[cardNumber + 1];

    return (
      <RB.Row>
        <RB.Col sm={12} className='card-detail'>
          <CardLauncher
            type = {card.type + 'Edit'}
            isEditable={this.state.data.isEditable}
            cardId={card.id}
            prevCardId={prevCardId}
            nextCardId={nextCardId}
            folderName={folderName}
            userId={userId}
            card={card} />
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
        </RB.Col>
      </RB.Row>
    );
  }
});

module.exports = FolderPopView;
