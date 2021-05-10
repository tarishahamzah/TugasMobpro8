import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, TextInput, Button, Gap} from '../../components';
import firebase from '../../config/Firebase';
import {showMessage} from 'react-native-flash-message';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');

  const onSubmit = () => {
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => navigation.navigate('Home'))
    .catch(error =>{
      showMessage({
          message: error.message,
          type: "default",
          backgroundColor: "#D9435E", // background color
          color: "white", // text color
        });
  })
  }

  return (
    <View style={styles.page}>
      <Header title="Sign In" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <TextInput 
          title={"Email Address"} 
          placeholder={"Type your email address"} 
          value={email} 
          onChangeText={value=>setEmail(value)}
          />
          <Gap height={16} />
          <TextInput 
          title={"Password"} 
          placeholder={"Type your password"} 
          value={password} 
          onChangeText={value=>setPassword(value)}
          secureTextEntry
          />
          <Gap height={24} />
          <Button title="Sign In" onPress={onSubmit} />
          <Gap height={12} />
          <Button 
          title="Create New Account" 
          color='#8D92A3' textColor='white' 
          onPress={()=> navigation.navigate('SignUp')} 
          />    
          <Gap height={24} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 26,
    marginTop: 24,
  },
});