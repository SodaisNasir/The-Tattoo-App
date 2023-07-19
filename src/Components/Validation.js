import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {scale, verticalScale, moderateScale} from 'react-native-size-matters'

const Validation = (props) => {
  return (
    <Text style={[styles.error, props.REStyle]}>{'* ' + props.title} </Text>
  )
}

export default Validation

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    // alignSelf: 'flex-start',
    // marginLeft: 25,
    // fontFamily: Font.Lato700,
    // marginBottom: scale(10),
    marginHorizontal: scale(8),
  },
})
