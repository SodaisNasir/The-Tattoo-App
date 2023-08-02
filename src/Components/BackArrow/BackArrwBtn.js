import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Font } from '../../Assets/Fonts/Font'

const BackArrwBtn = (props) => {
  return (
      <View style={[styles.Arrow,props.reStyle]}>
            <View style={{flex:1,justifyContent: 'center'}}>
            <TouchableOpacity onPress={props.onPress}>
            <View style={{
                 height: scale(34),
                 width: scale(34),
                 borderRadius: 100,
                 backgroundColor: 'white',
                 justifyContent: 'center',
                 alignItems: 'center',
            }}>
      <FontAwesome5 name="angle-left" size={25} color={'black'} />
        </View>
    </TouchableOpacity>

            </View>
            <View style={{flex:2,justifyContent: 'center',alignItems: 'center',}}>
                <Text style={styles.newText}>{props.text}</Text>
            </View>
            <View style={{flex:1}} />
        </View>
  )
}

const styles = StyleSheet.create({
    Arrow: {
      height: verticalScale(50),
      backgroundColor: 'black',
      flexDirection: 'row',
      overflow: 'hidden',
    },
    newText:{
        color: 'white',
        textTransform: 'capitalize',
        fontSize: scale(15),
        letterSpacing: 0.4,
        fontFamily: Font.OpenSans600
    }
  })
export default BackArrwBtn
