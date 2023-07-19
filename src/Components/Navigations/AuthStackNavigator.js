import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from '../../Screens/Authentication/Login'
import AccountType from '../../Screens/Authentication/AccountType'
import Otp from '../../Screens/Authentication/Otp'
import ForgetPass from '../../Screens/Authentication/ForgetPass'
import ResetPass from '../../Screens/Authentication/ResetPass'
import ChangePass from '../../Screens/Common/ChangePass'
import SignUp from '../../Screens/Authentication/SignUp'


const AuthStackNavigator = () => {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="accountype"
          component={AccountType}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="otp"
          component={Otp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="forgetpass"
          component={ForgetPass}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="resetpass"
          component={ResetPass}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="changepass"
          component={ChangePass}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})
