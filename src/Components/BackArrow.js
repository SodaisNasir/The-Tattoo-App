import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import {scale, verticalScale} from 'react-native-size-matters'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const BackArrow = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.Arrow, props.restyle]}>
      <FontAwesome5 name="angle-left" size={25} color={'black'} />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Arrow: {
    height: scale(34),
    width: scale(34),
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default BackArrow
