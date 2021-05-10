import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import {Header, TextInput, Button, Gap} from '../../components'
import {launchImageLibrary} from 'react-native-image-picker'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {showMessage} from 'react-native-flash-message'
import firebase from '../../config/Firebase'

const SignUp = ({navigation}) => {
    const [photo, setPhoto] = useState('');
    const [hasPhoto, setHasPhoto] = useState (false);
    const [photoBase64, setPhotoBase64] = useState('');

    const [fullName, setFullName] = useState ('');
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');

    const getImage = () => {
        launchImageLibrary (
            {maxHeight: 200, maxWidth: 200, includeBase64: true},
            res => {
                if (res.didCancel){
                    setHasPhoto(false);
                    showMessage({
                        message: "Photo Upload Canceled",
                        type: "default",
                        backgroundColor: "#D9435E", // background color
                        color: "white", // text color
                      });
                } else {
                    setPhoto(res.uri);
                    setPhotoBase64(res.base64);
                    setHasPhoto(true);
                }
            },
        );
    };

    const onSubmit = () => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            const uid = res.user.uid;
            const data = {
                fullName: fullName,
                email: email,
                photo: photoBase64,
            };
            firebase.database().ref(`users/${uid}`).set(data);
            setFullName('');
            setEmail('');
            setPassword('');
            navigation.navigate("SignIn");
        })
        .catch(error =>{
            showMessage({
                message: error.message,
                type: "default",
                backgroundColor: "#D9435E", // background color
                color: "white", // text color
              });
        })
    };

    return (
        <View style={styles.page}>
            <Header title="Sign Up" onBack={()=> navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentWrapper}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.border}>
                            <TouchableOpacity onPress={getImage} activeOpacity={0.7}>
                                { hasPhoto && ( 
                                    <Image source={{uri: photo}} style={styles.avatar} />
                                )}
                                { !hasPhoto && (
                                    <View style={styles.addPhoto}>
                                        <Text style={styles.addPhotoText}>Add Photo</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <TextInput 
                    title="Full Name" 
                    placeholder="Enter your full name" 
                    value={fullName} 
                    onChangeText={value=>setFullName(value)}
                    />
                    <Gap height={16} />
                    <TextInput 
                    title="Email Address" 
                    placeholder="Enter your email address" 
                    value={email} 
                    onChangeText={value=>setEmail(value)}
                    />
                    <Gap height={16} />
                    <TextInput 
                    title="Password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChangeText={value=>setPassword(value)}
                    secureTextEntry
                    />
                    <Gap height={24} />
                    <Button title="Continue" onPress={onSubmit} />
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    page: {
      flex: 1,
    },
    contentWrapper: {
      flex: 1,
      backgroundColor: 'white',
      marginTop: 24,
      paddingHorizontal: 24,
    },
    addPhoto: {
        height: 90,
        width: 90,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 90,
    },
    addPhotoText: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        maxWidth: 40,
        textAlign: 'center',
    },
    border: {
        borderWidth: 1,
        borderColor: '#8092A3',
        width: 110,
        height: 110,
        borderRadius: 110,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed'
    },
    avatarWrapper: {
        alignItems: 'center',
        marginTop: 26,
        marginBottom: 16,
    },
    avatar: {
        height: 90,
        width: 90,
        borderRadius: 90,
    },
  });
