import AsyncStorage from '@react-native-async-storage/async-storage'
import {USER_DETAILS, IS_SIGN_IN, OTP, ROLE_ID, SOCIAL_DATA, ALLTATTO, SKINTONES, ALLCREATORS, ALLUSERS, RANDOMPROFILE, LIKED_TATTO} from '../reducer/Holder'
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
        console.log('getAllTatto',responseData?.success?.data)
        dispatch({type: ALLTATTO, payload: responseData?.success?.data})
      }
            
        } catch (error) {
            console.log('getAllTatto error', error)
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
export const getUsers = () => {
  return async (dispatch) => {
   try {
       let baseUrl = `${base_Url}users`


    const response = await fetch(baseUrl,{
      method: 'get',
    })

    const responseData = await response.json()
    if(responseData?.success?.status === 200){
      dispatch({type: ALLUSERS, payload: responseData?.success?.data})
    }
          
      } catch (error) {
          console.log('error', error)
      }
  }
}
export const submitTattoEntry = async (selectedImages,tag,skin,setLoader,setCheck,navigation,selectDate) => {
  setLoader(true)
    const  userDetails =  await AsyncStorage.getItem('user_details')
    const cnvrtData = JSON.parse(userDetails)
    const fltrImage = selectedImages?.filter((item) => item?.uri)
   try {
       let baseUrl = `${base_Url}store-tattoo/${cnvrtData.data.id}`
       let myData = new FormData()

       myData.append('tag',tag)
       myData.append('time',selectDate)
       myData.append('skin_tone',skin)
       fltrImage.forEach((image, index) => {
        index < 5 && myData.append(`image[${index}]`, {
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
    console.log('responseData', responseData)
    
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
export const creatorAddUser = async (data, setBtn1,setBtn2,setChooseColor,ToastAndroid,setBtnLoader,setMsg) => {
  setBtnLoader(true)
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
    console.log('responseData', responseData)

    if(responseData?.error?.email == "The email has already been taken."){
      setMsg('The email has already been taken.')
    }else if(responseData?.error?.name == "The name has already been taken."){
      setMsg('The name has already been taken.')
    }

    if(responseData?.success?.status === 200){
      getUsers()
      setBtnLoader(false)
    setBtn1(true),
    setBtn2(false),
    setChooseColor(false)
    ToastAndroid.show('User Added', ToastAndroid.LONG)
    }else{
      setBtnLoader(false)
    }
  } catch (error) {
    console.log('error', error)
    setBtnLoader(false)
  }
}
export const getSkinTone = async (code,setData,setCheck) => {
  try {
    let baseUrl = `${base_Url}skin-tattoo`
    let myData = new FormData()

    myData.append('skin_tone',code)

  
    const response = await fetch(baseUrl,{
      method: 'post',
      body: myData
    })

    const responseData = await response.json()
    console.log('getSkinTone responseData', responseData)
    if(responseData?.success?.status === 200){
      setData(responseData?.success?.data)
    }else if(responseData?.error?.status === 400){
      setCheck(true)
      setData([])
    }
  } catch (error) {
    console.log('getSkinTone error', error)
  }
}
export const likedByID = async (id) => {
  console.log('id', id)
  const  userDetails =  await AsyncStorage.getItem('user_details')
  const cnvrtData = JSON.parse(userDetails)
  try {
    let baseUrl = `${base_Url}store-like/${id}/${cnvrtData.data.id}`
  
    const response = await fetch(baseUrl,{
      method: 'post',
    })

    const responseData = await response.json()
    console.log('responseData', responseData)
    if(responseData?.success?.status === 200){
      console.log('responseData',responseData?.success?.data)
    }
  } catch (error) {
    console.log('likedByID error', error)
  }
}
export const getCommentsByID = async (id,setData) => {
  console.log('id', id)
  try {
    let baseUrl = `${base_Url}show-comment/${id}`
  
    const response = await fetch(baseUrl,{
      method: 'get',
    })

    const responseData = await response.json()
    if(responseData?.success?.status === 200){
      setData(responseData?.success?.data)
    }
  } catch (error) {
    console.log('commentsByID error', error)
  }
}
export const send_Comments = async (data,id,reset) => {
  console.log('data,id', data,id)
    const  userDetails =  await AsyncStorage.getItem('user_details')
    const cnvrtData = JSON.parse(userDetails)
    try {
    let baseUrl = `${base_Url}store-comment/${id}/${cnvrtData.data.id}`
    let myData = new FormData()

    myData.append('remark',data.comment)
  
    const response = await fetch(baseUrl,{
      method: 'post',
      body: myData
    })


    const responseData = await response.json()

    if(responseData?.success?.status === 200){
      reset()
    }else{
      console.log('send_Comments else error')
    }
      
    } catch (error) {
      console.log('send_Comments error', error)
  }
}
export const getMyTattos = async (setData) => {
  const  userDetails =  await AsyncStorage.getItem('user_details')
  const cnvrtData = JSON.parse(userDetails)
  try {
    let baseUrl = `${base_Url}show-user-tattoo/${cnvrtData.data.id}`
  
    const response = await fetch(baseUrl,{
      method: 'get',
    })

    const responseData = await response.json()
    console.log('responseData', responseData)
    if(responseData?.success?.status === 200){
      setData(responseData?.success?.data)
      console.log('responseData',responseData?.success?.data)
    }
  } catch (error) {
    console.log('commentsByID error', error)
  }
}
export const getRandomProfile = async (id,setData,setIsLoading) => {
  setIsLoading(true)
    try {
      let baseUrl = `${base_Url}user-id/${id}}`
    
      const response = await fetch(baseUrl,{
        method: 'get',
      })
  
      const responseData = await response.json()
      // console.log('responseData', responseData)
      if(responseData?.success?.status === 200){
        setData(responseData?.success)
        setIsLoading(false)
        // dispatch({type: RANDOMPROFILE, payload: responseData?.success})
        // console.log('responseData',responseData?.success)
      }else{
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log('commentsByID error', error)
    }
  
}
export const editNotification =   (userData) => {
return async (dispatch) => {
  try {
    let base_url = `${base_Url}toggle/${userData.data.id}`;
    const response = await fetch(base_url, {
      method: 'post',
    });
    
    const responseData = await response.json();
    
    if (responseData.success.status === 200) {
      const user = await AsyncStorage.getItem('user_details');
      let userData = JSON.parse(user);
      userData.data.notification_status = responseData.success.data
      await AsyncStorage.setItem('user_details',JSON.stringify(userData))
      dispatch({type: USER_DETAILS, payload: userData});
      console.log(responseData.success);
    }else{
      console.log('first')
    }
  } catch (error) {
    console.log('error', error);
  }
}
  
}
export const addImageAfter = async (image,id,setIsLoading,ToastAndroid,selectDate,setShow,setModalVisible) => {
  setIsLoading(true)
  setShow(true)
  const  userDetails =  await AsyncStorage.getItem('user_details')
  const cnvrtData = JSON.parse(userDetails)
    try {
      let baseUrl = `${base_Url}store-images/${id}/${cnvrtData.data.id}`
      let myData = new FormData()

      myData.append('image',image)
      myData.append('time',selectDate)
    
      const response = await fetch(baseUrl,{
        method: 'post',
        body:myData
      })
     
  
      const responseData = await response.json()
   
      if(responseData?.success?.status === 200){
        setShow(false)
        setModalVisible(false)
        ToastAndroid.show('Tattoo has been added successfully!', ToastAndroid.LONG)
        setIsLoading(false)
        // console.log('responseData',responseData?.success)
      }else{
        setModalVisible(false)
        setShow(false)
        setIsLoading(false)
        alert('Something went wrong!')
      }
    } catch (error) {
      alert('Something went wrong!')
      setModalVisible(false)
      setShow(false)
      setIsLoading(false)
      console.log('addImageAfter error', error)
    }
  
}
export const getAllLikedTatto = () => {
  return async (dispatch) => {
   const  userDetails =  await AsyncStorage.getItem('user_details')
   const cnvrtData = JSON.parse(userDetails)
   try {
       let baseUrl = `${base_Url}show-like-tattoo/${cnvrtData.data.id}`


    const response = await fetch(baseUrl,{
      method: 'get',
    })

    const responseData = await response.json()
    console.log('getAllLikedTatto responseData', responseData)
    if(responseData?.success?.status === 200){
      dispatch({type: LIKED_TATTO, payload: responseData?.success?.data})
    }else if(responseData?.error?.status == 400){
      dispatch({type: LIKED_TATTO, payload: []})
    }
          
      } catch (error) {
          console.log('getAllLikedTatto error', error)
      }
  }
}