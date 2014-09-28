/** @jsx React.DOM */
/* global ReactRouter */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  AppView = require('./app_view'),
  UserView = require('./user_view'),
  FolderView = require('./folder_view'),
  FolderPopView = require('./folder_pop_view'),
  HomeView = require('./home_view'),
  Routes = ReactRouter.Routes,
  Route = ReactRouter.Route,
  DefaultRoute = ReactRouter.DefaultRoute,
  Link = ReactRouter.Link;

$(document).ready(function(){
  React.renderComponent((
    <Routes location="history">
      <Route path="/" handler={AppView}>
        <DefaultRoute handler={HomeView} />
        <Route name="user" path="/user/:userId" handler={UserView}>
          <Route name="folder" path="/user/:userId/folder/:folderName" handler={FolderView}/>
        </Route>
        <Route name="folderPop" path="/folder/:folderName/card/:cardId" handler={FolderPopView}/>
      </Route>
    </Routes>
  ), $('#main-app')[0]);
});

