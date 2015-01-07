/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Rectangle = require('./utils/rectangle'),
  RB = require('react-bootstrap');

var MonkeyImageText = React.createClass({
  getRandomBgColor: function(){
    var bgColorList = ['green-sea', 'nephritis', 'belize-hole', 'wisteria', 'midnight-blue'];
    return _.sample(bgColorList);
  },

  render: function(){
    var card = this.props.card;

    var colorClass = this.getRandomBgColor();

    var left = (
      <img
        src={card.imgUrl}
        className="img-responsive"/>
    );
    var right = (
      <div className='card-right'>
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
    );

    //colorClass

    return (
      <Rectangle
        leftBgColor={colorClass}
        left={left}
        right={right} />
    );
  }
});

module.exports = MonkeyImageText;
