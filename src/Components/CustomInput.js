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
import { Font } from '../Assets/Fonts/Font'

const CustomInput = forwardRef((props, ref) => {
  const {field} = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
  })
  return (
    <View style={[styles.field, props.style, props.Hello]}>
      {props.image ? <Image style={styles.image} source={props.image} /> : null}

      <Text style={styles.TextStyle}>{props.InputUText}</Text>

      <TextInput
        textContentType={props.textContentType}
        value={field.value}
        ref={ref}
        onChangeText={field.onChange}
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
        onFocus={props.onFocus}
        onBlur={props.onBlur}
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
})

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
    fontFamily: Font.OpenSans600
  },
  Circle: {
    height: scale(10),
    width: scale(10),
    backgroundColor: 'red',
  },
  TextStyle: {
    fontSize: scale(13),
    color: 'lightgrey',
    marginVertical: verticalScale(4),
    fontFamily: Font.OpenSans600
  },
})
export default CustomInput
