import React from 'react'
import {Button, StyleSheet, TextInput, View, Alert, Text} from 'react-native'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
})

export default class RiskInput extends React.Component {

  state = {
    location: 'miami beach, florida',
    day: 'Friday', 
    time: 10,
    risk:0,
  }

  //react class component lifecycle begins 
  //1. instance of a component created and stored in the DOM (document object model)
  constructor(props) { 
    super(props);
  }

  componentDidMount() {
    fetch('http://127.0.0.1:5000/risk')
      .then((response) => response.json())
      .then((json) => {
        this.setState({risk: json.risk});
      })
      .catch((error) => console.error(error))
  }

  //2. Component is re-rendered 
  //onClick set the state
  componentDidUpdate() {
    fetch('http://127.0.0.1:5000/getJson/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'location': this.state.location,
    })
  });
  }

  render() {
    return (
      <View>
          <Text>
            Risk: {this.state.risk}
          </Text>
      </View>
    )
  }
}
