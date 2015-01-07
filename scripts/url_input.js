/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Rectangle = require('./utils/rectangle'),
  Actions = require('./actions');

var UrlInput = React.createClass({
  getInitialState: function() {
    return {inputValue: ''};
  },

  handleSubmit: function(event) {
    event.preventDefault();

    var text = this.state.inputValue;

    //abort if empty
    if(text === '') {
      return;
    }

    var encodedUrl = encodeURIComponent(text);
    var embedAPIss = "https://api.embed.ly/1/oembed?key=63048684984941079d74082f802d80cb&url=" + encodedUrl;

    $.getJSON(embedAPIss)
      .done(function( data ) {
        this.handleUrlSubmit({
          title: data.title,
          content: data.description,
          htmlUrl: text,  //todo, escape this
          imgUrl: data.thumbnail_url,
          type: 'MonkeyImageText'
        });
      }.bind(this));


    this.setState({
      inputValue: ''
    });
  },

  handleUrlSubmit: function(cardInfo) {
    //persist to server
    Actions.createCard(cardInfo);

    var cards = this.state.cards || [];
    var cardsCopy = cards.slice(0); //todo, shallow copy
    cardsCopy.push(cardInfo);
    this.setState({
      cards: cardsCopy
    }, function(){
      // console.log('this.state', this.state);
    }.bind(this));
  },

  onInputChange: function(event){
    this.setState({
      inputValue: event.target.value
    });
  },

  addTextCard: function(){
    var textCardInfo = {
      title: 'your card title',
      content: 'your card content',
      type: 'MonkeyText'
    };
    Actions.createCard(textCardInfo);
  },

  render: function() {
    var left = (
      <form onSubmit={this.handleSubmit}>
        <input
          className="card-url-input"
          type="text"
          placeholder="Enter URL here"
          value={this.state.inputValue}
          onChange={this.onInputChange} />
        <RB.Button type="submit">Add a website</RB.Button>
      </form>
    );

    var right = (
      <RB.Button onClick={this.addTextCard}>
        Add a paragraph
      </RB.Button>
    );

    var newCard = (
      <RB.Col
        md={6}
        className='card-container'
        onClick={this.onClickNewCard}>
        <Rectangle
          left={left}
          right={right} />
      </RB.Col>
    );

    return newCard;
  }
});

module.exports = UrlInput;
