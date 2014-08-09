/** @jsx React.DOM */
/* global ReactRouter */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  AppView = require('./app_view'),
  UserView = require('./user_view'),
  Routes = ReactRouter.Routes,
  Route = ReactRouter.Route,
  Link = ReactRouter.Link;

$(document).ready(function(){
  React.renderComponent((
    <Routes>
      <Route handler={AppView}>
        <Route name="user" path="/user/:userName" handler={UserView}/>
      </Route>
    </Routes>
  ), $('#main-app')[0]);
});

