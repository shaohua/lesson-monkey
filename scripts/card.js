/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Navigation = ReactRouter.Navigation,
  MonkeyText = require('./monkey_text'),
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
      <div
        draggable="true"
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onClick={this.onClickCard}
        className="col-lg-6 col-md-6">
        <div className="panel panel-success card-panel">
          <div className="panel-body card-panel-body">
            <MonkeyText
              card = {this.props.card} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Card;
