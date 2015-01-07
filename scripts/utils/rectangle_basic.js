/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react');

var RectangleBasic = React.createClass({
  render: function(){
    return (
      <div className='rectangle'>
        <div className='content'>
          {this.props.content}
        </div>
      </div>
    );
  }
});

module.exports = RectangleBasic;
