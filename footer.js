var React = require('react-native');
var { Icon } = require('react-native-icons');
var colors = require('./colors');

var {
	View,
	Text,
	TouchableNativeFeedback
} = React;

var styles = {
	tabs: {
		flexDirection: 'row',
		backgroundColor: colors.GREEN
	},
	selectedTab: {
		paddingTop: 15
	},
	selected: {
		color: colors.WHITE,
		textAlign: 'center',
		fontSize: 12,
		fontWeight: '500'
	},
	button: {
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		borderRightColor: colors.WHITE,
		borderRightWidth: 2,
		borderLeftColor: colors.WHITE,
		borderLeftWidth: 2
	},
	icon: {
		height: 50,
		width: 50
	}
}
var Footer = React.createClass({
	_newPost: function() {
		this.props.navigator.push({name: 'newPost'});
	},
	_rendertab: function(path) {
		this.props.navigator.push({
	        name: path
	    });
	},
	_transition: function(name) {
		this.props.navigator.push({
	        name: name
	    });
	},
	render: function() {
		return (
			<View style={styles.tabs}>
				<TouchableNativeFeedback 
					onPress={this._transition.bind(this, 'nearBy')}
					background={TouchableNativeFeedback.SelectableBackgroundBorderless() }>
					<View style={[styles.selectedTab, {flex: 3}]}>
						<Text style={styles.selected}>Most Recent</Text>
					</View>
				</TouchableNativeFeedback>

				<TouchableNativeFeedback 
				onPress={this._newPost}
				background={TouchableNativeFeedback.SelectableBackgroundBorderless() }>
					<View style={[styles.button, {flex: 1}]}>
						<Icon
							name='material|edit'
							size={30}
							color={colors.WHITE}
							style={styles.icon}
						/>
					</View>
				</TouchableNativeFeedback>
				
				<TouchableNativeFeedback 
					onPress={this._transition.bind(this, 'mostViewed')}
					background={TouchableNativeFeedback.SelectableBackgroundBorderless() }>
					<View style={[styles.selectedTab, {flex: 3}]}>
						<Text style={styles.selected}>Most Viewed</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		);


	}
});

module.exports = Footer;

