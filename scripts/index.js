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
  Link = ReactRouter.Link;

$(document).ready(function(){
  React.renderComponent((
    <Routes>
      <Route handler={AppView}>
        <Route name="user" path="/user/:userName" handler={UserView}>
          <Route name="folder" path="/user/:userName/folder/:folderName" handler={FolderView}/>
        </Route>
        <Route name="folderPop" path="/folder/:folderName/card/:cardId" handler={FolderPopView}>
        </Route>
        <Route name="home" path="/home" handler={HomeView}>
        </Route>
      </Route>
    </Routes>
  ), $('#main-app')[0]);
});

