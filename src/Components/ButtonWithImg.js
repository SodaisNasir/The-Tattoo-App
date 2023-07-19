import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React from 'react'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/FontAwesome5'
// import ICONS from 'react-native-vector-icons/FontAwesome5Brands'

const ButtonWithImg = ({
    upload_img,
    onPress,
    img
  }) => {
  return (
   <TouchableOpacity onPress={onPress}>
    <View style={styles.ButtonContainer}>
        <View style={styles.Part1}>
            <View style={styles.Two}>
                <Image resizeMode='cover' source={{uri: upload_img }} style={styles.Img} />
            </View>
        </View>
        <View style={styles.Part2}>
                 <View style={styles.One}>
              {img.uri ?
               <Image
                resizeMode='contain'
                style={styles.Img}
                source={{uri: img.uri}}
      />
      :
      <Image
                resizeMode='contain'
                style={styles.Img}
                source={require('../Assets/Images/cover.png')}
      />
    }
            </View>
            
        </View>

    </View>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    ButtonContainer: {
        height: verticalScale(40),
        backgroundColor: '#fff',
        borderRadius: moderateScale(15),
        flexDirection: 'row',
        marginVertical: verticalScale(7),
        overflow: 'hidden',
    },
    Part1: {
        height: '100%',
        width: '80%',
        justifyContent: 'center',
        paddingLeft: scale(15)
    },
    Part2: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: scale(4)
    },
    One: {
        height: verticalScale(18),
        width: scale(18),
        overflow: 'hidden',
    },
    Two: {
        height: '70%',
        width: '15%',
        overflow: 'hidden',
    },
    Img:{
        height: '100%',
        width: '100%',
    }
  })
export default ButtonWithImg
