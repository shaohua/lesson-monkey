/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Folder = require('./folder'),
  Actions = require('./actions');

var Folders = React.createClass({
  createFolder: function(event){
    Actions.createFolder();
    event.preventDefault();
  },

  render: function(){
    var folders = this.props.data.folders;
    var allFolders = _.map(folders, function(folder, index){
      return <Folder
        domIndex={index}
        activeFolderIndex={this.props.folderIndex}
        folderName={folder.name}
        userId={this.props.params.userId}/>;
    }, this);
    return (
      <div className="list-group">
        <a href="/"
          onClick={this.createFolder}
          className="list-group-item">
          <span className="icon icon-plus"></span> New Lesson
        </a>
        {allFolders}
      </div>
    );
  }
});

module.exports = Folders;
