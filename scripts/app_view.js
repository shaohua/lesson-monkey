/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Header = require('./header'),
  Link = ReactRouter.Link,
  CurrentPath = ReactRouter.CurrentPath,
  ProfileCard = require('./profile_card'),
  HomeView = require('./home_view'),
  Store = require('./store'),
  Actions = require('./actions');

var _getStateFromStore = function(myStore){
  //myStore is NO longer a Backbone model
  // console.log('myStore', myStore);
  return {
    user: myStore.user || '',
    folders: myStore.folders || [],
    cards: myStore.cards || [],
    loggedIn: myStore.loggedIn || false
  };
};

var AppView = React.createClass({
  mixins: [ CurrentPath ],

  getInitialState: function(){
    return {};
  },

  _onRefreshState: function(myStore){
    this.setState( _getStateFromStore(myStore.val()), function(){
      // console.log('_onRefreshState', this.state);
    }.bind(this) );
    this.checkEditable();
  },

  getUserIdFromCurrentPath: function(){
    var currentPath = this.getCurrentPath();
    var matchedUserIdRe = currentPath.match('^\/([^\/]+)');
    return matchedUserIdRe && matchedUserIdRe[1];
  },

  //switch between the editable store and
  //the read-only pseudo store
  checkEditable: function(){
    var userIdFromCurrentPath = this.getUserIdFromCurrentPath();
    var isEditable = ( '' + userIdFromCurrentPath ===
                       '' + (this.state.user && this.state.user.id) );

    this.setState({
      isEditable: isEditable
    });

    return isEditable;
  },

  useReadOnlyStoreOrNot: function(){
    //need the value of isEditable coz setState is async
    var isEditable = this.checkEditable();
    var userIdFromCurrentPath = this.getUserIdFromCurrentPath();

    if(userIdFromCurrentPath && !isEditable) {
      var FirebaseModel = Backbone.Firebase.Model.extend({
        firebase: "https://learnot.firebaseIO.com/people/" + userIdFromCurrentPath
      });

      var readonlyStore = new FirebaseModel();
      readonlyStore.firebase.on('value', function(storeSnap){
        var nextState = storeSnap.val();
        nextState.loggedIn = false; //force showing logged out, todo, refactor
        this.setState( nextState );
      }.bind(this));
    }
  },

  componentWillMount: function(){
    Actions.auth();
    this.useReadOnlyStoreOrNot();
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
        <Header
          loggedIn={this.state.loggedIn}
          user={user}/>
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
