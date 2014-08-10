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
                <h2>{card.title}</h2>
              </div>
              <div>
                {card.content}
              </div>
              <div className='card-right-bottom-col'>
                <span className="icon icon-edit"></span>
                <span>&nbsp;</span>
                <a href={card.htmlUrl} target='_blank'>
                  Read Original Article
                </a>
              </div>
            </RB.Col>
            <div className="card-nav-prev">
              <span className="icon icon-left-nav"></span>
            </div>
            <div className="card-nav-next">
              <span className="icon icon-right-nav"></span>
            </div>
          </RB.Row>
        </div>
      </div>
    );
  }
});

module.exports = CardPopView;
