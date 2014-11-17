/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap');

var MailingList = React.createClass({
  getInitialState: function(){
    return {};
  },

  render: function() {
    return (
      <div id="mc_embed_signup">
        <form action="//howtox.us2.list-manage.com/subscribe/post?u=47d8867b2353c9e307284a618&amp;id=c3ae16e3c4" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
          <div>
            <input type="email" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required/>
            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button btn"/>
          </div>
          <div className="hidden-input">
            <input type="text" name="b_47d8867b2353c9e307284a618_c3ae16e3c4" tabindex="-1" value=""/>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = MailingList;
