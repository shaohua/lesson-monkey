/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  ContentEditable = require('./content_editable'),
  RB = require('react-bootstrap');

var MonkeyText = React.createClass({
  render: function(){
    var card = this.props.card;
    return (
      <div>
        <RB.Row>
          <RB.Col xs={12}>
            <ContentEditable
              isEditable={this.props.isEditable}
              html={card.title} />
          </RB.Col>
        </RB.Row>
        <RB.Row>
          <RB.Col xs={12}>
            <ContentEditable
              isEditable={this.props.isEditable}
              html={card.content} />
          </RB.Col>
        </RB.Row>
      </div>
    );
  }
});

module.exports = MonkeyText;
