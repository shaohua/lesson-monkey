/** @jsx React.DOM */
var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react'),
  RB = require('react-bootstrap'),
  Button = RB.Button,
  Modal = RB.Modal,
  ModalTrigger = RB.ModalTrigger;

var MyModalDialog = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <Modal title="My Modal Dialog">
        <div className="modal-body">
          <Button onClick={this.props.onRequestHide}>Close</Button>
        </div>
      </Modal>
    );
  }
});

module.exports = MyModalDialog;
