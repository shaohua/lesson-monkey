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

  render: function(){
    var card = this.props.card,
      cardId = this.props.cardId;
    return (
      <div
        draggable="true"
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        className="col-lg-6 col-md-6">
        <div className="panel panel-success">
          <div className="panel-body">
            <RB.Row className='card-row'>
              <RB.Col xs={6} className='card-col card-left-col'>
                <img
                  src={card.avatar_url}
                  className="img-responsive"/>
              </RB.Col>
              <RB.Col xs={6} className='card-col card-right-col'>
                <div>
                  Title
                </div>
                <div>
                  Body
                </div>
                <div className='card-right-bottom-col'>
                  <a href={card.html_url} target='_blank'>
                    {card.full_name}
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
