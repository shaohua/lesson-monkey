/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap');

var CardPopView = React.createClass({
  getRandomBgColor: function(){
    var bgColorList = ['green-sea', 'nephritis', 'belize-hole', 'wisteria', 'midnight-blue'];
    return _.sample(bgColorList);
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
    );
  }
});

module.exports = CardPopView;
