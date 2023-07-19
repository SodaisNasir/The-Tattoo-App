import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {scale} from 'react-native-size-matters'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BackArrow from '../../Components/BackArrow'
import CustomButton from '../../Components/CustomButton'
import CustomInput from '../../Components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { launchImageLibrary } from 'react-native-image-picker'
import { editProfile } from '../../redux/actions/UserActions'
import { Email_Regex, base_image_Url } from '../../Utils/BaseUrl'
import Loader from '../../Components/Modal/LoaderModal'
import TickModal from '../../Components/Modal/TickModal'
import Validation from '../../Components/Validation'

const EditProfile = ({navigation}) => {
    const dispatch = useDispatch()
  const userData = useSelector(state => state.user_details)

  const [saveImage, setSaveImage] = useState({})
  const [saveImage2, setSaveImage2] = useState({})
  const [loader, setLoader] = useState(false);
  const [check, setCheck] = useState(false)


  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all',
  defaultValues: {
    fname: userData?.data?.name,
    email: userData?.data?.email,
    address: userData?.data?.address,
    b_name: userData?.data?.business_name,
    c_name: userData?.data?.name,
  },
})

const filessave = () => {
  let options = {
    storageOptions: {
      mediaType: 'photo',
      path: 'image',
      includeExtra: true,
    },
  }

  launchImageLibrary(options, (res) => {
    // console.log(res)
    if (res.didCancel) {
      // console.log('User cancelled image picker')
    } else if (res.error) {
      // console.log('ImagePicker Error: ', res.error)
    } else if (res.customButton) {
      // console.log('User tapped custom button: ', res.customButton)
      alert(res.customButton)
    } else {
      setSaveImage({
        name: res.assets?.[0]?.fileName,
        uri: res.assets?.[0]?.uri,
        type: res.assets?.[0]?.type,
      })
    }
  })
}
const profileImg = () => {
  let options = {
    storageOptions: {
      mediaType: 'photo',
      path: 'image',
      includeExtra: true,
    },
  }

  launchImageLibrary(options, (res) => {
    // console.log(res)
    if (res.didCancel) {
      // console.log('User cancelled image picker')
    } else if (res.error) {
      // console.log('ImagePicker Error: ', res.error)
    } else if (res.customButton) {
      // console.log('User tapped custom button: ', res.customButton)
      alert(res.customButton)
    } else {
      setSaveImage2({
        name: res.assets?.[0]?.fileName,
        uri: res.assets?.[0]?.uri,
        type: res.assets?.[0]?.type,
      })
    }
  })
}
// userData.data.role_id === '2'
const submitProfile = (data) => {
  dispatch(editProfile(data,saveImage2,saveImage,setLoader,setCheck,navigation))
}
  return (
    <SafeAreaView style={styles.MainContainer}>
    <ScrollView showsVerticalScrollIndicator={false} >
      <View style={styles.ProContainer}>
        <BackArrow
          onPress={() => navigation.goBack()}
          restyle={{
            position: 'absolute',
            top: scale(20),
            left: scale(20),
            zIndex: 10,
          }}
        />
        <Image 
        style={{
          height: '100%',
          width: '100%'
        }}
        source={{uri: saveImage?.uri ? saveImage?.uri : `${base_image_Url}` + userData?.data?.cover_image }}
        resizeMode='cover'
        />
      </View>
        <View style={[styles.ImgCon,{overflow:'hidden'}]}>
        <Image 
        style={{
          height: '100%',
          width: '100%'
        }}
        source={{uri: saveImage2?.uri ? saveImage2?.uri : `${base_image_Url}` + userData?.data?.profile_image}}
        resizeMode='cover'
        />
        </View>
          <TouchableOpacity style={{
             height: scale(25),
             width: scale(25),
             backgroundColor: '#FFFFFF',
             borderRadius: 100,
             justifyContent: 'center',
             alignItems: 'center',
             position: 'absolute',
             left: scale(200),
             top: scale(185),
            zIndex: 99
          }} onPress={profileImg}>
          <FontAwesome name="plus" size={16} color={'#05BC03'} />
        </TouchableOpacity>

      <TouchableOpacity style={styles.ProEdit} onPress={filessave}>
        <FontAwesome name="pencil" size={22} color={'#05BC03'} />
      </TouchableOpacity>

      <View style={{paddingHorizontal: scale(20),height: '100%',marginTop: userData.data.role_id === '2'? scale(80) : 0}}>
        {
          userData.data.role_id === '2' ?
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
        value: Email_Regex,
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
          :
         <>
          <CustomInput
            InputUText={'Full Name'}
            textContentType={'text'}
            name="fname"
            rules={{
              required: 'Full name is required',
            }}
            control={control}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            keyboardType={'default'}
            Hello={{
              marginTop: scale(55),
              height: scale(75),
            }}
          />
        <CustomInput
          InputUText={'Email'}
          textContentType={'text'}
          name="email"
          rules={{
            required: 'Email is required',
          }}
          control={control}
          style={styles.textInput}
          textStyle={styles.InputTextStyle}
          keyboardType={'default'}
          Hello={{
            height: scale(75),
          }}
        />
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
            height: scale(45),
          }}
        />

        <CustomButton
          onPress={handleSubmit(submitProfile)}
          text={'save changes'}
          restyle={{
            marginTop: scale(25),
          }}
        />
      </View>
    </ScrollView>
    <Loader
 onBackdropPress={() => setLoader(false)}
 isVisible={loader}
/> 
<TickModal
        text={'Your profile has been successfully updated!'}
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
      backgroundColor: 'black',
      // paddingHorizontal: scale(20),
    },
    ProContainer: {
      height: scale(150),
      backgroundColor: '#D99898',
    },
    ImgCon: {
      height: scale(120),
      width: scale(120),
      backgroundColor: '#05BC03',
      borderRadius: 100,
      position: 'absolute',
      // bottom: scale(-50),
      left: scale(115),
      top: scale(90)
    },
    ProEdit: {
      height: scale(34),
      width: scale(34),
      backgroundColor: '#FFFFFF',
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: scale(20),
      top: scale(105),
    },
  })
export default EditProfile
