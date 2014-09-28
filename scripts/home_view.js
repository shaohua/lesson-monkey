/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Header = require('./header'),
  Link = ReactRouter.Link,
  HomeTopic = require('./home_topic'),
  MailingList = require('./mailing_list'),
  HomeStore = require('./store_home'),
  Actions = require('./actions');

var HomeView = React.createClass({
  getInitialState: function(){
    return {};
  },

  _getStateFromStore: function(myStore){
    return {
      hotest: myStore.hotest,
    };
  },

  _onRefreshState: function(myStore){
    this.setState( this._getStateFromStore(myStore.val()) );
  },

  componentDidMount: function(){
    HomeStore.firebase.on('value', this._onRefreshState);
  },

  componentWillUnmount: function(){
  //todo
  //unbind events
  },

  onInputChange: function(event){
    this.setState({
      inputValue: event.target.value
    });
  },

  onSearch: function(event){
    event.preventDefault();
  },

  render: function() {
    var hotestCards = this.state.hotest || [];

    var homeTopics = _.map(hotestCards.slice(0,4), function(homeTopic){
      return (<HomeTopic topicId={homeTopic.id} homeTopic={homeTopic} />);
    });

    var mainDiv = (
      <div>
        <RB.Row>
          <RB.Col sm={12}>
            <RB.Jumbotron>
              <form onSubmit={this.handleSubmit} className="home-search">
                <input
                  type="text"
                  className="home-search-input"
                  placeholder="find bite-size lessons: vertically center a div, Guitar 101"
                  value={this.state.inputValue}
                  onChange={this.onInputChange} />
                <RB.Button
                  onClick={this.onSearch}
                  type="submit"
                  className="home-search-button">
                  <span className="icon icon-search"></span> Search
                </RB.Button>
              </form>
            </RB.Jumbotron>
          </RB.Col>
         </RB.Row>
        <RB.Row>
          <RB.Col sm={12}>
            <h2 className="home-hot-topic-title">Popular lessons: </h2>
          </RB.Col>
        </RB.Row>
        <RB.Row>
          <RB.Col sm={12}>
            {homeTopics}
          </RB.Col>
        </RB.Row>

        <RB.Row>
          <RB.Col sm={12}>
            <h2 className="home-hot-topic-title">New lessons: </h2>
          </RB.Col>
        </RB.Row>
        <RB.Row>
          <RB.Col sm={12}>
            newLessons
          </RB.Col>
        </RB.Row>

        <RB.Row>
          <RB.Col sm={6}>
            <RB.Row>
              <RB.Col sm={12}>
                <h2 className="home-hot-topic-title">Notify me at launch: </h2>
              </RB.Col>
            </RB.Row>
            <RB.Row>
              <RB.Col sm={12}>
                <MailingList />
              </RB.Col>
            </RB.Row>
          </RB.Col>
          <RB.Col sm={6}>
            <RB.Row>
              <RB.Col sm={12}>
                <h2 className="home-hot-topic-title">Request a lesson: </h2>
              </RB.Col>
            </RB.Row>
            <RB.Row>
              <RB.Col sm={12}>
                <h4>Where you can submit your requests.</h4>
                <ul>
                  <li>
                    How to center align a div
                  </li>
                  <li>
                    How to get started with AngularJS
                  </li>
                </ul>
              </RB.Col>
            </RB.Row>
          </RB.Col>
        </RB.Row>

        <RB.Row>
          <RB.Col sm={12}>
            <h2 className="home-hot-topic-title">&nbsp;</h2>
            <h2 className="home-hot-topic-title">&nbsp;</h2>
          </RB.Col>
        </RB.Row>
      </div>
    );

    return mainDiv;
  }
});

module.exports = HomeView;
