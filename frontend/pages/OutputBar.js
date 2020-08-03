'use strict';
 
var React = require('react');
var Slider = require('react-native-slider');
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} = require('react-native');
 
var SliderExample = React.createClass({
  getInitialState() {
    return {
      value: 0.2,
    };
  },
 
  render() {
    return (
      <View style={styles.container}>
        <Slider
          value={this.state.value}
          onValueChange={(value) => this.setState({value})} />
        <Text>Value: {this.state.value}</Text>
      </View>
    );
  }
});
 
var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
 
AppRegistry.registerComponent('SliderExample', () => SliderExample);