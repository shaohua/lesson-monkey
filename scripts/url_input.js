/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap');

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
        this.props.onUrlSubmit({title: data.title, text: data.description, provider_url: data.provider_url, thumbnail_url: data.thumbnail_url});
      }.bind(this));


    this.setState({
      inputValue: ''
    });
    return false;
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
              <RB.Col xs={12} className='card-col'>
                <form onSubmit={this.handleSubmit}>
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
