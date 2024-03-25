/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL } from '@env'; 

// import type {Node} from 'react';
import {
  TextInput,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  onPressLearnMore,
  onPress,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




// import axios from 'axios'



const Section = ({children, title})=> {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = ()=> {
  const isDarkMode = useColorScheme() === 'dark';
  const [userId,setUserId] = useState();
  const [userJob, setUserJob] = useState();
  const [charName, onChangeCharName] = useState('');
  // const ocid_URL = API_URL+"id?character_name="+charName
  // let charInfo_URL = API_URL+"character/basic?ocid="+userId

//섀바

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  let [userName,setName] = useState(0);
  useEffect(() => {
      getCharJob()
  },[userId])
//   useEffect(() => {
//     getCharJob()
// },[userId])
  
  const getOCID = () =>{
    const strObj = fetch(API_URL+"id?character_name="+charName, {
      headers: {
        "x-nxopen-api-key": API_KEY
      } 
    })
      .then(response => response.json())
      .then(data => setUserId(data.ocid))
      .catch(error => console.error(error))
  }
  const getCharJob = () =>{
    const strjob = fetch(API_URL+"character/basic?ocid="+userId, {
      headers: {
        "x-nxopen-api-key": API_KEY
      }
    })
      .then(response => response.json())
      .then(data => setUserJob(data.character_class))
      .catch(error => console.error(error))
      console.log(charName)
      console.log(userId)
      console.log(userJob)
  }
  
  



  return (
        
      <View>
        <View style={{flexDirection:'row'}}>
        <TextInput
          style={styles.input}
          onChangeText = {onChangeCharName}
          value={charName}
          />
          {/* <Button
          style={styles.input}
          onPress={checkJob}
          title="직업확인(id불러오기 먼저)"
          color= "gray"
          /> */}
          <Button
          style={styles.input}
          onPress={getOCID}
          title="id 불러오기"
          color= "gray"
          />         
        </View>
        <Text>
            {userId}
        </Text>
        <Text>
            {userJob}
        </Text>
      </View>
   

  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
