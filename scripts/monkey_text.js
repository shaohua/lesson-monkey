/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap');

var MonkeyText = React.createClass({
  getRandomBgColor: function(){
    var bgColorList = ['green-sea', 'nephritis', 'belize-hole', 'wisteria', 'midnight-blue'];
    return _.sample(bgColorList);
  },

  render: function(){
    var card = this.props.card;

    var colorClass = this.getRandomBgColor();

    return (
      <RB.Row>

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
                  <span className="icon icon-more"></span>
                </a>
              </div>
            </div>
          </div>
        </RB.Col>

      </RB.Row>
    );
  }
});

module.exports = MonkeyText;
