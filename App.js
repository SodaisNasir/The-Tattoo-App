import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import AuthStackNavigator from './src/Components/Navigations/AuthStackNavigator'
import UserBottomNavigator from './src/Components/Navigations/UserBottomNavigator'
import CreatorBottomNavigator from './src/Components/Navigations/CreatorBottomBar'
import {useDispatch, useSelector} from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import { useEffect } from 'react'
import OneSignal from 'react-native-onesignal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ROLE_ID, USER_DETAILS } from './src/redux/reducer/Holder'

const App = () => {
  const dispatch = useDispatch()

  const user_details = useSelector((state) => state.user_details)
  const role_id = useSelector((state) => state.role_id)

  useEffect(() => {
    getuserData()
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    OneSignal.setAppId('6e734850-e8f5-4421-95ec-de6767b80e8d')
    OneSignal.promptForPushNotificationsWithUserResponse()
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        )
        let notification = notificationReceivedEvent.getNotification()
        OneSignal.add
        const data = notification.additionalData
        console.log(' OneSignal data', data)
        notificationReceivedEvent.complete(notification)
      },
    )
    // OneSignal.setNotificationOpenedHandler((notification) => {})
    OneSignal.addSubscriptionObserver(async (event) => {

      if (event.to.isSubscribed) {
        const state = await OneSignal.getDeviceState()
        await AsyncStorage.setItem('onesignaltoken', state.userId)
      }
    })
  },[])

  const getuserData = async () => {
    const userData = await AsyncStorage.getItem('user_details')
    const cnvrtData = JSON.parse(userData)

    if(cnvrtData){
      dispatch({type: USER_DETAILS, payload: cnvrtData});
      dispatch({type: ROLE_ID, payload: cnvrtData.data.role_id})
    }else{
      console.log('Laraib D.')
    }

  }


  return (
    <>
      {user_details == null && <AuthStackNavigator />}
      {user_details != null && role_id == '2' && <CreatorBottomNavigator />}
      {user_details != null && role_id == '1' && <UserBottomNavigator />}
    </>
  )
}

export default App

const styles = StyleSheet.create({})
