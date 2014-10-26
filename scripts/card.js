/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap');

var Card = React.createClass({
  onDragStart: function(event){
    var dragData = this.props.cardId;
    event.dataTransfer.setData('text', dragData);
  },

  onDragEnd: function(event){
    //todo, delete card after drag end and a success drop
    // console.log('onDragEnd');
  },

  getRandomBgColor: function(){
    var bgColorList = ['green-sea', 'nephritis', 'belize-hole', 'wisteria', 'midnight-blue'];
    return _.sample(bgColorList);
  },

  onClickCard: function(){
    //todo
    //get everything from route
    var nextRoute = '/user/' + this.props.params.userId +
      '/folder/' + this.props.card.folderIndex +
      '/card/' + this.props.card.id;
    ReactRouter.transitionTo(nextRoute);
  },

  render: function(){
    var card = this.props.card,
      cardId = this.props.cardId;

    var rowClass = 'card-row ' + this.getRandomBgColor();

    return (
      <div
        draggable="true"
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onClick={this.onClickCard}
        className="col-lg-6 col-md-6">
        <div className="panel panel-success card-panel">
          <div className="panel-body card-panel-body">
            <RB.Row className={rowClass}>
              <RB.Col xs={6} className='card-col card-left-col'>
                <img
                  src={card.imgUrl}
                  className="img-responsive"/>
              </RB.Col>
              <RB.Col xs={6} className='card-col card-right-col'>
                <div>
                  <h5>{card.title.substring(0,10) + '..'}</h5>
                </div>
                <div>
                  {card.content.substring(0,60) + '..'}
                </div>
                <div className='card-right-bottom-col'>
                  <a href={card.htmlUrl} target='_blank'>
                    Read Original Article
                  </a>
                </div>
              </RB.Col>
            </RB.Row>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Card;
