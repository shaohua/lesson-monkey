/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react');

var Rectangle = React.createClass({
  render: function(){
    var cx = React.addons.classSet;
    var leftObj = {
      'left': true
    };
    if(typeof this.props.leftBgColor !== 'undefined'){
      leftObj[this.props.leftBgColor] = true;
    }
    var leftClasses = cx(leftObj);

    return (
      <div className='rectangle'>
        <div className='content'>
          <div className={leftClasses}>{this.props.left}</div>
          <div className='right'>{this.props.right}</div>
        </div>
      </div>
    );
  }
});

module.exports = Rectangle;
