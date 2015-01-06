/** @jsx React.DOM */
/* global ReactRouter */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  AppView = require('./app_view'),
  UserView = require('./user_view'),
  FolderView = require('./folder_view'),
  FolderPopView = require('./folder_pop_view'),
  HomeView = require('./homepage/home_view'),
  Route = ReactRouter.Route,
  DefaultRoute = ReactRouter.DefaultRoute,
  Actions = require('./actions');

$(document).ready(function(){
  var routes = (
    <Route name="app" path="/" handler={AppView}>
      <DefaultRoute handler={HomeView} />
      <Route name="user" path="/:userId" handler={UserView}>
        <Route name="folder" path="/:userId/folder/:folderName" handler={FolderView}/>
      </Route>
      <Route name="folderPop" path="/:userId/folder/:folderName/card/:cardId" handler={FolderPopView}/>
    </Route>
  );

  ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler, state) {
    Actions.updateRoute( _.pick(state, ['path', 'params', 'query']) );
    React.render(<Handler/>, $('.main-app')[0]);
  });
});
