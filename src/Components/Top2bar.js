import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters'

const Top2navigator = (props, navigation) => {
  const [btn1, setBtn1] = useState(true)
  const [btn2, setBtn2] = useState(false)

  const onDemand = () => {
    setBtn1(true)
    setBtn2(false)
  }
  const Petroling = () => {
    setBtn2(true)
    setBtn1(false)
  }
  return (
    <View style={[styles.TopNavigatorContainer, props.restyle]}>
      <TouchableOpacity
        style={[styles.TabTouch1, props.AllBG]}
        onPress={props.All}>
        <Text style={[styles.Text1, props.AllText]}>{props.NameOne}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.TabTouch2, props.BGCOLOR]}
        onPress={props.Credit}>
        <Text style={[styles.Text1, props.CreditText]}>{props.NameTwo}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  TopNavigatorContainer: {
    height: scale(47),
    backgroundColor: '#D7D7D7',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(15),
    overflow: 'hidden',
  },
  Text1: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: moderateScale(1),
  },
  Text2: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: moderateScale(1),
  },

  TabTouch1: {
    flex: 1,
    height: '100%',
    // borderRadius: 17,
    borderTopRightRadius: scale(12),
    borderBottomRightRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  TabTouch2: {
    flex: 1,
    height: '100%',
    borderTopLeftRadius: scale(12),
    borderBottomLeftRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default Top2navigator
