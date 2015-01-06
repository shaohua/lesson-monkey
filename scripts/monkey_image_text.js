/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap');

var MonkeyImageText = React.createClass({
  render: function(){
    var card = this.props.card;
    return (
      <RB.Row>
        <RB.Col xs={12}>
          Image With Text
        </RB.Col>
      </RB.Row>
    );
  }
});

module.exports = MonkeyImageText;
