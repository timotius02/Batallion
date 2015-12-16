var React = require('react-native');
var colors = require('./colors');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');


Parse.initialize('IklFPIK6sdxZxJJLpQL5g9Ni8jP1vyC1xyzjb1JR','30nwQuWCPXd9KqFCezpWBeKRKlF3XlHW69FJmHRP');

var { 
	ListView, 
	Text, 
	View,
	StyleSheet,
	TouchableNativeFeedback
} = React;
var testData = [{
	timePosted: '3m',
	content: 'Hello World Hello World Hello World ',
	upvotes: 29
},{
	timePosted: '3m',
	content: 'Hello World',
	upvotes: 29
}, {
	timePosted: '3m',
	content: 'Hello World',
	upvotes: 29
},{
	timePosted: '3m',
	content: 'Hello World',
	upvotes: -4
},{
	timePosted: '3m',
	content: 'Hello World',
	upvotes: 29
},{
	timePosted: '3m',
	content: 'Hello World',
	upvotes: 29
}];

var styles = StyleSheet.create({
	post: {
		flex: 1,
		flexDirection: 'row',
		paddingTop: 15,
		paddingBottom: 15
	},
	posts: {
		
	},
	timePosted: {
		fontSize: 16,
		textAlign: 'center',
		flex: 1
	},
	content: {
		fontSize: 16,
		textAlign: 'center',
		flex: 3
	},
	upvotes: {
		fontSize: 16,
		textAlign: 'center',
		flex: 1,
		fontWeight: '500'
	},
	container: {
		flex: 1
	}
});

var Post = React.createClass({
	_transition: function() {
		this.props.navigator.push({name: 'comments', post: this.props.post});
	},
	render: function() {
		var now = new Date();
		var upvoteColor = this.props.post.upvotes >= 0 ? colors.GREEN : colors.RED;
		var diff = (new Date(now.getTime() + now.getTimezoneOffset() * 60000)) - this.props.post.createdAt.getTime(); 
		
		var content;
		if (diff > 1000*60*60*24) {
			content = Math.floor(diff / (1000*60*60*24)) + ' d';
		}
		else if (diff > 1000*60*60) {
			content = Math.floor(diff / (1000*60*60)) + ' h';
		}
		else {
			content = Math.floor(diff / (1000 * 60)) + ' m';
		}
		return (
			<TouchableNativeFeedback 
					onPress={this.props.openDrawer}
					background={TouchableNativeFeedback.SelectableBackgroundBorderless() }>
			<View style={styles.post}>
				<Text style={styles.timePosted}>{content}</Text>
				<Text style={styles.content}>{this.props.post.content}</Text>
				<Text style={[styles.upvotes, { color: upvoteColor }]}>{this.props.post.upvotes}</Text>
			</View>
			</TouchableNativeFeedback>
		)
	}
});

var Posts = React.createClass({
	mixins: [ParseReact.Mixin],
	getInitialState: function() {
		var dataSource = new ListView.DataSource({
		    rowHasChanged: (r1, r2) => r1.id !== r2.id
		 });
   		return {
      		dataSource: dataSource,
	      	isLoading: true
	    }
    },

    observe: function(props, state) {
    	// Subscribe to all Comment objects, ordered by creation date
    	// The results will be available at this.data.posts
      	var posts =  (new Parse.Query('Posts')).descending('createdAt');

    	return state.isLoading ?  { posts: posts } : null;
  	},

    renderLoadingView: function() {
	    return (
	      	<View style={styles.container}>
	        	<Text>
	          		Loading posts...
	        	</Text>
	    	</View>
	    )
	},
	renderPost: function(post) {
		return <Post post={post} navigator={this.props.navigator}/>;
	},
	componentDidUpdate: function(prevProps, prevState) {
	  	if (prevState.isLoading && (this.pendingQueries().length == 0)) {
	  		var data = this.data.posts.filter((val, index) => {
				if (this.props.category === 'nearby') {
					return true;
				}
				else if (this.props.category === 'battalion') {
					return val.upvotes > 15 && val.upvotes < 35 ;
				}
				else if (this.props.category === 'mostViewed') {
					return val.upvotes > 20;
				}
	      	});

	    	this.setState({
	    		isLoading: false,
	    		dataSource: this.state.dataSource.cloneWithRows(data)
	    	});
	  	}
	},
    render: function() {
    	if (this.state.isLoading) {
	      	return this.renderLoadingView();
	    }
	    else {
	    	return (
				<ListView
			        dataSource={this.state.dataSource}
			        renderRow={this.renderPost}
			     />
	    	)
	    }

    }
});


module.exports = Posts;



