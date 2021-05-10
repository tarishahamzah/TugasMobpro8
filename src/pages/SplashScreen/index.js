import React, {useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Sunflower } from '../../assets/icons'

const SplashScreen = ({navigation}) => {
    useEffect (() => {
        setTimeout (() => {
            navigation.replace('SignIn')
        },3000)
    }, [])
    return (
        <View style={styles.page}>
            <Sunflower />
            <Text style={styles.Text}>Money Tracker</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    page:{
        flex: 1,
        backgroundColor: '#02CF8E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text:{
        fontSize: 32,
        fontFamily: 'Poppins-Medium'
    }
})
