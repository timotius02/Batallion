var React = require('react-native');
var colors = require('./colors');
var { Icon } = require('react-native-icons');

var {
	Image,
	StyleSheet,
	View,
	Text,
	TouchableNativeFeedback 
} = React;


var styles = StyleSheet.create({
	header: {
		backgroundColor: colors.GREEN,
		height: 50,
		flexDirection: 'row'
	},
	title: {
		color: colors.WHITE,
		fontWeight: '500',
		flex: 1,
		marginTop: 15,
		marginLeft: 15
	},
	menu: {
		height: 50,
		width: 50
	}
});
var Header = React.createClass({
	propTypes: {
		optionalString: React.PropTypes.string
	},
	getDefaultProps: function() {
		return {
			title: 'Title'
		}
	},
	_push: function() {
		this.props.push({name: 'maps'});
	},
	render: function() {
		return (
			<View style={styles.header}>
				<TouchableNativeFeedback 
					onPress={this.props.openDrawer}
					background={TouchableNativeFeedback.SelectableBackgroundBorderless() }>
					<View style={styles.menu} >
						<Icon
						  name='material|menu'
						  size={20}
						  color={colors.WHITE}
						  style={styles.menu}
						/>
					</View>
				</TouchableNativeFeedback>

				<Text style={styles.title}>{this.props.title}</Text>

				<TouchableNativeFeedback 
					onPress={this._push}
					background={TouchableNativeFeedback.SelectableBackground()}>
					<View style={styles.menu}>
						<Icon
						  name='material|gps'
						  size={20}
						  color={colors.WHITE}
						  style={styles.menu}
						/>
					</View>
				</TouchableNativeFeedback>

			</View>
		)
	}
});

module.exports = Header;