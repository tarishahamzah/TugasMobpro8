import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {IconBack} from '../../../assets'
import { Gap } from '../../atoms'

const Header = ({title, onBack}) => {
    return (
        <View style={styles.container}>
           { onBack && (
                <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
                <View style={styles.back}>
                    <IconBack />
                </View>
            </TouchableOpacity>
           )}
            <Gap width={16} />
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 24,
        paddingVertical: 38,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    text: {
        fontSize: 22,
        fontFamily: 'Poppins-Medium',
    },
    back: {
        padding: 5,
    }
})
