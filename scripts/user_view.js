/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Folders = require('./folders'),
  Store = require('./store'),
  Actions = require('./actions');

var UserView = React.createClass({
  getInitialState: function(){
    return {};
  },

  render: function() {
    return (
      <RB.Row>
        <RB.Col sm={3}>
          <Folders
            data={this.props.data}/>
        </RB.Col>
        <RB.Col sm={9}>
          <RB.Button><RB.Glyphicon glyph="plus" /> Add card</RB.Button>
          {this.props.params}
          <this.props.activeRouteHandler data={this.props.data}/>
        </RB.Col>
      </RB.Row>
    );
  }
});

module.exports = UserView;
