var React = require('react-native');
var Mapbox = require('react-native-mapbox-gl');
var {
  AppRegistry,
  StyleSheet,
  View
} = React;

var Maps = React.createClass({
  getInitialState() {
    return {
      center: {
        latitude: 41.3138487,
        longitude: -72.9309437
      },
      annotations: [{
	        coordinates: [40.90555, -73.102812],
	        type: "point",
	        title: "Long Island State Veterans Home",
	        subtitle: "100 Patriots Rd, Stony Brook, NY 11790, US",
	        id: "marker2"
	    }, {
	        coordinates: [41.240468, -73.927061],
	        type: "point",
	        title: "The New York State Veterans Home at Montrose",
	        subtitle: "2090 Albany Post Rd, Montrose, NY 10548",
	        id: "marker3"
	    }, {
	        coordinates: [40.958962, -74.063517],
	        type: "point",
	        title: "Veterans Memorial Home",
	        subtitle: "1 Veterans Way, Paramus, NJ 107652",
	        id: "marker4"
	    },{
	        coordinates: [41.653427, -72.651094],
	        type: "point",
	        title: "Department of Veterans Affairs",
	        subtitle: "287 West Street, Rocky Hill, CT 106067",
	        id: "marker5"
	    }, {
	        coordinates: [41.329436, -72.913559],
	        type: "point",
	        title: "American Red Cross",
	        subtitle: "703 Whitney Ave #6, New Haven, CT 106511",
	        id: "marker6"
	    }]
    }
  },
  onRegionChange(location) {
    console.log(location);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Mapbox
          annotations={this.state.annotations}
          accessToken={'pk.eyJ1IjoidGltb3RpdXMwMiIsImEiOiJjaWdweTlrOTcwMWpjdjZrb2tzeXJoeWlyIn0.uy7KqaGYqwP0YWIEZf_usg'}
          centerCoordinate={this.state.center}
          debugActive={false}
          direction={0}
          onRegionChange={this.onRegionChange}
          rotationEnabled={true}
          scrollEnabled={true}
          style={styles.map}
          showsUserLocation={true}
          styleUrl={'asset://styles/streets-v8.json'}
          UserLocationTrackingMode={'FOLLOW'}
          zoomEnabled={true}
          zoomLevel={10}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: require('Dimensions').get('window').width,
    flex: 1
  }
});

module.exports = Maps;



