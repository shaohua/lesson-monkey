/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Header = require('./header'),
  Link = ReactRouter.Link,
  HomeTopic = require('./home_topic'),
  Store = require('./store'),
  Actions = require('./actions');

var HomeView = React.createClass({
  getInitialState: function(){
    return {};
  },

  onInputChange: function(event){
    this.setState({
      inputValue: event.target.value
    });
  },

  render: function() {
 //  var cards = this.props.data && this.props.data.cards;
    var fakeHomeTopic1 = {
      id: '1',
      title: 'Android Develop in 2 Hours',
      content: 'Developing Android games has never been so easy! With our powerful Android tool kits you can build a stunning game with in 2 hours!',
      imgUrl: 'media/img_temp/android_640x480.jpg',
      htmlUrl: 'www.yahoo.com'
    };

    var fakeHomeTopic2 = {
      id: '1',
      title: 'Bash Basic',
      content: 'Everybody working on a UNIX or UNIX-like system who wants to make life easier on themselves, can benefit from this topic.',
      imgUrl: 'media/img_temp/bin_bash_640x480.png',
      htmlUrl: 'www.yahoo.com'
    };

    var fakeHomeTopic3 = {
      id: '1',
      title: 'Auto Repair at Home',
      content: 'How to convert your garage into your own auto repair shop? A quick guide to oil changes, brakes services, belts, diagnostics, and more.',
      imgUrl: 'media/img_temp/auto_repair_640x480.jpg',
      htmlUrl: 'www.yahoo.com'
    };

    var fakeHomeTopic4 = {
      id: '1',
      title: 'Everything about World Cup. ',
      content: '2014 is the year of Wold Cup. Discover the World Cup history here. The biggest soccer festival is waiting for you!',
      imgUrl: 'media/img_temp/world_cup_640x480.jpg',
      htmlUrl: 'www.yahoo.com'
    };

    var fakeHomeTopic5 = {
      id: '1',
      title: 'Our Galaxy',
      content: 'A galaxy is a massive, gravitationally bound system consisting of stars, stellar remnants, an interstellar medium of gas and dust, and dark matter.',
      imgUrl: 'media/img_temp/galaxy_640x480.jpg',
      htmlUrl: 'www.yahoo.com'
    };

    var fakeHomeTopic6 = {
      id: '1',
      title: 'Bootflat Tutorial',
      content: 'Bootflat is a free flat UI kit which is includes all the components that a complete website should contain. Working with it is easy and straightforward. You just need to download the UI kit, extract the Bootflat files and at the bottom, of your tag just paste one line of code. ',
      imgUrl: 'media/img_temp/bootflat_640x480.jpg',
      htmlUrl: 'www.yahoo.com'
    };

    var fakeHomeTopic7 = {
      id: '1',
      title: '魅力的魅力',
      content: '工作、生活、恋爱，魅力36计帮你搞定一切',
      imgUrl: 'media/img_temp/meili_640x480.png',
      htmlUrl: 'www.yahoo.com'
    };

    var fakeHomeTopic8 = {
      id: '1',
      title: 'Guitar 1,2,3',
      content: 'This post is for anyone who has thought about picking up the guitar but hasn’t yet. For those of you who aren’t musicians, becoming one is both more fun and easier than you imagine. ',
      imgUrl: 'media/img_temp/guitar_640x480.jpg',
      htmlUrl: 'www.yahoo.com'
    };


    var fakeHomeTopic99 = {
      id: '2',
      title: 'How to set up a WordPress blog',
      content: 'WordPress is well-known',
      imgUrl: 'http://static1.businessinsider.com/image/4fed86f0eab8ea8e6e000014-1200/the-pythagorean-theorem.jpg',
      htmlUrl: 'www.yahoo.com'
    };

     var fakeHomeTopics = [fakeHomeTopic1, fakeHomeTopic2,
      fakeHomeTopic3, fakeHomeTopic4, fakeHomeTopic5,
      fakeHomeTopic6, fakeHomeTopic7, fakeHomeTopic8];

    var homeTopics = _.map(fakeHomeTopics, function(homeTopic){
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
                <RB.Button type="submit" className="home-search-button">
                  <span className="icon icon-search"></span> Search
                </RB.Button>
              </form>
            </RB.Jumbotron>
          </RB.Col>
         </RB.Row>
        <RB.Row>
          <RB.Col sm={12}>
            <h2 className="home-hot-topic-title">Hot Topics: </h2>
          </RB.Col>
        </RB.Row>
        <RB.Row>
          <RB.Col sm={12}>
            {homeTopics}
          </RB.Col>
        </RB.Row>
        <RB.Row>
          <RB.Col sm={12}>
            <h2 className="home-hot-topic-title">Contact us: </h2>
          </RB.Col>
        </RB.Row>
        <RB.Row>
          <RB.Col sm={12}>
            <div>Contact us at shaohua at howtox.com</div>
          </RB.Col>
        </RB.Row>
      </div>
    );

    return mainDiv;
  }
});

module.exports = HomeView;
