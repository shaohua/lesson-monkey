/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Link = ReactRouter.Link,
  Actions = require('./actions');

var Header = React.createClass({
  onLogin: function(event){
    Actions.authLogin();
    event.preventDefault();
  },

  onLogout: function(event){
    Actions.authLogout();
    event.preventDefault();
  },

  render: function(){
    var logoText = "LessonMonkey",
    loginButton = <a href="/" onClick={this.onLogin}>Login</a>,
    logoutButton = <a href="/" onClick={this.onLogout}>Logout</a>;


    var linkToProfile, userId;
    if(this.props.user) {
      userId = this.props.user.id;
      linkToProfile = (<Link to='user' params={{userId: userId }}>
                        {userId}
                       </Link>);
    }

    return (
      <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">{logoText}</Link>
          </div>

          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                {this.props.user ? linkToProfile : ''}
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                {this.props.loggedIn ? logoutButton : loginButton}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;
