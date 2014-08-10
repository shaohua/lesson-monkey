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

  render: function() {
    var cards = this.props.data && this.props.data.cards;
    // var fakeCard = {
    //   id: '1',
    //   title: 'How to set up a WordPress blog',
    //   content: 'WordPress is well-known for its ease of installation. Under most circumstances, installing WordPress is a very simple process and takes less than five minutes to complete. ',
    //   imgUrl: 'http://static1.businessinsider.com/image/4fed86f0eab8ea8e6e000014-1200/the-pythagorean-theorem.jpg',
    //   htmlUrl: ''
    // };
    // var fakeCards = [fakeCard, fakeCard, fakeCard, fakeCard];
    cards = _.map(cards, function(card){
      return (<Card cardId={card.id} card={card} />);
    });



    return (
      <RB.Row>
        <RB.Col sm={12}>
          <UrlInput />
          {cards}
        </RB.Col>
      </RB.Row>
    );
  }
});

module.exports = FolderView;
