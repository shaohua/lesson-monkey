/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Navigation = ReactRouter.Navigation,
  ContentEditable = require('./content_editable'),
  Actions = require('./actions'),
  RB = require('react-bootstrap');

var CardPopView = React.createClass({
  mixins: [Navigation],

  getRandomBgColor: function(){
    var bgColorList = ['green-sea', 'nephritis', 'belize-hole', 'wisteria', 'midnight-blue'];
    return _.sample(bgColorList);
  },

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

    var colorClass = this.getRandomBgColor();

    return (
      <div className="panel panel-success card-panel">
        <div className="panel-body card-panel-body">
          <RB.Row className='card-row'>
            <RB.Col xs={12} className="two-squares">

              <div className={"square " + colorClass}>
                <div className="square-inner-center">
                  <img src={card.imgUrl}/>
                </div>
              </div>

              <div className="square">
                <div className="square-inner-left">
                  <h2>
                    <ContentEditable
                      isEditable={this.props.isEditable}
                      html={card.title}
                      onChange={this.handleTitleChange} />
                  </h2>
                  <div className="card-main-text">
                    <ContentEditable
                      isEditable={this.props.isEditable}
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
                </div>
              </div>

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
            </RB.Col>
          </RB.Row>
        </div>
      </div>
    );
  }
});

module.exports = CardPopView;
