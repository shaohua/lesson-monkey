/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Link = ReactRouter.Link,
  InputEditable = require('./input_editable'),
  Actions = require('./actions');

var Folder = React.createClass({
  getInitialState: function(){
    return {
      isDropSuccess: false,
      isFolderEditable: false
    };
  },

  componentWillReceiveProps: function(nextProps){
    // console.log('componentWillReceiveProps', nextProps);
  },

  // clear state after 1 second
  resetDropSuccess: function(){
    setTimeout(function(){
      this.setState({
        isDropSuccess: false
      });
    }.bind(this), 1000);
  },

  //need to cancel multiple events for drag-and-drop
  preventDefault: function(event){
    event.preventDefault();
  },

  onDrop: function(event){
    event.preventDefault();

    var inputData = '' + event.dataTransfer.getData('text');
    Actions.moveCard({
      folderIndex: this.props.domIndex,
      cardId: inputData
    });
    this.setState({
      isDropSuccess: true
    }, function(){
      this.resetDropSuccess();
    }.bind(this));
  },

  editFolderName: function(event){
    this.toggleFolderEditable(false);
    Actions.updateFolder({
      folderIndex: this.props.domIndex,
      folderName: event.target.value
    });
  },

  toggleFolderEditable: function(flag){
    if(typeof flag !== 'undefined'){
      this.setState({
        isFolderEditable: !!flag
      });
    }else{
      this.setState({
        isFolderEditable: !this.state.isFolderEditable
      });
    }
  },

  render: function(){
    var cx = React.addons.classSet;
    var classes = cx({
      'list-group-item': true,
      'list-group-item-success': this.state.isDropSuccess,
      'active': (this.props.activeFolderIndex === this.props.domIndex)
    });

    var folderUrl = '/' + this.props.userId +
                    '/folder/' + this.props.domIndex ;

    return (
      <Link to={folderUrl}
        onDragEnter={this.preventDefault}
        onDragOver={this.preventDefault}
        onDrop={this.onDrop}
        className={classes}>
          <RB.Glyphicon glyph="folder-open" />&nbsp;
          <RB.Glyphicon onClick={this.toggleFolderEditable} glyph="edit" />&nbsp;
          <InputEditable
            isEditable={this.state.isFolderEditable}
            onChange={this.editFolderName}
            text={this.props.folderName}/>
      </Link>
    );
  }
});

module.exports = Folder;
