import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, TextInput, Text, Alert, KeyboardAvoidingView, AppRegistry} from 'react-native';
//import all the components we are going to use.
import Spinner from 'react-native-loading-spinner-overlay';
import { Input} from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Slider from '@react-native-community/slider'
import TimePicker from 'react-native-simple-time-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ActionBarImage from './ActionBarImage'
import { Button, LinearGradient, linearGradientProps, Header, Icon } from 'react-native-elements';
export default class SecondPage extends Component {
  static navigationOptions = {
    title: 'Risk Analysis',
    headerStyle: {
      backgroundColor: '#E6F0FF',
      height:75,
      borderBottomWidth: 0,
      
      
    },
    headerRight:()=> <ActionBarImage />,
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'Avenir',
      fontSize:25
    },
   
  };
  state = {
    risk: 0,
    location: '',
    county:'',
    state: '',
    day: '', 
    time: '',
    placeType:'',
    casesData: 0,
    countyPop: 0,
    timeSpent: 0, 
    isFormValid: false,
    showForm: true,
    isLoading: false,
    spinner: true,
    latitude:0.0,
    longitude:0.0,
    confirm: false, 
    eatType:'',
    isTimePickerVisible: false,
    setTimePickerVisibility: false,
    selectedHours: 0,
    selectedMinutes: 0,
    riskName: '',
    printTime: '',
    comma:', '
  }

  constructor(props) {
    super(props);
    //this.state = {risk: 0, location: '', day: '', time: '', isFormValid: false, isLoading: true};
 }
 

  getRemoteData = () => {
    const obj = {'location': this.state.location, 'day': this.state.day, 
              'time': this.state.time, 'eatType': this.state.eatType};
    const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
    let postData = {
        method: 'POST',
        //mode: 'no-cors', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: blob
    }
    fetch('http://127.0.0.1:5000/getJson/', postData)
    .then((response) => response.json())
    .then((json) => {
      //console.log('Risk: ', json)
      this.setState({risk: json.risk});
      this.setState({placeType: json.placeType})
      this.setState({casesData:json.new_cases})
      this.setState({countyPop: json.population})
      this.setState({timeSpent: json.average_time_spent})
      this.setState({latitude: json.latitude})
      this.setState({longitude: json.longitude})
      this.setState({county: json.county})
      this.setState({riskName: json.riskName})
      this.setState({time: json.time})
      //this.setState({state: json.state})
      //console.log('Risk AGAIN ', this.state.risk)
    })
    .catch((error) => console.error(error))
  };

  startLoading = () => {
    this.setState({isLoading:true})
    this.handleSubmit()
  }
  checkLoading = () => {
    if(this.state.risk>0){
      this.setState({isLoading:false})
    }
  }


  handleLocationChange = location => {
    //this.validateForm()
    this.setState({location})
  }
  handleDayChange = day => {
    this.setState({day})
    this.validateForm()
    
  }
  handleTimeChange = time => {
    this.setState({time})
    console.log(time.length)
    this.validateForm()
    
  }
  
  handleSubmit = () => {
    //this.props.onSubmit(this.statee
    this.setState({showForm:false})
    this.getRemoteData()
    
    //Alert.alert('Location is ' + this.state.location + '\nDay of the Week is ' + this.state.day + '\nTime is ' 
    //+ this.state.time+ '\nRisk is ' + this.state.risk)
    //onPress --> render progress bar 
  }
  validateForm = () => {
    
    if(this.state.location.length >= 0){
      if(this.state.day.length > 0){
          //console.warn('here1')
          return this.setState({isFormValid:true})
          
        
      }
    }
    else{
      return this.setState({isFormValid:false})
    }
    
  }
  confirmLocation = () => {
    this.setState({confirm:true})
    console.log('here'+ this.state.location);
    if (this.state.placeType=='locality') {
      this.setState({comma:''})
      this.startLoading()
    }
    if (this.state.placeType=='sublocality') {
      this.setState({comma:''})
      this.startLoading()
    }
    if (this.state.placeType=='administrative_area_level_1') {
      this.setState({comma:''})
      this.startLoading()
    }
    if (this.state.placeType=='administrative_area_level_2') {
      this.setState({comma:''})
      this.startLoading()
    }
    if (this.state.placeType=='administrative_area_level_3') {
      this.setState({comma:''})
      this.startLoading()
    }
    if (this.state.placeType=='administrative_area_level_4') {
      this.setState({comma:''})
      this.startLoading()
    }
    if (this.state.placeType=='administrative_area_level_5') {
      this.setState({comma:''})
      this.startLoading()
    }
    if (this.state.placeType=='sublocality_level_1') {
      this.setState({comma:''})
      this.startLoading()
    }
    if (this.state.placeType=='sublocality_level_2') {
      this.setState({comma:''})
      this.startLoading()
    }
    if (this.state.placeType=='sublocality_level_3') {
      this.setState({comma:''})
      this.startLoading()
    }
    if (this.state.placeType=='sublocality_level_4') {
      this.setState({comma:''})
      this.startLoading()
    }
    if (this.state.placeType=='intersection') {
      this.setState({comma:''})
      this.startLoading()
    }
  }

  eraseLocation = () => {
    this.setState({location:''})
  }
  
  setPlaceType = type => {
    this.setState({placeType: type})
  }
  
  setTakeout = () => {
    this.setState({eatType:'takeout'})
  }
  setDineIn = () => {
    this.setState({eatType:'dine-in'})
  }

  showTimePicker = () => {
    this.setState({
      isTimePickerVisible:true
    })
  };

  hideTimePicker = () => {
    this.setState({
      isTimePickerVisible:false
    })
  };

  handleConfirm = (time) => {
    var hours = time.getHours();
    var minutes = time.getMinutes();
    time = time.toLocaleTimeString();
    minutes = String(minutes);
    hours = String(hours);
    var ampm = ' AM'
    if (minutes.length == 1){
      minutes = "0" + minutes;
    }
    time = hours + ":" + minutes;
    if (hours>12){
      hours= hours%12
      if(hours == 0){
        hours = 12
      }
      ampm = ' PM'
    }
    this.setState({
      printTime: hours + ":" + minutes + ampm
    })

    //console.warn("A time has been picked:", time);
    // time = String(time);
    this.handleTimeChange(time);
    //console.warn('here')
    this.hideTimePicker();
  };


  render() { 
    const { navigate } = this.props.navigation;
    if (this.state.showForm===false){
      if(this.state.risk>0){
        var color = "#000000"
        var textshadowcolor = "#FFFFFF"
        if(this.state.riskName == "Low Risk"){
          color = "#008000"
        }
        else if(this.state.riskName == "Medium Low Risk"){
          color = "#FFFF00"
          textshadowcolor = "#000000"
        }
        else if(this.state.riskName == "Medium High Risk"){
          color = "#FFA500"
        }
        else {
          color = "#FF0000"
        }
        return (
          <View style={styles.container}>
            <Text style={styles.HeaderText}>
                {this.state.location}
                {"\n"}
                {this.state.day}{this.state.comma} {this.state.printTime}



            </Text>
            <Text style = {{color: color, fontSize:35 ,fontFamily: 'Avenir-Heavy', textShadowColor: textshadowcolor, textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}}>
                  {this.state.riskName}

            </Text>
            <Slider
              disabled
              style={{width: 300, height: 40, backgroundColor: color, borderColor: '#46b4ff', borderWidth: 3, borderRadius:15}}
              minimumTrackTintColor="#46b4ff"
              maximumTrackTintColor="#46b4ff"
              minimumValue={0}
              maximumValue={100}
              value={this.state.risk}
              />
            <Text style = {{fontFamily: 'Avenir',fontSize:30, color:color, fontWeight:'bold',textShadowColor: textshadowcolor, textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}}>
                  {this.state.risk}%
                  {"\n"} 
            </Text>
            
            <View style={styles.container1}>
            <Text style = {{fontFamily: 'Avenir',fontSize:19, color:'black', fontWeight:'bold', alignItems:'center'}}>
                Daily New Cases Per 100K: {this.state.casesData}
                {"\n"} 
                Place Type: {this.state.placeType}
                {"\n"}
                Key:
                </Text>

            <Text style ={{fontFamily: 'Avenir'}}>
              <Text style = {{color: '#008000', fontWeight: 'bold'}}>
              Green: 
              </Text>
              It is safe to leave your house. Wear a face covering and keep physical distance.
              {"\n"} 
              <Text style = {{color: '#FFFF00', fontWeight: 'bold', textShadowColor: '#000000', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}}>
              Yellow: 
              </Text>
              It is safe to leave your house. Wear a face covering and keep strict physical distance.
              {"\n"} 
              <Text style = {{color: '#FFA500', fontWeight: 'bold'}}>
              Orange: 
              </Text>
              Use discretion when leaving the house, depending on urgency. Wear a face covering and keep strict physical distance.
              {"\n"} 
              <Text style = {{color: '#FF0000', fontWeight: 'bold'}}>
              Red: 
              </Text>
              If possible, it is highly recommended you stay home.
            </Text>

            </View>
    
            
          </View>
        )
      }
      else{
        return(
          <View style={styles.container}>
            <Spinner
              visible={this.state.spinner}
              textContent={'Gathering information from Google Places and the NYT COVID-19 Database...'}
              textStyle={styles.spinnerTextStyle}
            />
          </View>
      
        )
      }
    }
    else{
      console.log(this.state.isLoading)
      if(this.state.confirm == false){
      return (
        <KeyboardAvoidingView style={styles.container}>
        <Text style ={styles.HeaderText}>
          Where would you like to go? 
          {"\n"}
        </Text>
            <GooglePlacesAutocomplete
              placeholder='Enter Location'
              listViewDisplayed='auto'
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                {this.setPlaceType(data.types[0])}
                {this.handleLocationChange(data.description)}
              }}
              query={{
                key: '',
                language: 'en',
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  width: '100%',
                  //placeholder='BASIC INPUT'
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  height: 38,
                  color: '#000000',
                  fontSize: 16,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
            />
            
            <Button
            title="Next"
            type = "outline"
            raised
            titleStyle={{ color: 'black', fontFamily: 'Avenir'}}
            buttonStyle={{
              backgroundColor: 'white',
              borderColor: '#46b4ff',
              borderWidth: 3,
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal:100,
              
            }}
          onPress={this.confirmLocation}
          />

        </KeyboardAvoidingView>
      )
      }

      if ((this.state.placeType=='cafe' || this.state.placeType=='bakery' || this.state.placeType=='restaurant')&&(this.state.eatType == '')){
        return(
          <View style = {styles.container}>
            <Text style = {styles.riskText}>
              You have selected a {this.state.placeType}
              {"\n"}
              {"\n"}
              Please select one of the following
              {"\n"}
            </Text>
            <Button
              title = 'Pick-up/Takeout'
              type = "outline"
              raised
              titleStyle={{ color: 'black', fontFamily: 'Avenir'}}
              buttonStyle={{
              backgroundColor: 'white',
              borderColor: '#46b4ff',
              borderWidth: 3,
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal:75,
              
            }}
              onPress={this.setTakeout}
              
              />
            <Text >
              {"\n"}
            </Text>
            <Button
              title = 'Dine In'
              type = "outline"
              raised
              titleStyle={{ color: 'black', fontFamily: 'Avenir'}}
              buttonStyle={{
              backgroundColor: 'white',
              borderColor: '#46b4ff',
              borderWidth: 3,
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal: 110,
              
            }}
              onPress={this.setDineIn}
              
              />
          </View>
        )
      }
      if(this.state.location!='' && this.state.confirm == true){
        return(
          //show place type and name of location
          <KeyboardAvoidingView style = {styles.container}>
            <Text style = {styles.HeaderText}> 
              When are you going to {this.state.location} ?
              {"\n"}

            </Text>
            
            <DropDownPicker
                placeholder="Choose Day of Week"
                items={[
                    {label: 'Monday', value: 'Monday'},
                    {label: 'Tuesday ', value: 'Tuesday'},
                    {label: 'Wednesday', value: 'Wednesday'},
                    {label: 'Thursday', value: 'Thursday'},
                    {label: 'Friday', value: 'Friday'},
                    {label: 'Saturday', value: 'Saturday'},
                    {label: 'Sunday', value: 'Sunday'},
                ]}
                defaultValue={this.state.day}
                containerStyle={{width: 300,height: 50}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    fontFamily: 'Avenir',
                    justifyContent: 'center',
                    fontSize: 23,
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={(item)=>this.handleDayChange(item.value)}
            />
            <Text>
            {"\n"}
            </Text>
            <Button 
            title="Click to Choose Time"
            type = "outline"
            titleStyle={{ color: 'black', fontFamily: 'Avenir'}}
            buttonStyle={{
              backgroundColor: 'white',
              borderColor: 'grey',
              borderWidth: .3,
              paddingVertical: 8,
              paddingHorizontal:60,
              
            }} 
            onPress={this.showTimePicker} />
            <DateTimePickerModal
              isVisible={this.state.isTimePickerVisible}
              mode="time"
              onConfirm={this.handleConfirm}
              onCancel={this.hideTimePicker}
              headerTextIOS = "Pick a Time"
            />
            <Text>
              {"\n"}
            </Text>
            <View style={styles.container2}>
            <Text style={styles.TextStyle}>
              Date and Time selected: 
            </Text>
            <Text style={styles.inputText}>
              {this.state.day}
              {"\n"}
              {this.state.printTime}
            </Text>
            </View>
            <Text>
              {"\n"}
            </Text>
            
            {/* 
            string = "2020-08-06T02:26:51.980Z"
            location = string.find("T") + 1 
            time = string[location:location+1]
            time = float(time)
            time = time - 4
            if time < 0:
              time + 24
             */}



        <Button 
            title="Submit"
            type="outline"
            raised
            titleStyle={{ color: 'black', fontFamily: 'Avenir'}}
            buttonStyle={{
              backgroundColor: 'white',
              borderColor: '#46b4ff',
              borderWidth: 3,
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal:100,
              
            }}onPress = {this.startLoading} disabled = {!this.state.isFormValid}/>
        </KeyboardAvoidingView>
        )
      }    
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#FF6347',
    margin: 30,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  container1:{
    flex: 1,
    //backgroundColor: '#FF6347',
    borderRadius: 20,
    borderColor: '#46b4ff',
    borderWidth:5,
    alignItems: 'center',
    backgroundColor:'#E6F0FF',
    
  },
  container2:{
    flex: 1,
    //backgroundColor: '#FF6347',
    borderRadius: 15,
    paddingHorizontal:70,
    paddingTop:15,
    borderColor: '#46b4ff',
    borderWidth:5,
    alignItems: 'center',
    backgroundColor:'#E6F0FF',
    
  },
  TextStyle: {
    fontSize: 21,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Avenir',
    fontWeight:'bold'
  },
  inputText:{
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Avenir',
  },
  HeaderText:{
    fontSize: 23,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Avenir',
    fontWeight:'bold'
  },
  riskText:{
    fontSize: 23,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Avenir',
  },
  input: {
    borderWidth: 5,
    borderColor: 'pink',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    //paddingHorizontal: 10,
    //paddingVertical: 5,
    borderRadius: 3,
  },
  spinnerTextStyle: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'System',
    fontFamily: 'Avenir',
    margin: 50,
  },
});