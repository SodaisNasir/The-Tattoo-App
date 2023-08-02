import React, {useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters'
import BackArrow from '../../Components/BackArrow'
import CustomButton from '../../Components/CustomButton'
import CustomInput from '../../Components/CustomInput'
import Loader from '../../Components/Modal/LoaderModal'
import { ResetPassword } from '../../redux/actions/AuthActions'
import Validation from '../../Components/Validation'
import TickModal from '../../Components/Modal/TickModal'
import BackArrwBtn from '../../Components/BackArrow/BackArrwBtn'

const ResetPass = ({navigation,route}) => {
  const {id} = route.params
  const [password, setPassword] = useState('')
  const [isPasswordSecure, setIsPasswordSecure] = useState(true)
  const [loader, setLoader] = useState(false);
  const [password1, setPassword1] = useState('')
  const [isPasswordSecure1, setIsPasswordSecure1] = useState(true)
  const [check, setCheck] = useState(false)


  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'})

  const onHandleChange = (data) => {
    ResetPassword(data,navigation,id,setLoader,setCheck)
  }
  const confirmPasswordRef = useRef()

  return (
    <SafeAreaView style={styles.MainContainer}>
     <BackArrwBtn onPress={() => navigation.goBack()}/>
      <Loader
        onBackdropPress={() => setLoader(false)}
        isVisible={loader}
      /> 
       <TickModal
          text={'Your password has been successfully updated!'}
          onPress={() => setCheck(false)}
          onBackdropPress={() => setCheck(false)}
          isVisible={check}
        />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.Texts}>Reset Password</Text>
        {/* <Text style={styles.Texts1}>Lorem ispemLorem ispem Lorem ispem</Text> */}

        <CustomInput
          name="password"
          InputUText="New Password"
          secureTextEntry={isPasswordSecure}
          textContentType={'password'}
          rules={{
            required: 'New Password is required',
            minLength: {
              value: 8,
              message: 'New Password too short (minimum length is 8)',
            },
          }}
          // value={password}
          onChangeText={(text) => setPassword(text)}

          control={control}
          style={styles.textInput}
          textStyle={styles.InputTextStyle}
          //   placeholder={'Confirm Password'}
          keyboardType={'default'}
          PIname={isPasswordSecure ? 'eye-off' : 'eye'}
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
          PIsize={20}
          PIcolor={'#05BC03'}
          PIstylye={{
            position: 'relative',
            bottom: scale(32),
            left: scale(280),
          }}
          onPress={() => {
            isPasswordSecure
              ? setIsPasswordSecure(false)
              : setIsPasswordSecure(true)
          }}
          Hello={{
            height: scale(75),
          }}
          restyle={{
            height: scale(43),
          }}
        />
        {errors.password && <Validation title={errors.password.message} />}

        <CustomInput
          name="confirm_Password"
          InputUText="Confirm Password"
          secureTextEntry={isPasswordSecure1}
          textContentType={'password'}
          value={password1}
          onChangeText={(text1) => setPassword1(text1)}
          rules={{
            required: 'Confirm Password is required',
            minLength: {
              value: 8,
              message: 'Confirm Password too short (minimum length is 8)',
            },
          }}
          ref={(e) => (confirmPasswordRef.current = e)}
          control={control}
          style={styles.textInput}
          textStyle={styles.InputTextStyle}
          //   placeholder={'Confirm Password'}
          keyboardType={'default'}
          PIname={isPasswordSecure1 ? 'eye-off' : 'eye'}
          PIsize={20}
          PIcolor={'#05BC03'}
          PIstylye={{
            position: 'relative',
            bottom: scale(32),
            left: scale(280),
          }}
          onPress={() => {
            isPasswordSecure1
              ? setIsPasswordSecure1(false)
              : setIsPasswordSecure1(true)
          }}
          Hello={{
            height: scale(75),
          }}
          restyle={{
            height: scale(43),
          }}
        />
        {errors.confirm_Password && <Validation title={errors.confirm_Password.message} />}
        <CustomButton
        // onPress={() => alert('red')}
        onPress={handleSubmit(onHandleChange)}
          text={'Continue'}
        />

        <View style={{alignItems: 'center', marginTop: scale(25)}}>
          <Image source={require('../../Assets/Images/logo.png')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: scale(20),
    backgroundColor: 'black',
    paddingHorizontal: scale(15),
  },
  Texts: {
    color: '#FFF',
    fontFamily: 'mulish',
    fontSize: moderateScale(24),
    paddingTop: scale(40),
    fontWeight: '700',
  },
  Texts1: {
    color: '#FFF',
    fontFamily: 'mulish',
    fontSize: moderateScale(13),
    paddingVertical: scale(10),
  },
  SignUpText1: {
    fontFamily: 'ABeeZee',
    fontSize: moderateScale(13),
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#CBC0C0',
  },
  SignUpText: {
    fontFamily: 'ABeeZee',
    fontSize: moderateScale(15),
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#05BC03',
    textTransform: 'capitalize',
  },
})
export default ResetPass
