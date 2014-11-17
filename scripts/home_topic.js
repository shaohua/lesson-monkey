/** @jsx React.DOM */
/* global ReactRouter */

var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  Navigation = ReactRouter.Navigation,
  RB = require('react-bootstrap');

var HomeTopic = React.createClass({
  mixins: [ Navigation ],

  onClickhomeTopic: function(){
    // console.log('onClickhomeTopic');
    //todo
    //remove hardcoding
    this.transitionTo('folderPop', {
      userId: 'getshao',
      folderName: 0,
      cardId: 0
    });
  },

  render: function(){
    var homeTopic = this.props.homeTopic,
      homeTopicId = this.props.homeTopicId;

    return (
      <div
        onClick={this.onClickhomeTopic}
        className="col-lg-3 col-md-3 home-topic-wrapper">
            <div className="home-topic-inner-block">
                <img
                  src={homeTopic.imgUrl}
                  className="home-topic-image"/>
                <div className="home-topic-inner-title">
                    <h4>{homeTopic.title}</h4>
                </div>
                <div className="home-topic-inner-content">
                  {homeTopic.content}
                </div>
            </div>
      </div>
    );
  }
});

module.exports = HomeTopic;
