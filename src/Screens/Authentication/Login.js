import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import {scale, verticalScale, moderateScale} from 'react-native-size-matters'
import {useDispatch, useSelector} from 'react-redux'
import CustomButton from '../../Components/CustomButton'
import CustomInput from '../../Components/CustomInput'
import Validation from '../../Components/Validation'
import {googleSignin, sign_in} from '../../redux/actions/AuthActions'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { Email_Regex } from '../../Utils/BaseUrl'
import Loader from '../../Components/Modal/LoaderModal'
import IncorrectModal from '../../Components/Modal/IncorrectModal'

const Login = ({navigation}) => {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [isPasswordSecure, setIsPasswordSecure] = useState(true)
  const [isEnabled, setIsEnabled] = useState(true)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
  const [gUser, setGUser] = useState({})
  const [loader, setLoader] = useState(false);
  const [check, setCheck] = useState(false)


  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'})

  useEffect(() => {
    isSignedIn()
  }, [])

  const signIn = async () => {
    dispatch(googleSignin(navigation))
  }
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn()
    if (!isSignedIn) {
      getCurrentUserInfo()
    } else {
      console.log('Please Login')
    }
  }
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently()

      setGUser(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // console.log 'User has not signed in yet')
      } else {
        console.log('Something went wrong!')
      }
    }
  }
const device = Platform.OS
  const onSubmit = (data) => {
      dispatch(sign_in(data,setLoader,device,setCheck))
  }
  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.ImgContainer}>
          <Image
            style={{
              height: scale(200),
              width: scale(200),
              resizeMode: 'contain',
            }}
            resizeMode="contain"
            source={require('../../Assets/Images/logo.png')}
          />
        </View>

        <CustomInput
          InputUText={'Email'}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: Email_Regex,
              message: 'Enter a valid Email',
            },
          }}
          control={control}
          style={styles.textInput}
          textStyle={styles.InputTextStyle}
          placeholder={'Email'}
          keyboardType={'email-address'}
        />
        {errors.email && <Validation title={errors.email.message} />}

        <CustomInput
          InputUText={'Password'}
          secureTextEntry={isPasswordSecure}
          textContentType={'password'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          name="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password too short min length is 8',
            },
            maxLength: {
              value: 16,
              message: 'Password maximum length is 16',
            },
          }}
          control={control}
          style={styles.textInput}
          textStyle={styles.InputTextStyle}
          placeholder={'Password'}
          keyboardType={'default'}
          PIname={isPasswordSecure ? 'eye-off' : 'eye'}
          PIsize={20}
          PIcolor={'grey'}
          PIstylye={{
            position: 'relative',
            bottom: scale(35),
            left: scale(270),
          }}
          onPress={() => {
            isPasswordSecure
              ? setIsPasswordSecure(false)
              : setIsPasswordSecure(true)
          }}
        />
        {errors.password && <Validation title={errors.password.message} />}

        <CustomButton onPress={handleSubmit(onSubmit)} text={'sign in'} />

        <TouchableOpacity onPress={() => navigation.navigate('forgetpass')}>
          <Text style={styles.Fpassword}>forget my password</Text>
        </TouchableOpacity>

        <View style={styles.ORContainer}>
          <Text style={styles.Desh}></Text>
          <Text style={styles.ORText}>or</Text>
          <Text style={styles.Desh}></Text>
        </View>
        <Text style={styles.SigninText}>sign in with</Text>
        <View style={styles.AuthCon}>
          <TouchableOpacity style={styles.Facebook}>
            <Image
              style={{
                height: scale(30),
                width: scale(30),
              }}
              source={require('../../Assets/Images/facebook.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={signIn}>
            <Image
              style={{
                height: scale(42),
                width: scale(42),
              }}
              source={require('../../Assets/Images/google.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: scale(10),
          }}>
          <Text style={styles.SignUpText1}>Don't have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('accountype',{userData: null})}>
            <Text style={styles.SignUpText}>sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <IncorrectModal
          text={'Invalid email or pasword'}
          onPress={() => setCheck(false)}
          onBackdropPress={() => setCheck(false)}
          isVisible={check}
        />
      <Loader
        onBackdropPress={() => setLoader(false)}
        isVisible={loader}
        /> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    backgroundColor: 'black',
  },
  ImgContainer: {
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
  },
  TextStyle: {
    // height: scale(30),
    fontFamily: 'muslish',
    fontSize: moderateScale(16),
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'grey',
    // backgroundColor: 'red',
  },
  Fpassword: {
    textAlign: 'center',
    fontFamily: 'muslish',
    fontSize: moderateScale(13),
    fontStyle: 'normal',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#05BC03',
    marginVertical: verticalScale(5),
  },
  ORContainer: {
    height: scale(40),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  Desh: {
    height: 0,
    borderWidth: 1,
    width: scale(120),
    borderColor: '#CBC0C0',
  },
  ORText: {
    height: scale(30),
    width: scale(40),
    textAlign: 'center',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: moderateScale(20),
    color: '#CBC0C0',
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
    marginLeft: moderateScale(7),
  },
  Facebook: {
    backgroundColor: '#0163E0',
    height: scale(40),
    width: scale(40),
    borderRadius: 100,
    marginRight: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  AuthCon: {
    height: scale(50),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(10),
  },
  SigninText: {
    fontFamily: 'open sans',
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: moderateScale(17),
    color: '#CBC0C0',
    letterSpacing: scale(0.6),
    marginTop: scale(10),
  },
})
export default Login
