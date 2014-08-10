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
    var mainDiv = (
      <RB.Grid className='main'>
        <RB.Row>
          <RB.Col sm={2} className="ln-column-left">
            <ul className="list-group">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </RB.Col>
          <RB.Col sm={10} className="ln-column-right">
            <this.props.activeRouteHandler data={this.state}/>
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
