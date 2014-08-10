/** @jsx React.DOM */

var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var ModalTrigger = ReactBootstrap.ModalTrigger;

var MyModalDialog = React.createClass({

    render: function() {
        return this.transferPropsTo(
            <Modal title="My Modal Dialog">
                <Button onClick={this.props.onRequestHide}>Close</Button>
            </Modal>
        );
    }
});

var modalTest = (
    <ModalTrigger modal={<MyModalDialog />}>
        <Button>Open Modal</Button>
    </ModalTrigger>
);

React.renderComponent(
    modalTest,
    document.getElementById('content')
);
