import AsyncStorage from '@react-native-async-storage/async-storage'
import {USER_DETAILS, IS_SIGN_IN, OTP, ROLE_ID, SOCIAL_DATA, ALLTATTO, SKINTONES, ALLCREATORS} from '../reducer/Holder'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';
import { base_Url } from '../../Utils/BaseUrl';

export const getAllTatto = () => {
    return async (dispatch) => {
     const  userDetails =  await AsyncStorage.getItem('user_details')
     const cnvrtData = JSON.parse(userDetails)
     try {
         let baseUrl = `${base_Url}tattoo/${cnvrtData.data.id}`

  
      const response = await fetch(baseUrl,{
        method: 'get',
      })
  
      const responseData = await response.json()
      if(responseData?.success?.status === 200){
        dispatch({type: ALLTATTO, payload: responseData?.success?.data})
      }
            
        } catch (error) {
            console.log('error', error)
        }
    }
}
export const getSkinTones = () => {
  return async (dispatch) => {
   try {
       let baseUrl = `${base_Url}all-skin`


    const response = await fetch(baseUrl,{
      method: 'get',
    })

    const responseData = await response.json()
    if(responseData?.success?.status === 200){
      dispatch({type: SKINTONES, payload: responseData?.success?.data})
    }
          
      } catch (error) {
          console.log('error', error)
      }
  }
}
export const getCreators = () => {
  return async (dispatch) => {
   try {
       let baseUrl = `${base_Url}creator`


    const response = await fetch(baseUrl,{
      method: 'get',
    })

    const responseData = await response.json()
    if(responseData?.success?.status === 200){
      dispatch({type: ALLCREATORS, payload: responseData?.success?.data})
    }
          
      } catch (error) {
          console.log('error', error)
      }
  }
}
export const submitTattoEntry = async (selectedImages,tag,skin,setLoader,setCheck,navigation) => {
  setLoader(true)
    const  userDetails =  await AsyncStorage.getItem('user_details')
    const cnvrtData = JSON.parse(userDetails)
   try {
       let baseUrl = `${base_Url}store-tattoo/${cnvrtData.data.id}`
       let myData = new FormData()

       myData.append('tag',tag)
       myData.append('skin_tone',skin)
       selectedImages.forEach((image, index) => {
        myData.append(`image[${index + 1}]`, {
          uri: image.uri,
          type: image.type,
          name: image.name,
        });
      });


    const response = await fetch(baseUrl,{
      method: 'post',
      body:myData
    })

    const responseData = await response.json()
    
    if(responseData?.success?.status === 200){
      setLoader(false)
      console.log('responseData', responseData)
      setCheck(true)
      setTimeout(() => {
        setCheck(false)
        navigation.goBack()
      }, 2000);
    }else{
      setLoader(false)
    }
          
      } catch (error) {
          console.log('submitTattoEntry error', error)
          setLoader(false)
      }
}
export const editProfile = (data,profile_image,cover_image,setLoader,setCheck,navigation) => {
  setLoader(true)
  return async (dispatch) => {
    const  userDetails =  await AsyncStorage.getItem('user_details')
    const cnvrtData = JSON.parse(userDetails)
    try {

      let baseUrl = `${base_Url}edit-profile/${cnvrtData.data.id}`
      let myData = new FormData()

      myData.append('name',data.fname ? data.fname : data.c_name)
      myData.append('email',data.email)
      myData.append('address',data.address)
      {profile_image?.uri  && myData.append('profile_image',profile_image)}
      {cover_image?.uri  && myData.append('cover_image',cover_image)}

      {cnvrtData.data.role_id === '2' && myData.append('business_name',data?.b_name)}


   const response = await fetch(baseUrl,{
     method: 'post',
     body:myData
   })

   const responseData = await response.json()
   console.log('responseData', responseData)

   if(responseData?.success?.status == 200){
    setLoader(false)
    setCheck(true)
    setTimeout(() => {
      setCheck(false)
      navigation.goBack()
    }, 2500);
    dispatch({type: USER_DETAILS, payload: responseData.success})
    dispatch({type: ROLE_ID, payload: responseData.success.data.role_id})
    await AsyncStorage.setItem('user_details', JSON.stringify(responseData.success))
   }else{
    setLoader(false)
   }
      
    } catch (error) {
      setLoader(false)
      console.log('editProfile erroe', error)
    }
  }
}
export const creatorAddUser = async (data, setBtn1,setBtn2,setChooseColor) => {
  const  userDetails =  await AsyncStorage.getItem('user_details')
  const cnvrtData = JSON.parse(userDetails)
  try {

    let baseUrl = `${base_Url}create-user/${cnvrtData.data.id}`
    let myData = new FormData()

    myData.append('email',data.email)
    myData.append('name',data.f_name)

  
    const response = await fetch(baseUrl,{
      method: 'post',
      body: myData
    })

    const responseData = await response.json()
    if(responseData?.success?.status === 200){
    alert('first')
    setBtn1(true),
    setBtn2(false),
    setChooseColor(false)
    }
  } catch (error) {
    console.log('error', error)
  }
}
export const getSkinTone = async (code,setData) => {
  try {
    let baseUrl = `${base_Url}skin-tattoo`
    let myData = new FormData()

    myData.append('skin_tone',code)

  
    const response = await fetch(baseUrl,{
      method: 'post',
      body: myData
    })

    const responseData = await response.json()
    console.log('responseData', responseData)
    if(responseData?.success?.status === 200){
      setData(responseData?.success?.data)
    }
  } catch (error) {
    console.log('error', error)
  }
}