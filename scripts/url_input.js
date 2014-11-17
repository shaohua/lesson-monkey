/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Actions = require('./actions');

var UrlInput = React.createClass({
  getInitialState: function() {
    return {inputValue: ''};
  },

  handleSubmit: function() {
    var text = this.state.inputValue;
    var encodedUrl = encodeURIComponent(text);
    var embedAPIss = "https://api.embed.ly/1/oembed?key=63048684984941079d74082f802d80cb&url=" + encodedUrl;

    $.getJSON(embedAPIss)
      .done(function( data ) {
        this.handleUrlSubmit({
          title: data.title,
          content: data.description,
          htmlUrl: data.provider_url,
          imgUrl: data.thumbnail_url
        });
      }.bind(this));


    this.setState({
      inputValue: ''
    });
    return false;
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

  render: function() {
    var newCard = (
      <div
        onClick={this.onClickNewCard}
        className="col-lg-6 col-md-6">
        <div className="panel panel-success card-panel">
          <div className="panel-body card-panel-body">
            <RB.Row className='card-row'>
              <RB.Col xs={12} className="two-squares">
                <div className="square" />
                <div className="square" />

                <form
                  className='form-url-input'
                  onSubmit={this.handleSubmit}>
                  <input
                    className="card-url-input"
                    type="text"
                    placeholder="Enter URL here"
                    value={this.state.inputValue}
                    onChange={this.onInputChange} />
                  <RB.Button type="submit">Add URL</RB.Button>
                </form>

              </RB.Col>
            </RB.Row>
          </div>
        </div>
      </div>
    );

    return newCard;
  }
});

module.exports = UrlInput;
