/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap');

var HomeTopic = React.createClass({
 
 
  onClickhomeTopic: function(){
    console.log('onClickhomeTopic');
  },

  render: function(){
    var homeTopic = this.props.homeTopic,
      homeTopicId = this.props.homeTopicId;

    return (
      <div
        onClick={this.onClickhomeTopic}
        className="col-lg-3 col-md-3 homeTopic-wrapper">
            <div className="homeTopic-inner-block">
                <img
                  src={homeTopic.imgUrl}
                  className="homeTopic-image"/>
                <div className="homeTopic-inner-title">
                    <h4>{homeTopic.title}</h4>
                </div>
                <div className="homeTopic-inner-content">
                  {homeTopic.content}
                </div>
            </div>
      </div>
    );
  }
});

module.exports = HomeTopic;
