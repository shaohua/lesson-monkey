/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Folders = require('./folders'),
  Store = require('./store'),
  Actions = require('./actions');

var FolderView = React.createClass({
  getInitialState: function(){
    return {};
  },

  render: function() {
    console.log('data in FolderView', this.props.data);
    return (
      <RB.Row>
        <RB.Col sm={12}>
          {this.props.params.userName}
          {this.props.params.folderName}
          {this.props.data}
          <this.props.activeRouteHandler data={this.props.data}/>
        </RB.Col>
      </RB.Row>
    );
  }
});

module.exports = FolderView;
