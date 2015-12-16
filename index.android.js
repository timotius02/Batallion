'use strict';

var React = require('react-native');
var Header  = require('./header');
var Tabs = require('./tabs');
var Posts = require('./posts');
var colors = require('./colors');
var SideMenu = require('react-native-side-menu');
var Label = require('./label');
var Maps = require('./maps');
var Footer = require('./footer');
var Parse = require('parse/react-native');
var NewPost = require('./newPost');
var Comments = require('./comments');

var MOCKED_REVIEW_DATA = [{
  title: 'Title',
  year: '2015',
  posters: {
    thumbnail: 'http://i.imgur.com/UePbdph.jpg'
  }
}];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var {
  AppRegistry,
  View,
  DrawerLayoutAndroid,
  BackAndroid,
  Navigator,
  Text
} = React;

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});


var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name === 'nearBy') {
    return (
      <View style={{flex: 1, backgroundColor: colors.WHITE}}>
        <Tabs selected="nearBy" navigator={navigationOperations} />
        <Posts category="nearby" navigator={navigationOperations} />
        <Footer navigator={navigationOperations} />
      </View>
    );
  } else if (route.name === 'yourBattalion') {
    return (
      <View style={{flex: 1, backgroundColor: colors.WHITE}}>
        <Tabs selected="yourBattalion" navigator={navigationOperations} />
        <Posts category="battalion" navigator={navigationOperations} />
        <Footer navigator={navigationOperations} />
      </View>
    );
  } else if (route.name === 'maps') {
    return (
      <View style={{flex: 1, backgroundColor: colors.WHITE}}>
        <Maps />
      </View>
    )
  } else if (route.name === 'newPost') {
    return (
      <View style={{flex: 1, backgroundColor: colors.WHITE}}>
        <NewPost navigator={navigationOperations}/>
      </View>
    )
  } else if (route.name === 'mostViewed') {
    return (
      <View style={{flex: 1, backgroundColor: colors.WHITE}}>
        <Tabs selected="nearBy" navigator={navigationOperations} />
        <Posts category="mostViewed" navigator={navigationOperations} />
        <Footer navigator={navigationOperations} />
      </View>
    )
  } else if (route.name === 'comments') {
    return (
      <View style={{flex: 1, backgroundColor: colors.WHITE}}>
        <Comments navigator={navigationOperations} post={route.post}/>
      </View>
    )
  }
};


var battalion = React.createClass({
  componentDidMount: function() {
    Parse.User.logIn("test", "test");
  },
  openDrawer: function() {
    this.refs['DRAWER'].openDrawer();
  },
  push: function(path) {
    var navigator = _navigator;
    navigator.push(path);
  },
  render: function() {
    var initialRoute = {name: 'nearBy'};

    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Label name="Home" icon='material|home'/>
        <Label name="Profile" icon='ion|person'/>
        <Label name="Settings" icon='material|settings'/>
        <Label name="Logout" icon='material|close'/>
      </View>
    );

    return (
      <View style={{flex: 1}}>
        <DrawerLayoutAndroid 
          ref={'DRAWER'}
          drawerWidth={200}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}>
            <Header title={{location: 'New Haven, CT'}} openDrawer={this.openDrawer} push={this.push}/>
            <Navigator
              initialRoute={initialRoute}
              configureScene={() => Navigator.SceneConfigs.FadeAndroid}
              renderScene={RouteMapper}
            />
        </DrawerLayoutAndroid>
      </View>
    );
  }
});



AppRegistry.registerComponent('battalion', () => battalion);
