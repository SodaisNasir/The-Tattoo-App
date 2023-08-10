import React, { useCallback, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Switch,
  TouchableOpacity,
} from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters'
import BackArrow from '../../Components/BackArrow'
import { USER_DETAILS } from '../../redux/reducer/Holder'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { editNotification } from '../../redux/actions/UserActions'
import BackArrwBtn from '../../Components/BackArrow/BackArrwBtn'
const SettingOpt = ({ navigation }) => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user_details)
  const [isEnabled, setIsEnabled] = useState(userData?.data?.notification_status == "Active" ? true : false)

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
      // dispatch(getChapters(setData,item.id))
    }, []),
  );
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)
    dispatch(editNotification(userData))
  }
  const logOut = async () => {
    await AsyncStorage.removeItem('user_details')
    dispatch({ type: USER_DETAILS, payload: null })
  }
  return (
    <SafeAreaView style={styles.MainContainer}>
      <BackArrwBtn text={'Settings'} onPress={() => navigation.goBack()} reStyle={{
        paddingHorizontal: scale(20),
        marginBottom: scale(10)
      }} />
      {/* <BackArrow
      restyle={{
        marginLeft: scale(15),
      }}
      onPress={() => navigation.goBack()}
    />
    <Text style={styles.Heading}>Settings</Text> */}

      <View style={styles.ToggleCon}>

        <TouchableOpacity>
          <Text style={styles.SettingText}>Notifications</Text>
        </TouchableOpacity>

        <Switch
          trackColor={{ false: '#767577', true: '#05BC03' }}
          thumbColor={isEnabled ? '#FFFF' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {
        userData?.data?.social_id ?
          null
          : <View style={styles.SettingTextBox}>
            <TouchableOpacity onPress={() => navigation.navigate('changepass')}>
              <Text style={styles.SettingText2}>Change Password</Text>
            </TouchableOpacity>
          </View>
      }


      <View style={styles.SettingTextBox}>
        <TouchableOpacity
          onPress={() => logOut()}>
          <Text style={styles.SettingText2}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: scale(15),
  },
  Heading: {
    textAlign: 'center',
    fontFamily: 'open sans',
    fontSize: moderateScale(17),
    color: 'white',
    fontWeight: '700',
    position: 'relative',
    bottom: scale(25),
    letterSpacing: 0.08,
  },
  ToggleCon: {
    height: scale(50),
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    flexDirection: 'row',
    borderTopColor: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  SettingText: {
    fontFamily: 'open sans',
    fontSize: moderateScale(17),
    color: '#C6C6C6',
    fontWeight: '600',
    fontStyle: 'normal',
    paddingTop: scale(12),
  },
  SettingText2: {
    fontFamily: 'open sans',
    fontSize: moderateScale(16),
    color: '#C6C6C6',
    fontWeight: '600',
    fontStyle: 'normal',
  },
  SettingTextBox: {
    height: scale(55),
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: scale(15),
  },
})
export default SettingOpt
