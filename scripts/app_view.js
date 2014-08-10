/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Header = require('./header'),
  Link = ReactRouter.Link,
  ProfileCard = require('./profile_card'),
  Store = require('./store'),
  Actions = require('./actions');

var _getStateFromStore = function(myStore){
  //myStore is NO longer a Backbone model
  // console.log('myStore', myStore);
  return {
    user: myStore.user,
    folders: myStore.folders || [],
    cards: myStore.cards || []
  };
};

var AppView = React.createClass({
  getInitialState: function(){
    return {};
  },

  _onRefreshState: function(myStore){
    this.setState( _getStateFromStore(myStore.val()), function(){
      console.log('_onRefreshState', this.state);
    }.bind(this) );
  },

  componentWillMount: function(){
    Actions.auth();
  },

  componentDidMount: function(){
    Store.then(function(myStore){
      myStore.firebase.on('value', this._onRefreshState);
    }.bind(this));
  },

  //unbind events
  componentWillUnmount: function(){
    Actions.offFirebase();
    Store.then(function(myStore){
      myStore.firebase.off('value', this._onRefreshState);
    }.bind(this));
  },

  render: function() {
    var user = this.state.user || '';
    return (
      <div>
        <Header user={this.state.user}/>
        <RB.Grid className='main'>
          <RB.Row>
            <RB.Col sm={12}>
              <this.props.activeRouteHandler data={this.state}/>
            </RB.Col>
          </RB.Row>
        </RB.Grid>
      </div>
    );
  }

});

module.exports = AppView;
