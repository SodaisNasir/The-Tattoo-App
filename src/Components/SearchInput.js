import React, {forwardRef} from 'react'
import {useController, useForm} from 'react-hook-form'
import {
  StyleSheet,
  InputField,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons'

const SearchInput = (props) => {
  return (
    <View style={[ props.style, props.Hello]}>

      <Text style={styles.TextStyle}>{props.InputUText}</Text>

      <TextInput
        textContentType={props.textContentType}
        value={props.value}
        onChangeText={props.onChangeText}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        placeholder={props.placeholder}
        placeholderTextColor={'#747688'}
        style={[styles.InputStyles, props.Gapp, props.restyle]}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        textAlignVertical={props.textAlignVertical}
        pattern={props.pattern}
        label={props.label}
        placeholderStyle={props.placeholderStyle}
        fontSize={props.fontSize}
        maxLength={props.maxLength}
      />
      <TouchableOpacity>
        <Icon
          onPress={props.onPress}
          style={props.PIstylye}
          name={props.PIname}
          size={props.PIsize}
          color={props.PIcolor}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    // Inputcontainer: {
    //   height: scale(150),
    //   alignItems: 'center',
    //   borderWidth: 1,
    //   borderColor: 'red',
    // },
    InputStyles: {
      height: scale(50),
      borderWidth: moderateScale(2),
      borderColor: '#E4DFDF',
      borderRadius: 12,
      alignItems: 'center',
      // justifyContent: 'center',
      paddingHorizontal: scale(20),
      backgroundColor: '#FFF',
      color: 'black',
    },
    Circle: {
      height: scale(10),
      width: scale(10),
      backgroundColor: 'red',
    },
    TextStyle: {
      fontFamily: 'open sans',
      fontSize: moderateScale(14),
      fontStyle: 'normal',
      fontWeight: '600',
      color: 'lightgrey',
      marginVertical: verticalScale(4),
    },
  })
export default SearchInput
