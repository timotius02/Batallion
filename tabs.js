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
	}
}
var Tabs = React.createClass({
	_rendertab: function(path) {
		this.props.navigator.push({
	        name: path
	    });
	},
	render: function() {
		if (this.props.selected === 'nearBy') {
			return (
				<View style={styles.tabs}>
					<View style={styles.selectedTab}>
						<Text style={styles.selected}>NEAR BY</Text>
					</View>
					<TouchableNativeFeedback 
					onPress={this._rendertab.bind(this, 'yourBattalion')}
					background={TouchableNativeFeedback.SelectableBackground()}>
						<View style={styles.notSelectedTab} ><Text style={styles.notSelected}>YOUR BATTALION</Text></View>
					</TouchableNativeFeedback>
				</View>
			);
		}
		else if (this.props.selected === 'yourBattalion') {
			return (
				<View style={styles.tabs}>
					<TouchableNativeFeedback  
					onPress={this._rendertab.bind(this, 'nearBy')}
					background={TouchableNativeFeedback.SelectableBackground()}>
						<View style={styles.notSelectedTab}><Text style={styles.notSelected} >NEAR BY</Text></View>
					</TouchableNativeFeedback>

					<View style={styles.selectedTab}>
						<Text style={styles.selected}>YOUR BATALLION</Text>
					</View>
				</View>
			);
		}
		else {
			return (
				<Text>Error!</Text>
			)
		}

	}
});

module.exports = Tabs;