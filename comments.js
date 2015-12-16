var React = require('react-native');
var { Icon } = require('react-native-icons');
var colors = require('./colors');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var {
	View,
	TextInput,
	Button,
	Text,
	TouchableHighlight
} = React;

var Button = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },
  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});

var Comments = React.createClass({
	render: function() {
		return (
			<View>
				<View style={styles.tabs}>
					<View style={styles.selectedTab}>
						<Text style={styles.selected}>COMMENT</Text>
					</View>
				</View>
				<TextInput
					placeholder="Want to reach out?"
				    style={{ borderColor: 'gray', borderWidth: 1, paddingTop: 30, paddingBottom: 30, backgroundColor: colors.GREY}}
				    onChangeText={(text) => this.setState({text})}
				    value={this.state.text}
				    multiline={true}
				 />
				<Button
	                onPress={this._submit.bind(this)}
	                style={styles.modalButton}>
	                <Text style={styles.buttonLabel}>Send</Text>
	            </Button>
			</View>
		)
	}
})