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
import {moderateScale, s, scale, verticalScale} from 'react-native-size-matters'
import BackArrow from '../../Components/BackArrow'
import CustomButton from '../../Components/CustomButton'
import CustomInput from '../../Components/CustomInput'
import { ChnagePasrwd } from '../../redux/actions/AuthActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Components/Modal/LoaderModal'
import TickModal from '../../Components/Modal/TickModal'
import Validation from '../../Components/Validation'
import IncorrectModal from '../../Components/Modal/IncorrectModal'

const ChangePass = ({navigation}) => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user_details)
  const [password, setPassword] = useState('')
  const [isPasswordSecure, setIsPasswordSecure] = useState(true)
  const [loader, setLoader] = useState(false);
  const [password1, setPassword1] = useState('')
  const [isPasswordSecure1, setIsPasswordSecure1] = useState(true)
  const [password3, setPassword3] = useState('')
  const [isPasswordSecure3, setIsPasswordSecure3] = useState(true)
  const [check, setCheck] = useState(false)
  const [check2, setCheck2] = useState(false)
  const [index, setIndex] = useState(99)

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors, isValid},
  } = useForm({mode: 'all'})
  const confirmPasswordRef = useRef()


  const onSubmit =  (data) => {
ChnagePasrwd(data,navigation,userData,setLoader,setCheck,setCheck2)
  }

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <BackArrow onPress={() => navigation.goBack()} />
        <Text style={styles.Texts}>Change Password</Text>
        <Text style={styles.Texts1}>Lorem ispemLorem ispem Lorem ispem</Text>

        <CustomInput
          InputUText="Current Password"
          secureTextEntry={isPasswordSecure}
          textContentType={'password'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          name="current_Password"
          rules={{
            required: 'Current Password is required',
          }}
          control={control}
          style={styles.textInput}
          textStyle={styles.InputTextStyle}
          //   placeholder={'Confirm Password'}
          keyboardType={'default'}
          PIname={isPasswordSecure ? 'eye-off' : 'eye'}
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
        {errors.current_Password && <Validation title={errors.current_Password.message} />}

        <CustomInput
          InputUText="New Password"
          secureTextEntry={isPasswordSecure1}
          textContentType={'password'}
          value={password1}
          onChangeText={(text1) => setPassword1(text1)}
          name="new_Password"
          rules={{
            required: 'New Password is required',
            minLength: {
              value: 8,
              message: 'New Password too short (minimum length is 8)',
            },
          }}
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
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
          onFocus={() => {
            setIndex(1)
          }}
          password={true}
        />
        {errors.new_Password && <Validation title={errors.new_Password.message} />}
        <CustomInput
          InputUText="Confirm Password"
          secureTextEntry={isPasswordSecure3}
          textContentType={'password'}
          value={password3}
          onChangeText={(text3) => setPassword3(text3)}
          name="confirm_Password"
          rules={{
            required: 'Confirm Password is required',
            minLength: {
              value: 8,
              message:  'Confirm Password too short (minimum length is 8)',
            },
            maxLength: {
              value: 16,
              message: 'Confirm Password too long (maximum length is 16)',
            },
            validate: {
              positive: (value) =>
                value === watch('new_Password') || 'Confirm The passwords do not match',
            },
          }}
          ref={(e) => (confirmPasswordRef.current = e)}
          control={control}
          password={true}
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
            isPasswordSecure3
              ? setIsPasswordSecure3(false)
              : setIsPasswordSecure3(true)
          }}
          Hello={{
            height: scale(75),
          }}
          restyle={{
            height: scale(43),
          }}
        />
        {/* {errors.Email && <Validation title={errors.Email.message} />} */}
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          text={'Continue'}
        />

        <View style={{alignItems: 'center', marginTop: scale(25)}}>
          <Image source={require('../../Assets/Images/logo.png')} />
        </View>
      </ScrollView>
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
            <IncorrectModal
          text={'Incorrect Current Password'}
          onPress={() => setCheck2(false)}
          onBackdropPress={() => setCheck2(false)}
          isVisible={check2}
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
export default ChangePass
