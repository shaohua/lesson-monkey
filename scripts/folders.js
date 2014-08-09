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
        folderName={folder.name}/>;
    }, this);
    return (
      <div className="list-group">
        <a href="/"
          onClick={this.createFolder}
          className="list-group-item">
          <RB.Glyphicon glyph="plus" /> Create a new folder
        </a>
        {allFolders}
      </div>
    );
  }
});

module.exports = Folders;
