/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Navigation = ReactRouter.Navigation,
  RB = require('react-bootstrap');

var Card = React.createClass({
  mixins: [Navigation],

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
    this.transitionTo(nextRoute);
  },

  render: function(){
    var card = this.props.card,
      cardId = this.props.cardId;

    var colorClass = this.getRandomBgColor();

    return (
      <div
        draggable="true"
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onClick={this.onClickCard}
        className="col-lg-6 col-md-6">
        <div className="panel panel-success card-panel">
          <div className="panel-body card-panel-body">
            <RB.Row className='card-row'>

              <RB.Col xs={12} className="two-squares">

                <div className={"square " + colorClass}>
                  <div className="square-inner-center">
                    <img
                      src={card.imgUrl}
                      className="img-responsive"/>
                  </div>
                </div>

                <div className="square">
                  <div className="square-inner-left">
                    <h5>
                      {card.title.substring(0,10) + '..'}
                    </h5>
                    <div>
                      {card.content.substring(0,60) + '..'}
                    </div>
                    <div className='card-right-bottom-col'>
                      <a href={card.htmlUrl} target='_blank'>
                        Read Original Article
                      </a>
                    </div>
                  </div>
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
