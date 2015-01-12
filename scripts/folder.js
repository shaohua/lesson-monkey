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

  //https://github.com/MrRio/jsPDF/blob/master/jspdf.plugin.addhtml.js
  //https://github.com/MrRio/jsPDF/issues/339
  exportPdf: function(){
    // console.log('exportPdf');
    var doc = new jsPDF('landscape', 'pt', 'letter');
    var options = {
      pagesplit: true
    };
    var source = $('.folder-detail')[0];
    var specialElementHandlers = {
      '.hidden-for-pdf': function(element, renderer){
        return true;
      }
    };

    doc.addHTML(
      source,
      0,
      0,
      options,
      function(){
        doc.save('dataurl');
      }
    );

  },

  exportPdfManual: function(){
    var doc = new jsPDF('landscape', 'pt', 'letter');

    var html2canvasP = function(element, options){
      var dfd = $.Deferred();
      var optionsP = _.extend({}, options, {
        onrendered: function(canvas) {
          dfd.resolve(canvas);
        }
      });

      html2canvas(element, optionsP);

      return dfd.promise();
    };

    var promises = [];
    $('.card-container').each(function(index, element){
      promises.push(html2canvasP(element));
    });

    //jQuery helper
    var all = function(deferreds) {
      var deferred = new jQuery.Deferred();
      $.when.apply(jQuery, deferreds).then(
        function() {
          deferred.resolve(Array.prototype.slice.call(arguments));
        },
        function() {
          deferred.fail(Array.prototype.slice.call(arguments));
        });

      return deferred;
    };

    var imagePromises = [];
    all(promises).then(function(images) {
      imagePromises = _.map(images, function(imageCanvasData){
        var dfd = $.Deferred();

        imageCanvasData.toBlob(function(blob){
          var img = new Image();
          var urlCreator = window.URL || window.webkitURL;
          img.src = urlCreator.createObjectURL(blob);
          img.onload = function(){
            dfd.resolve(img);
          };
        });

        return dfd;
      });

      all(imagePromises).then(function(images){
        _.each(images, function(image){
          doc.addPage();
          doc.addImage(image, 0, 0, image.width, image.height);
        });

        //finally output
        doc.save('myPdf.pdf');
      });
    });

    // html2canvasP(document.body).then(function(canvas){
    //   // https://github.com/MrRio/jsPDF/issues/339
    //   canvas.toBlob(function(blob){
    //     var img = new Image();
    //     var urlCreator = window.URL || window.webkitURL;
    //     img.src = urlCreator.createObjectURL(blob);
    //     img.onload = function(){
    //       var pdf = new jsPDF('l', 'pt', [img.height, img.width]);
    //       pdf.addImage(img, 0, 0, img.width,img.height);
    //       pdf.save('myPdf.pdf');
    //     };
    //   });

    // });


  },

  render: function(){
    var cx = React.addons.classSet;
    var classes = cx({
      'list-group-item': true,
      'list-group-item-success': this.state.isDropSuccess,
      'active': (this.props.activeFolderIndex === this.props.domIndex)
    });

    var folderUrl = '/' + this.props.userId +
                    '/folder/' + this.props.domIndex;

    return (
      <Link to={folderUrl}
        onDragEnter={this.preventDefault}
        onDragOver={this.preventDefault}
        onDrop={this.onDrop}
        className={classes}>
          <RB.Glyphicon glyph="folder-open" />&nbsp;
          <RB.Glyphicon onClick={this.toggleFolderEditable} glyph="edit" />&nbsp;
          <RB.Glyphicon onClick={this.exportPdfManual} glyph="cloud-download" />&nbsp;
          <InputEditable
            isEditable={this.state.isFolderEditable}
            onChange={this.editFolderName}
            text={this.props.folderName}/>
      </Link>
    );
  }
});

module.exports = Folder;
