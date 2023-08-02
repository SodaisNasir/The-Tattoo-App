import React, {useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Platform,
} from 'react-native'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters'
import BackArrow from '../../Components/BackArrow'
import CustomButton from '../../Components/CustomButton'
import CustomInput from '../../Components/CustomInput'
import Validation from '../../Components/Validation'
import ButtonWithImg from '../../Components/ButtonWithImg'
import { Email_Regex } from '../../Utils/BaseUrl'
import { Register, VerifyEmailBR } from '../../redux/actions/AuthActions'
import { useDispatch } from 'react-redux'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import Loader from '../../Components/Modal/LoaderModal'
import BackArrwBtn from '../../Components/BackArrow/BackArrwBtn'

const SignUp = ({navigation,route}) => {
  const dispatch = useDispatch()
  const {role_id,UserData} = route.params
  const [password, setPassword] = useState('')
  const [isPasswordSecure, setIsPasswordSecure] = useState(true)
  const [isEnabled, setIsEnabled] = useState(true)
  const [password2, setPassword2] = useState('')
  const [isPasswordSecure2, setIsPasswordSecure2] = useState(true)
  const [coverImage, setCoverImage] = useState({})
  const [profileImage, setProfileImage] = useState({})
  const confirmPasswordRef = useRef()
  const [loader, setLoader] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      fname: role_id == 1 && UserData != null ? UserData?.firstName + ' ' + UserData?.lastName : '',
      c_name: role_id == 2 && UserData != null ? UserData?.firstName + ' ' + UserData?.lastName : '',
      email: UserData?.email,
    },
  })
  const device = Platform.OS

  const coverSave = () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
      selectionLimit: 1,
    }

    launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        // console.log('User cancelled image picker')
      } else if (res.error) {
        // console.log('ImagePicker Error: ', res.error)
      } else if (res.customButton) {
        // console.log('User tapped custom button: ', res.customButton)
        alert(res.customButton)
      } else {
        // setModalVisible(false)
        setCoverImage({
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        })
        // setShow2(false)
      }
    })
  }
  const profileSave = () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
      selectionLimit: 1,
    }

    launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        // console.log('User cancelled image picker')
      } else if (res.error) {
        // console.log('ImagePicker Error: ', res.error)
      } else if (res.customButton) {
        // console.log('User tapped custom button: ', res.customButton)
        alert(res.customButton)
      } else {
        // setModalVisible(false)
        setProfileImage({
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        })
        // setShow2(false)
      }
    })
  }
  const onSubmit = (data) => {
   const type = 'signup'
   if(UserData){
    dispatch(Register(data,role_id,device,profileImage,coverImage,setLoader,UserData))
   }else{
     dispatch(VerifyEmailBR(data,role_id,navigation,type,profileImage,coverImage,setLoader))
   }
  }

  return (
    <SafeAreaView style={styles.MainContainer}>
     <BackArrwBtn onPress={() => navigation.goBack()}/>
    <Loader
   onBackdropPress={() => setLoader(false)}
   isVisible={loader}
/> 
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image
          style={{
            height: scale(160),
          }}
          resizeMode="contain"
          source={require('../../Assets/Images/logo.png')}
        />
      </View>

{
    role_id == '2' ?
<>
    <CustomInput
    InputUText="Business Name"
    name="b_name"
    rules={{
        required: 'Business Name is required',
    }}
    control={control}
    style={styles.textInput}
    textStyle={styles.InputTextStyle}
    //   placeholder={'Business Name'}
    keyboardType={'default'}
    Hello={{
        height: scale(75),
    }}
    restyle={{
        height: scale(43),
    }}
    />
  {errors.b_name && <Validation title={errors.b_name.message} />} 
  <CustomInput
        InputUText="Contact Name"
        name="c_name"
        rules={{
          required: 'Contact Name is required',
        }}
        control={control}
        style={styles.textInput}
        textStyle={styles.InputTextStyle}
        //   placeholder={'Contact Name'}
        keyboardType={'default'}
        Hello={{
          height: scale(75),
        }}
        restyle={{
          height: scale(43),
        }}
      />
      {errors.c_name && <Validation title={errors.c_name.message} />}
      <CustomInput
        InputUText="Business Email"
        name="email"
        rules={{
          required: 'Business Email is required',
          pattern: {
            value: Email_Regex,
            message: 'Enter a valid Email',
          },
        }}
        control={control}
        style={styles.textInput}
        textStyle={styles.InputTextStyle}
        //   placeholder={'Business Email'}
        keyboardType={'email-address'}
        Hello={{
          height: scale(75),
        }}
        restyle={{
          height: scale(43),
        }}
      />
     {errors.email && <Validation title={errors.email.message} />} 
     <Text style={styles.ImageText}>profile image</Text>
     <ButtonWithImg onPress={() => profileSave()} img={profileImage}/>

      <Text style={styles.ImageText}>cover image</Text>
      <ButtonWithImg onPress={() => coverSave()} img={coverImage}/>
     
    </>
: 
<>
<CustomInput
        InputUText="Full Name"
        name="fname"
        rules={{
          required: 'Full Name is required',
        }}
        control={control}
        style={styles.textInput}
        textStyle={styles.InputTextStyle}
        //   placeholder={'Full Name'}
        keyboardType={'default'}
        Hello={{
          height: scale(75),
        }}
        restyle={{
          height: scale(43),
        }}
      />
      {errors.fname && <Validation title={errors.fname.message} />}
<CustomInput
InputUText="Email"
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
//   placeholder={'Business Email'}
keyboardType={'email-address'}
Hello={{
  height: scale(75),
}}
restyle={{
  height: scale(43),
}}
/>
{errors.email && <Validation title={errors.email.message} />} 
</>
}


   
      <CustomInput
        InputUText="Address"
        name="address"
        rules={{
          required: 'Address is required',
        }}
        control={control}
        style={styles.textInput}
        textStyle={styles.InputTextStyle}
        //   placeholder={'Address'}
        keyboardType={'default'}
        Hello={{
          height: scale(75),
        }}
        PIname={'location'}
        PIsize={20}
        PIcolor={'#05BC03'}
        PIstylye={{
          position: 'relative',
          bottom: scale(32),
          left: scale(270),
        }}
        restyle={{
          height: scale(43),
        }}
      />
      {errors.address && <Validation title={errors.address.message} />}

     

     {UserData == null &&
     <>
     <CustomInput
       InputUText="Password"
       name="password"
       secureTextEntry={isPasswordSecure}
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
       textContentType={'password'}
       control={control}
       maxLength={20}
       //   placeholder={'Address'}
       keyboardType={'default'}
       PIname={isPasswordSecure ? 'eye-off' : 'eye'}
       PIsize={20}
       PIcolor={'#05BC03'}
       PIstylye={{
         position: 'relative',
         bottom: scale(32),
         left: scale(270),
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
       name="confirm_password"
       InputUText="Confirm Password"
       textContentType={'password'}
       secureTextEntry={isPasswordSecure2}
       value={password2}
       onChangeText={(text) => setPassword2(text)}
       rules={{
        required: 'Confirm password is required',
        minLength: {
          value: 8,
          message: 'Password too short (minimum length is 8)',
        },
        maxLength: {
          value: 16,
          message: 'Password too long (maximum length is 16)',
        },
        validate: {
          positive: value =>
            value === watch('password') || 'The passwords do not match',
        },
      }}
       control={control}
       //   placeholder={'Confirm Password'}
       keyboardType={'default'}
       PIname={isPasswordSecure2 ? 'eye-off' : 'eye'}
       PIsize={20}
       PIcolor={'#05BC03'}
       PIstylye={{
         position: 'relative',
         bottom: scale(32),
         left: scale(270),
       }}
       maxLength={20}
       onPress={() => {
         isPasswordSecure2
           ? setIsPasswordSecure2(false)
           : setIsPasswordSecure2(true)
       }}
       Hello={{
         height: scale(75),
       }}
       restyle={{
         height: scale(43),
       }}
     />
     {errors.confirm_password && <Validation title={errors.confirm_password.message} />}
     </>
      }
      <CustomButton
        text={'sign up'}
        stylz={{
          marginTop: scale(30),
        }}
        // onPress={() => navigation.navigate('bothotp')}
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: 'black',
      paddingHorizontal: scale(20),
      paddingTop: scale(15),
    },
    ImageText: {
      color: 'lightgrey',
      textTransform: 'capitalize',
      position: 'relative',
      top: scale(1),
      fontFamily: 'open sans',
      fontSize: moderateScale(14),
      fontStyle: 'normal',
      fontWeight: '600',
    },
  })
export default SignUp
