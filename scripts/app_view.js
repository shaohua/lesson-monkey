/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Header = require('./header'),
  Link = ReactRouter.Link,
  Store = require('./store'),
  Actions = require('./actions');

var _getStateFromStore = function(myStore){
  //myStore is NO longer a Backbone model
  // console.log('myStore', myStore);
  return {
    user: myStore.user
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
    var mainDiv = (
      <RB.Grid className='main'>
        <RB.Row>
          <RB.Col sm={3} className="gs-column-groups">
            left
          </RB.Col>
          <RB.Col sm={9} className="gs-column-repos col-sm-offset-3">
            right
            <this.props.activeRouteHandler/>
          </RB.Col>
        </RB.Row>
      </RB.Grid>
    );

    if(this.state.user) {
      return (
        <div>
          <Header user={this.state.user}/>
          {mainDiv}
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          {mainDiv}
        </div>
      );
    }
  }
});

module.exports = AppView;
