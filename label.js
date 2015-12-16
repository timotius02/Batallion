var React = require('react-native');
var { Icon } = require('react-native-icons');
var colors = require('./colors');

var { 
	StyleSheet,
	View,
	Text
} = React;

var styles = StyleSheet.create({
	label: {
		height: 50,
		flexDirection: 'row',

	},
	content: {
		flex: 5,
		marginTop: 15
	},
	icon: {
		height: 50,
		width: 50
	}
});

var Label = React.createClass({
	render: function() {
		return (
			<View style={styles.label}>
				<Icon
				  name={this.props.icon}
				  size={20}
				  color={colors.BLACK}
				  style={styles.icon}
				/>
				<Text style={styles.content}>{this.props.name}</Text>
			</View>
		);
	}
});

module.exports = Label;