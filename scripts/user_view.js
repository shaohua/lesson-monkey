/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Folders = require('./folders'),
  ProfileCard = require('./profile_card'),
  Store = require('./store'),
  Actions = require('./actions');

var UserView = React.createClass({
  getInitialState: function(){
    return {};
  },

  render: function() {
    return (
      <RB.Grid className='main'>
        <RB.Row>
          <RB.Col sm={2} className="ln-column-left">
            <ProfileCard />
          </RB.Col>
          <RB.Col sm={10} className="ln-column-right">
            <RB.Row>
              <RB.Col sm={3}>
                <Folders
                  params={this.props.params}
                  data={this.props.data}/>
              </RB.Col>
              <RB.Col sm={9}>
                <this.props.activeRouteHandler data={this.props.data}/>
              </RB.Col>
            </RB.Row>
          </RB.Col>
        </RB.Row>
      </RB.Grid>
    );
  }
});

module.exports = UserView;
