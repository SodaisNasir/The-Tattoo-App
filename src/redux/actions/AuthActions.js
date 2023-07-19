import AsyncStorage from '@react-native-async-storage/async-storage'
import {USER_DETAILS, IS_SIGN_IN, OTP, ROLE_ID, SOCIAL_DATA} from '../reducer/Holder'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';
import { base_Url } from '../../Utils/BaseUrl';

export const sign_in = (data,setLoader,device,setCheck) => {
  return async (dispatch) => {
    setLoader(true)
    try {
      const notiToken = await AsyncStorage.getItem('onesignaltoken')
      let baseUrl = `${base_Url}login`
      let myData = new FormData()
      
      myData.append('email',data.email)
      myData.append('password',data.password)
      myData.append('device',device)
      myData.append('device_token', notiToken);

      const response = await fetch(baseUrl,{
        method: 'POST',
        body: myData
      })
      const responseData = await response.json()

      if(responseData?.success?.status == 200){
        console.log('Laraib D.')
        setLoader(false)
        dispatch({type: USER_DETAILS, payload: responseData.success})
        dispatch({type: ROLE_ID, payload: responseData.success.data.role_id})
        await AsyncStorage.setItem('user_details', JSON.stringify(responseData.success))
      }else{
        setLoader(false)
        console.log('else error')
        setCheck(true)
      }
    } catch (error) {
      setLoader(false)
      console.log('error', error)
    }
  }
}
export const googleSignin = navigation => {
  return async dispatch => {
    try {
      GoogleSignin.configure({
        webClientId:
          Platform.OS == 'android'
            ? '275975228445-7geeba9utk60j0pi9kesmkbjcnlo0e9d.apps.googleusercontent.com'
            : '275975228445-badi13752esa7uunee4uf2optd6c7ond.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)

        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const socialObj = {
        email: userInfo.user.email ? userInfo.user.email : '',
        firstName: userInfo.user.givenName,
        lastName: userInfo.user.familyName,
        picUrl: userInfo.user.photo,
        uID: userInfo.user.id,
      };

      console.log('socialObj', socialObj)

      dispatch(social_signin(socialObj, navigation));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('You cancelled the sign in.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google sign In operation is in process');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available');
      } else {
        console.log(
          'Something unknown went wrong with Google sign in. ' + error.message,
        );
      }
    }
  };
};
export const social_signin = (data, navigation) => {
  return async dispatch => {
    const notificationToken = await AsyncStorage.getItem('onesignaltoken');
    try {
      let base_url = `${base_Url}social-id`;
      let myData = new FormData();

      myData.append('device_token', notificationToken);
      myData.append('social_id', data.uID);

      const response = await fetch(base_url, {
        method: 'post',
        body: myData,
      });
      const responseData = await response.json();
      console.log('responseData', responseData)
      
      if (responseData?.success?.status === 200) {
        console.log('Laraib D.')
        const userDetail = JSON.stringify(responseData?.success);
        dispatch({type: USER_DETAILS, payload: responseData?.success});
        dispatch({type: ROLE_ID, payload: responseData.success.data.role_id})
        await AsyncStorage.setItem('user_details', userDetail);
      } else {
        const notification_token = await AsyncStorage.getItem('onesignaltoken');
        await dispatch({type: SOCIAL_DATA, payload: data});
        navigation.navigate('accountype', {
          UserData: data,
          notification_token: notification_token,
        });
      }
    } catch (error) {
      console.log('error', error);
      // navigation.navigate('accountype', {
      //   UserData: data,
      // });
    }
  };
};
export const VerifyEmailBR =  (data,role_id,navigation,type,profileImage,coverImage,setLoader) => {
  return async (dispatch) => {
    setLoader(true)
    try {
      let baseUrl = `${base_Url}verify-before-register`
      let myData = new FormData()
  console.log('data', data)
      myData.append('email',data.email)
      myData.append('name',data.fname ? data.fname : data.c_name)
  
      const response = await fetch(baseUrl,{
        method: 'post',
        body: myData
      })
  
      const responseData = await response.json()
      console.log('responseData', responseData)
  
      if(responseData?.success?.status === 200){
        setLoader(false)
        dispatch({type: OTP, payload: responseData.success.OTP})
        if(type == 'signup'){
          navigation.navigate('otp',{
            role_id:role_id,
            data:data,
            type: type,
            profile_image : profileImage,
            cover_image  :coverImage
          })
        }
      }else{
        setLoader(false)
      }
    } catch (error) {
      console.log('VerifyEmailBR error', error)
      setLoader(false)
    }
  }
}
export const Register = (data,role_id,device,profile_image,cover_image,setLoader,UserData) => {
  return async (dispatch) => {
    setLoader(true)
    try {
      const notiToken = await AsyncStorage.getItem('onesignaltoken')
      let baseUrl = `${base_Url}register`
      let myData = new FormData()
      
      myData.append('role_id',role_id)
      myData.append('name',data.fname ? data.fname : data.c_name)
      myData.append('email',data.email)
      myData.append('address',data.address)
      myData.append('password',data.password)
      myData.append('password_confirmation',data.confirm_password)
      myData.append('device',device)
      myData.append('device_token',notiToken)
      {role_id === '2' && myData.append('business_name',data?.b_name)}
      {role_id === '2' && myData.append('profile_image',profile_image)}
      {role_id === '2' && myData.append('cover_image',cover_image)}
      {UserData != null && myData.append('social_id',UserData.uID)}

    
      const response = await fetch(baseUrl,{
        method: 'POST',
        body: myData
      })
      const responseData = await response.json()
      console.log('responseData', responseData)
  
      if(responseData?.success?.status == 200){
        setLoader(false)
        dispatch({type: USER_DETAILS, payload: responseData.success})
        dispatch({type: ROLE_ID, payload: responseData.success.data.role_id})
        await AsyncStorage.setItem('user_details', JSON.stringify(responseData.success))
      }else{
        setLoader(false)
        console.log('else error')
      }
    } catch (error) {
      setLoader(false)
      console.log('Register error', error)
    }
  }
}
export const VerifyEmailBP =  (data,navigation,type,setLoader,setCheck) => {
  return async (dispatch) => {
    setLoader(true)
    try {
      let baseUrl = `${base_Url}verify`
      let myData = new FormData()
  
      myData.append('email',data.email)
  
      const response = await fetch(baseUrl,{
        method: 'post',
        body: myData
      })
  
      const responseData = await response.json()
      console.log('responseData', responseData)
  
      if(responseData?.success?.status === 200){
        dispatch({type: OTP, payload: responseData.success.Reset_code}) 
        setLoader(false)
        if(type == 'forgot'){
          navigation.navigate('otp',{
            data:data,
            type: type,
            id:responseData.success.id
          })
        }
      }else{
        setLoader(false)
        setCheck(true)
      }
    } catch (error) {
      console.log('VerifyEmailBP error', error)
      setLoader(false)
    }
  }
}
export const ResetPassword = async (data,navigation,id,setLoader,setCheck) => {
    setLoader(true)
    try {
      let baseUrl = `${base_Url}resetpassword/${id}`
      let myData = new FormData()
  
      myData.append('password',data.password)
      myData.append('password_confirmation',data.confirm_Password)
  
      const response = await fetch(baseUrl,{
        method: 'post',
        body: myData
      })
  
      const responseData = await response.json()
      console.log('responseData', responseData)
  
      if(responseData?.success?.status === 200){
        setLoader(false)
        setCheck(true)
        setTimeout(() => {
          setCheck(false)
          navigation.navigate('login')
        }, 2000);
      }else{
        setLoader(false)
        
      }
    } catch (error) {
      console.log('VerifyEmailBP error', error)
      setLoader(false)
    }
}
export const ChnagePasrwd = async (data,navigation,userDetails,setLoader,setCheck,setCheck2) => {
    setLoader(true)
    try {
      let baseUrl = `${base_Url}changed-password/${userDetails.data.id}`
      let myData = new FormData()
  
      myData.append('password',data.confirm_Password)
      myData.append('old_password',data.current_Password)
  
      const response = await fetch(baseUrl,{
        method: 'post',
        body: myData
      })
  
      const responseData = await response.json()
      console.log('responseData', responseData)
      if(responseData?.error?.message == "Old password Incorrect"){
        setCheck2(true)
      }
  
      if(responseData?.success?.status === 200){
        setLoader(false)
        setCheck(true)
        setTimeout(() => {
          setCheck(false)
          navigation.goBack()
        }, 2000);
      }else{
        setLoader(false)
        
      }
    } catch (error) {
      console.log('VerifyEmailBP error', error)
      setLoader(false)
    }
}