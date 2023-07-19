import React, {useState} from 'react'
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
import {moderateScale, s, scale, verticalScale} from 'react-native-size-matters'
import BackArrow from '../../Components/BackArrow'
import CustomButton from '../../Components/CustomButton'
import CustomInput from '../../Components/CustomInput'
import Validation from '../../Components/Validation'
import { useDispatch } from 'react-redux'
import { VerifyEmailBP } from '../../redux/actions/AuthActions'
import Loader from '../../Components/Modal/LoaderModal'
import IncorrectModal from '../../Components/Modal/IncorrectModal'

const ForgetPass = ({navigation}) => {
  const dispatch = useDispatch()

  const [loader, setLoader] = useState(false);
  const [check, setCheck] = useState(false)

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'})

  const onSubmit = (data) => {
    dispatch(VerifyEmailBP(data,navigation,'forgot',setLoader,setCheck))
  }

  return (
    <SafeAreaView style={styles.MainContainer}>
      <BackArrow onPress={() => navigation.goBack()} />
      <Loader
   onBackdropPress={() => setLoader(false)}
   isVisible={loader}
/> 
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.Texts}>Forget Password</Text>
        <Text style={styles.Texts1}>Lorem ispemLorem ispem Lorem ispem</Text>

        <CustomInput
          InputUText={'Your Email'}
          name="email"
          rules={{
            required: 'Email is required',
          }}
          control={control}
          style={styles.textInput}
          textStyle={styles.InputTextStyle}
          keyboardType={'email-address'}
          restyle={{
            height: scale(42),
          }}
        />
        {errors.Email && <Validation title={errors.email.message} />}
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          text={'Continue'}
          restyle={{
            marginBottom: scale(20),
          }}
        />

        <View style={{alignItems: 'center', marginTop: scale(25)}}>
          <Image source={require('../../Assets/Images/logo.png')} />
        </View>
      </ScrollView>

      <IncorrectModal
          text={'Email does not exist!'}
          onPress={() => setCheck(false)}
          onBackdropPress={() => setCheck(false)}
          isVisible={check}
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
export default ForgetPass
