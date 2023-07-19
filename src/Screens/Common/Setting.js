import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, { useCallback } from 'react'
import {scale, verticalScale} from 'react-native-size-matters'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Home from './Home'


const Setting = ({navigation}) => {

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({tabBarStyle: {
        // borderTopRightRadius: 30,
        // borderTopLeftRadius: 30,
        height: verticalScale(55),
        position: 'absolute',
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 0.3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.1,
        // paddingHorizontal: scale(60)
      }});
      // dispatch(getChapters(setData,item.id))
    }, []),
  );
  const userDetails = useSelector(state => state.user_details)
  const profileNav = () => {
      navigation.navigate('profile')
  }
  return (
    <View style={styles.MainContainer}>
      <Home />
    <View style={styles.BackBlur}>
      <View style={styles.Card}>
        <View style={styles.SideOne}>
            <SimpleLineIcons name="settings" size={25} color={'#05BC03'} />
          <TouchableOpacity
            onPress={() => navigation.navigate('settingopt')}>
            <Text style={styles.Texts}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.SideTwo}>
            <SimpleLineIcons name="user" size={25} color={'#05BC03'} />
          <TouchableOpacity
            onPress={profileNav}>
            <Text style={styles.Texts}>Profile</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: 'black',
    },
    Card: {
      height: scale(140),
      backgroundColor: 'white',
      borderRadius: 10,
      marginBottom: scale(70),
    },
    SideOne: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      // justifyContent: 'flex-end',
      paddingHorizontal: scale(20),
    },
    SideTwo: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      // justifyContent: 'flex-end',
      paddingHorizontal: scale(20),
    },
    Texts: {
      fontFamily: 'sans open',
      fontSize: 16,
      textTransform: 'uppercase',
      color: '#05BC03',
      fontWeight: '900',
      fontStyle: 'normal',
      marginRight: scale(15),
      letterSpacing: 0.7,
      paddingHorizontal: scale(20),
    },
    BackBlur: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingHorizontal: scale(20),
    },
  })
export default Setting
