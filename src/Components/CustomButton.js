import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/FontAwesome5'
// import ICONS from 'react-native-vector-icons/FontAwesome5Brands'

const CustomButton = ({
  text,
  onPress,
  stylz,
  IconName,
  Iconsize,
  IconColor,
  BGColor,
  Iconname,
  IconSize,
  Iconcolor,
  CircleStyle,
  Textalig,
  restyle,
  Iconstyle,
}) => {
  return (
    <View style={[styles.ButtonContainer, stylz]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.ButtonStyles, BGColor, restyle]}>
        <Text style={[styles.ButtonText, Textalig]}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  ButtonContainer: {
    height: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(15),
  },
  ButtonStyles: {
    height: scale(50),
    width: '100%',
    backgroundColor: '#05BC03',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(22),
    flexDirection: 'row',
  },
  ButtonText: {
    color: 'black',
    textTransform: 'capitalize',
    letterSpacing: moderateScale(1),
    fontSize: moderateScale(20),
    fontWeight: '800',
    fontFamily: 'open sans',
    // textAlign: 'center',
    // paddingHorizontal: scale(5),
  },
  BGColor: {
    backgroundColor: 'green',
  },
  Circle: {
    height: scale(30),
    width: scale(30),
    backgroundColor: 'red',
  },
})

export default CustomButton
