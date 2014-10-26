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
  getInitialState: function(){
    return {};
  },

  componentDidMount: function(){
    Actions.updateFolderIndex(this.props.params.folderName);
  },

  render: function() {
    var cards = this.props.data && this.props.data.cards;
    // var fakeCard = {
    //   id: '1',
    //   title: 'How to set up a WordPress blog',
    //   content: 'WordPress is well-known. ',
    //   imgUrl: 'http://static1.businessinsider.com/image/4fed86f0eab8ea8e6e000014-1200/the-pythagorean-theorem.jpg',
    //   htmlUrl: ''
    // };
    var cardsInCurrentFolder = _.filter(cards, function(card){
      return card.folderIndex + '' === this.props.params.folderName + ''
    }, this);
    var cardsRendered = _.map(cardsInCurrentFolder, function(card){
      return (<Card cardId={card.id} card={card} params={this.props.params}/>);
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
