//https://github.com/facebook/react/blob/master/docs/_js/live_editor.js
var IS_MOBILE = require('./browser_tools').isMobile();

var CodeMirrorEditor = React.createClass({
  componentDidMount: function() {
    if (IS_MOBILE) return;

    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
      mode: 'text/x-java',
      lineNumbers: false,
      lineWrapping: true,
      smartIndent: true,
      matchBrackets: true,
      theme: 'monokai',
      readOnly: this.props.readOnly
    });
    this.editor.on('change', this.handleChange);
  },

  componentDidUpdate: function() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  },

  handleChange: function() {
    if (!this.props.readOnly) {
      this.props.onChange && this.props.onChange(this.editor.getValue());
    }
  },

  render: function() {
    // wrap in a div to fully contain CodeMirror
    var editor;

    if (IS_MOBILE) {
      editor = <pre style={{overflow: 'scroll'}}>{this.props.codeText}</pre>;
    } else {
      editor = <textarea ref="editor" defaultValue={this.props.codeText} />;
    }

    return (
      <div style={this.props.style} className={this.props.className}>
        {editor}
      </div>
    );
  }
});

module.exports = CodeMirrorEditor;
