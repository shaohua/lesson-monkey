/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Navigation = ReactRouter.Navigation,
  ContentEditable = require('./content_editable'),
  Actions = require('./actions'),
  CardLauncher = require('./card_launcher'),
  RB = require('react-bootstrap');

var CardPopView = React.createClass({
  mixins: [Navigation],

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

  render: function(){
    var card = this.props.card,
      cardId = this.props.cardId;

    return (
      <div className="panel panel-success card-panel">
        <div className="panel-body card-panel-body">
          <CardLauncher
            type = {this.props.card.type + 'Edit'}
            card = {this.props.card} />
        </div>
      </div>
    );
  }
});

module.exports = CardPopView;
