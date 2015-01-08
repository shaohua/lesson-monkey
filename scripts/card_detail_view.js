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
      '/card/' + this.state.prevCardId;
    this.transitionTo(prevRoute);
  },

  onNavNext: function(){
    var nextRoute = '/' + this.getParams().userId +
      '/folder/' + this.getParams().folderName +
      '/card/' + this.state.nextCardId;
    this.transitionTo(nextRoute);
  },

  //based on https://github.com/rackt/react-router/blob/master/UPGRADE_GUIDE.md
  componentWillReceiveProps: function(nextProps){
    this.setState( this.getStateFromProps(nextProps) );
  },
  getStateFromProps: function(props){
    return {
      prevCardId: this.getAdjacentCardId('prev', props.data),
      nextCardId: this.getAdjacentCardId('next', props.data),
      data: props.data
    };
  },

  getAdjacentCardId: function(adjacent, data){
    //guard
    if(_.isUndefined(data.folders)){
      return '';
    }

    var  folderName = this.getParams().folderName,
      userId = this.getParams().userId,
      cardId = this.getParams().cardId,
      cards = data.cards,
      currentFolder = data.folders[folderName];

    var cardIds = currentFolder.cardIds,
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
    var cards = this.state.data && this.state.data.cards;
    if (typeof cards === 'undefined') return (<div/>);

    var  folderName = this.getParams().folderName,
      userId = this.getParams().userId,
      cardId = this.getParams().cardId,
      currentFolder = this.state.data.folders[folderName],
      cardIds = currentFolder.cardIds,
      card = cards[cardId];

    var prevCardId = this.state.prevCardId,
      nextCardId = this.state.nextCardId;
    var cx = React.addons.classSet;
    var prevClasses = cx({
      "card-nav-prev": true,
      "hidden": _.isUndefined(prevCardId) || prevCardId === ''
    });
    var nextClasses = cx({
      "card-nav-next": true,
      "hidden": _.isUndefined(nextCardId) || nextCardId === ''
    });

    return (
      <RB.Row>
        <RB.Col sm={12} className='card-detail'>
          <CardLauncher
            type = {card.type + 'Edit'}
            isEditable={this.state.data.isEditable}
            card={card} />
          <div
            onClick={this.onNavPrev}
            className={prevClasses}>
            <span className="icon icon-left-nav"></span>
          </div>
          <div
            onClick={this.onNavNext}
            className={nextClasses}>
            <span className="icon icon-right-nav"></span>
          </div>
        </RB.Col>
      </RB.Row>
    );
  }
});

module.exports = FolderPopView;
