/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap');

var MonkeyText = React.createClass({
  render: function(){
    var card = this.props.card;
    return (
      <RB.Row>
        <RB.Col xs={12}>
          MonkeyText
        </RB.Col>
      </RB.Row>
    );
  }
});

module.exports = MonkeyText;
