/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RouteHandler = ReactRouter.RouteHandler,
  RB = require('react-bootstrap'),
  Folders = require('./folders'),
  ProfileCard = require('./profile_card'),
  Store = require('./store'),
  Actions = require('./actions');

var UserView = React.createClass({
  mixins: [ ReactRouter.State ],

  getInitialState: function(){
    return {};
  },

  render: function() {
    return (
      <RB.Row>
        <RB.Col sm={3}>
          <Folders
            params={this.getParams()}
            data={this.props.data}/>
        </RB.Col>
        <RB.Col sm={9}>
          <RouteHandler data={this.props.data}/>
        </RB.Col>
      </RB.Row>
    );
  }
});

module.exports = UserView;
