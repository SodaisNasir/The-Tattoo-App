import React from 'react'
import {StyleSheet, Image, View} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import {scale, verticalScale} from 'react-native-size-matters'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ChangePass from '../../Screens/Common/ChangePass'
import Setting from '../../Screens/Common/Setting'
import SettingOpt from '../../Screens/Common/SettingOpt'
import RandomProfile from '../../Screens/Common/RandomProfile'
import AddTatto from '../../Screens/Common/AddTatto'
import EditProfile from '../../Screens/Common/EditProfile'
import Home from '../../Screens/Common/Home'
import Profile from '../../Screens/Common/Profile'



const UserBottomNavigator = () => {
  const Tab = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
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
          },
        }}
        initialRouteName="allhome">
        <Tab.Screen
          name="allhome"
          component={AllHome}
          options={{
            headerShown: false,
            tabBarLabel: () => {
              return null
            },
            tabBarIcon: ({color}) => (
              <View
              style={{
                height: scale(30), width: scale(30), overflow: 'hidden',
              }}
              >

              <Image
                style={{height: '100%',width: '100%'}}
                source={require('../../Assets/Images/menu.png')}
                />
                </View>
            ),
          }}
        />

<Tab.Screen
          name="AddTatto"
          component={AddTatto}
          options={{
            tabBarStyle: {
              display: 'none',
            },
            headerShown: false,
            tabBarLabel: () => {
              return null
            },
            tabBarIcon: ({color}) => (
              <Image
                style={{height: scale(30), width: scale(30), borderRadius: 100}}
                source={require('../../Assets/Images/circle.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Allsetting"
          component={AllSetting}
          options={{
            headerShown: false,
            tabBarLabel: () => {
              return null
            },
            tabBarIcon: ({color}) => (
              <Image
                style={{height: scale(30), width: scale(30), borderRadius: 100}}
                source={require('../../Assets/Images/setting.png')}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default UserBottomNavigator

const styles = StyleSheet.create({})

const Stack = createNativeStackNavigator()
function AllHome() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="RandomProfile" component={RandomProfile} />
    </Stack.Navigator>
  )
}
function AllSetting() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Setting'>
      <Stack.Screen name="editprofile" component={EditProfile} />
      <Stack.Screen name="changepass" component={ChangePass} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="settingopt" component={SettingOpt} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="RandomProfile" component={RandomProfile} />
    </Stack.Navigator>
  )
}
