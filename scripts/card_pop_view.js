/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  ContentEditable = require('./content_editable'),
  Actions = require('./actions'),
  RB = require('react-bootstrap');

var CardPopView = React.createClass({
  getRandomBgColor: function(){
    var bgColorList = ['green-sea', 'nephritis', 'belize-hole', 'wisteria', 'midnight-blue'];
    return _.sample(bgColorList);
  },

  onNavPrev: function(){
    var prevRoute = '/user/' + this.props.userId +
      '/folder/' + this.props.card.folderIndex +
      '/card/' + this.props.prevCardId;
    ReactRouter.transitionTo(prevRoute);
  },

  onNavNext: function(){
    var nextRoute = '/user/' + this.props.userId +
      '/folder/' + this.props.card.folderIndex +
      '/card/' + this.props.nextCardId;
    ReactRouter.transitionTo(nextRoute);
  },

  onCardEdit: function(){
    console.log('onCardEdit');
  },

  handleTitleChange: function(event){
    var cardCopy = JSON.parse(JSON.stringify(this.props.card));
    cardCopy.title = event.target.value;
    Actions.updateCard(cardCopy);
  },

  handleContentChange: function(event){
    var cardCopy = JSON.parse(JSON.stringify(this.props.card));
    cardCopy.content = event.target.value;
    Actions.updateCard(cardCopy);
  },

  render: function(){
    var card = this.props.card,
      cardId = this.props.cardId;

    var rowClass = 'card-row ' + this.getRandomBgColor();

    return (
      <div className="panel panel-success card-panel">
        <div className="panel-body card-panel-body">
          <RB.Row className={rowClass}>
            <RB.Col xs={6} className='card-col card-left-col'>
              <div className="square">
                <div className="square-inner">
                  <span className="square-inner-helper"></span>
                  <img src={card.imgUrl}/>
                </div>
              </div>
            </RB.Col>
            <RB.Col xs={6} className='card-col card-right-col'>
              <div>
                <h1>
                  <ContentEditable
                    html={card.title}
                    onChange={this.handleTitleChange} />
                </h1>
              </div>
              <div>
                <ContentEditable
                  html={card.content}
                  onChange={this.handleContentChange} />
              </div>
              <div className='card-right-bottom-col'>
                <span
                  onClick={this.onCardEdit}
                  className="icon icon-edit"></span>
                <span>&nbsp;</span>
                <a href={card.htmlUrl} target='_blank'>
                  Read Original Article
                </a>
              </div>
            </RB.Col>
            <div
              onClick={this.onNavPrev}
              className="card-nav-prev">
              <span className="icon icon-left-nav"></span>
            </div>
            <div
              onClick={this.onNavNext}
              className="card-nav-next">
              <span className="icon icon-right-nav"></span>
            </div>
          </RB.Row>
        </div>
      </div>
    );
  }
});

module.exports = CardPopView;
