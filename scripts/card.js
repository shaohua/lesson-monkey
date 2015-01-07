/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Navigation = ReactRouter.Navigation,
  CardLauncher = require('./card_launcher'),
  RB = require('react-bootstrap');

var Card = React.createClass({
  mixins: [Navigation],

  onDragStart: function(event){
    var dragData = this.props.cardId;
    event.dataTransfer.setData('text', dragData);
  },

  onDragEnd: function(event){
    //todo, delete card after drag end and a success drop
    // console.log('onDragEnd');
  },

  onClickCard: function(){
    //todo
    //get everything from route
    var nextRoute = '/' + this.props.params.userId +
      '/folder/' + this.props.card.folderIndex +
      '/card/' + this.props.card.id;
    this.transitionTo(nextRoute);
  },

  render: function(){
    return (
      <RB.Col
        md={6}
        className='card-container'
        draggable="true"
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onClick={this.onClickCard}>
          <CardLauncher
            type = {this.props.card.type}
            card = {this.props.card} />
      </RB.Col>
    );
  }
});

module.exports = Card;
