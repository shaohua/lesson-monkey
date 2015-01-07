/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Navigation = ReactRouter.Navigation,
  CardLauncher = require('./card_launcher'),
  Actions = require('./actions'),
  RB = require('react-bootstrap');

var Card = React.createClass({
  mixins: [Navigation],

  getInitialState: function(){
    return {
      beingDropped: false,
      isDragging: false,
      eventCounter: 0 //count dragEnter and dragLeave events manually
    };
  },

  //prevent default allows being dropped
  //allow everyone except the current dragging card be a drop target
  onDragOver: function(event){
    if(!this.state.isDragging) {
      event.preventDefault();
    }
  },

  onDrop: function(event){
    event.preventDefault();

    Actions.rearrangeCard({
      folderIndex: this.props.domIndex,
      draggingCardId: event.dataTransfer.getData('text'),
      stationaryCardId: this.props.cardId
    });

    //reset state
    this.setState({
      beingDropped: false,
      isDragging: false,
      eventCounter: 0
    });
  },

  //change the style of the dragging card
  onDragStart: function(event){
    event.dataTransfer.setData('text', this.props.cardId);
    this.setState({
      isDragging: true
    });
  },
  onDragEnd: function(event){
    //todo
    //why is this working?
    this.setState({
      isDragging: false
    });
  },

  //change the style of the card that is being dropped
  //due to HTML5 API, need to manually count number of events
  //for dragEnter and dragLeave
  onDragEnter: function(event){
    if(this.state.isDragging){
      return;
    }
    this.setState({
      beingDropped: true,
      eventCounter: this.state.eventCounter + 1
    });
  },
  onDragLeave: function(event){
    if(this.state.isDragging){
      return;
    }

    var eventCounter = this.state.eventCounter - 1;
    if(eventCounter === 0){ //the real drag leave
      this.setState({
        beingDropped: false,
        eventCounter: eventCounter
      });
    }else{
      this.setState({
        eventCounter: eventCounter
      });
    }
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
    var cx = React.addons.classSet;
    var classes = cx({
      'card-container': true,
      'card-being-dropped': this.state.beingDropped,
      'card-is-dragging': this.state.isDragging
    });

    return (
      <RB.Col
        md={6}
        className={classes}
        draggable="true"
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
        onClick={this.onClickCard}>
          <CardLauncher
            type = {this.props.card.type}
            card = {this.props.card} />
      </RB.Col>
    );
  }
});

module.exports = Card;
