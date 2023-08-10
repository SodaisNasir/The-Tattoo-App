import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native'
import { moderateScale, s, scale, verticalScale } from 'react-native-size-matters'
import BackArrow from '../../Components/BackArrow'
import CustomButton from '../../Components/CustomButton'
import CustomInput from '../../Components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { Register, VerifyEmailBP, VerifyEmailBR } from '../../redux/actions/AuthActions'
import Loader from '../../Components/Modal/LoaderModal'
import IncorrectModal from '../../Components/Modal/IncorrectModal'
import BackArrwBtn from '../../Components/BackArrow/BackArrwBtn'

const Otp = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { role_id, data, type, profile_image, cover_image, id } = route.params
  const otp = useSelector((state) => state.otp)
  const [loader, setLoader] = useState(false);
  const [counter, setCounter] = useState(50)
  const [check, setCheck] = useState(false)
  const [check2, setCheck2] = useState(false)


  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
    return () => clearInterval(timer)
  }, [counter])

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' })

  const device = Platform.OS

  const onSubmit = (item) => {
    if (item.otp == otp) {
      if (type == 'forgot') {
        setLoader(true)
        setTimeout(() => {
          setLoader(false)
          navigation.navigate('resetpass', { id: id })
        }, 1500);
      } else if (type == 'signup') {
        dispatch(Register(data, role_id, device, profile_image, cover_image, setLoader))
      } else {
        console.log('first')
      }
    } else {
      setCheck(true)
    }

  }
  const resendOtp = () => {
    const rendType = 'resnd'
    if (type == 'signup') {
      dispatch(VerifyEmailBR(data, role_id, navigation, rendType, profile_image, cover_image, setLoader, setCheck2))
      setCounter(50)
    } else if (type == 'forgot') {
      dispatch(VerifyEmailBP(data, navigation, rendType, setLoader))
      setCounter(50)
    }
  }
  return (
    <SafeAreaView style={styles.MainContainer}>
      <BackArrwBtn onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.Texts}>Enter The OTP</Text>
        <Text style={styles.Texts1}>{otp}</Text>

        <CustomInput
          name="otp"
          rules={{
            required: 'Otp is required',
          }}
          control={control}
          style={styles.textInput}
          textStyle={styles.InputTextStyle}
          keyboardType={'number-pad'}
          restyle={{
            height: scale(44),
            textAlign: 'center',


          }}
          maxLength={4}
        />
        {/* {errors.Email && <Validation title={errors.Email.message} />} */}
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          text={'verify'}
          restyle={{
            marginBottom: scale(20),
          }}
        />

        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../Assets/Images/logo.png')} />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: scale(90),
          }}>
          <Text style={styles.SignUpText1}>
            You can resend the code after {counter} sec
          </Text>
          {
            counter == 0 ?
              <TouchableOpacity onPress={() => resendOtp()}>
                <Text style={styles.SignUpText}>click here</Text>
              </TouchableOpacity>
              :
              <Text style={[styles.SignUpText, { color: 'white' }]}>click here</Text>
          }
        </View>
      </ScrollView>

      <IncorrectModal
        text={'Incorrect Otp'}
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
    paddingTop: scale(10),
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
export default Otp
