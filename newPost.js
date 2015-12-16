var React = require('react-native');
var { Icon } = require('react-native-icons');
var colors = require('./colors');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var {
	TextInput,
	View,
	Text,
	TouchableHighlight
} = React;

var styles = {
	tabs: {
		flexDirection: 'row',
		height: 40
	},
	selectedTab: {
		flex: 1,
		paddingTop: 10,
		borderBottomColor: colors.GREEN,
		borderBottomWidth: 2,
	},
	notSelectedTab: {
		flex: 1,
		paddingTop: 10,
		borderBottomColor: colors.GREY,
		borderBottomWidth: 2,
	},
	selected: {
		color: colors.GREEN,
		textAlign: 'center',
		fontSize: 12
	},
	notSelected: {
		color: colors.GREY,
		textAlign: 'center',
		fontSize: 12
	},
	modalButton: {
	    backgroundColor: colors.GREEN,
	    paddingTop: 10,
	    paddingBottom: 10,
	    paddingLeft: 20,
	    paddingRight: 20
	},
	buttonLabel: {
		marginTop: 50,
	    textAlign: 'center',
	    color: colors.WHITE
	}
}

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

var NewPost = React.createClass({
	getInitialState: function() {
		return {
			text: ''
		}
	},
	_submit: function() {
		ParseReact.Mutation.Create('Posts', {
	      content: this.state.text,
	      time: new Date(),
	      upvotes: Math.floor(Math.random() * 100),
	      poster: Parse.User.current().id
	    }).dispatch()
		.then(() => {
			this.props.navigator.push({
				name: 'nearBy'
			});
		}.bind(this));
	},
	render: function() {
		return (
			<View>
				<View style={styles.tabs}>
					<View style={styles.selectedTab}>
						<Text style={styles.selected}>NEW POST</Text>
					</View>
				</View>
				<TextInput
					placeholder="Have a question to ask the community?"
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

module.exports = NewPost;