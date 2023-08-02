import React from 'react'
import {View, SafeAreaView, Image, Pressable} from 'react-native'
import {scale} from 'react-native-size-matters'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const FullScreenImage = ({navigation, route}) => {
  // console.log('route.params.image', route.params.image)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#000000',
        paddingTop: scale(20),
      }}>
      <View
        style={{
          width: '100%',
          padding: 10,
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack()
          }}>
          <MaterialCommunityIcons
            color={'#ffffff'}
            name="close"
            size={32}
            style={{
              borderWidth: 1,
              borderColor: '#ffffff',
              borderRadius: 50,
              alignSelf: 'flex-end',
            }}
          />
        </Pressable>
      </View>

      <Image
        source={{uri: route.params.image}}
        style={{
          width: '100%',
          height: '70%',
          resizeMode: 'contain',
        }}
      />
    </SafeAreaView>
  )
}

export default FullScreenImage
