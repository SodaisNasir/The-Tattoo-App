import { useFocusEffect } from '@react-navigation/native'
import React, {useCallback, useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  PermissionsAndroid,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native'
import {scale, verticalScale} from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { addImageAfter, getCommentsByID, getMyTattos, getRandomProfile, likedByID, send_Comments } from '../../redux/actions/UserActions'
import { useSelector } from 'react-redux'
import { base_image_Url } from '../../Utils/BaseUrl'
import CommentsInput from '../../Components/CommentsInput'
import Modal from 'react-native-modal'
import { useForm } from 'react-hook-form'
import { Font } from '../../Assets/Fonts/Font'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { SelectList } from 'react-native-dropdown-select-list'
import CustomButton from '../../Components/CustomButton'

const YourTatto = () => {
    const [isLike, setIsLike] = useState(false)
    const [data, setData] = useState([])
    const [select, setSelect] = useState([])
    const [cmmntId, setCmmnt] = useState()
    const userData = useSelector(state => state.user_details)
    const [commentsData, setCommentsData] = useState([]);
    const [modalVisible3, setModalVisible3] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false)
    const [show2, setShow2] = useState(true)
    const [saveIMage, setSaveImage] = useState({})
    const [tattoId, setTattoId] = useState()
    const [selectDate,setSelectDate] = useState()
    const [date,setdate] = useState([
      {label: 'Just done', value: 'Just done'},
      {label: '1 week', value: '1 week'},
      {label: '1 month', value: '1 month'},
      {label: '2 months', value: '2 months'},
      {label: '1 year', value: '1 year'},
      {label: '2 years', value: '2 years'},
      {label: '3 years', value: '3 years'},
      {label: '5+ years', value: '5+ years'},
    ])

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors, isValid},
      } = useForm({mode: 'all'})
    useFocusEffect(
        useCallback(() => {
            // getMyTattos(setData)
            getRandomProfile(userData.data.id,setData,setIsLoading)
        },[isLike])
      )
      const toggleModal = () => {
        setModalVisible(!isModalVisible)
      }
      const requestCameraPermission = async (id) => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'App Gallery Permission',
              message: 'App needs access to your gallery ',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          )
          if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera')
            setTattoId(id)
            toggleModal()
          } else {
            console.log('Camera permission denied')
          }
        } catch (err) {
          console.warn(err, 'laraib')
        }
      }
      const photosave = () => {
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
            setSaveImage({
              name: res.assets?.[0]?.fileName,
              uri: res.assets?.[0]?.uri,
              type: res.assets?.[0]?.type,
            })
            // addImageAfter(
            //   {
            //     name: res.assets?.[0]?.fileName,
            //     uri: res.assets?.[0]?.uri,
            //     type: res.assets?.[0]?.type,
            //   },
            //   tattoId,
            //   setIsLoading2,
            //   ToastAndroid
            // )

            // setShow2(false)
          }
        })
      }
      const cameraLaunch = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        }
        launchCamera(options, (res) => {
          console.log('Response = ', res)
          if (res.didCancel) {
            console.log('User cancelled image picker')
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error)
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton)
            alert(res.customButton)
          } else {
            // setModalVisible(false)
            setSaveImage({
              name: res.assets?.[0]?.fileName,
              uri: res.assets?.[0]?.uri,
              type: res.assets?.[0]?.type,
            })
            // addImageAfter(
            //   {
            //     name: res.assets?.[0]?.fileName,
            //     uri: res.assets?.[0]?.uri,
            //     type: res.assets?.[0]?.type,
            //   },
            //   tattoId,
            //   setIsLoading2,
            //   ToastAndroid
            // )
            // setsaveimage({
            //   name: res.assets?.[0]?.fileName,
            //   uri: res.assets?.[0]?.uri,
            //   type: res.assets?.[0]?.type,
            // })
            // setShow2(false)
          }
        })
      }
    const onSubmit = (id) => {
        setIsLike(!isLike)
        likedByID(id)
        if(!select.includes(id)){
            setSelect([...select,id])
        }else{
            setSelect(select.filter((item) => item != id))
        }
    }
    const renderItem = ({item}) => {
        const cnvrtData = JSON.parse(item.image)
        console.log('item', item)
        return (
          <View style={styles.CardContainer}>
            <View style={styles.NameContainer}>
              <View style={{ flex:3 ,flexDirection: 'row'}}>
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'flex-end'}}>
                  <View style={{height: scale(35),width: scale(35),borderRadius:100,overflow: 'hidden',backgroundColor: 'white'}}>
                    {
                      userData.data.profile_image ?
                      <Image
                          style={{
                            height: '100%',
                            width: '100%'
                          }}
                          source={{
                            uri: `${base_image_Url}` + userData.data.profile_image
                          }}
                          resizeMode={'contain'}
                        />
                        :
                        <Image 
                        style={{
                          height: '100%',
                          width: '100%'
                         }}
                         source={require('../../Assets/Images/default.png')}
                         resizeMode='cover'
                         />
                    }
                  </View>
                </View>
                <View style={{flex: 3,justifyContent: 'center',paddingLeft: scale(10)}}>
                <Text style={styles.PersonName}>{userData?.data?.business_name ?  userData?.data?.business_name : userData.data.name}</Text>
                <Text style={styles.Nickname}>{userData?.data?.name}</Text>
                </View>
              </View>
              <View style={{ flex:1,justifyContent: 'center',alignItems: 'center',left:scale(6)}}>
                {
                  isLoading2 && tattoId == item.id ?
                  <ActivityIndicator size={scale(20)} color={'white'} />
                  :
                <TouchableOpacity onPress={() => requestCameraPermission(item.id)}>
              <Entypo name="plus" size={scale(20)} color="black" />
                </TouchableOpacity>
                }
              </View>
            </View>
      
            <View style={styles.MainImgCon}>
              <Image
                style={{
                  height: '100%',
                  width: '100%'
                }}
                source={{
                  uri: `${base_image_Url}` + cnvrtData[0]
                }}
                resizeMode={'contain'}
              />
            </View>
      
            <View style={styles.LikeContainer1}>
              <View style={styles.LikeContainer}>
                <TouchableOpacity onPress={() => onSubmit(item.id)}>
                  <AntDesign
                    name={item.like_status == 1 ? 'like1' : select.includes(item.id)   ? 'like1' : 'like2'}
                    size={20}
                    color={'black'}
                  />
                </TouchableOpacity>
                <Text style={styles.LikeCount}>{
                  (item.like_status == 0 && !select.includes(item.id)) || (item.like_status == 1 &&  !select.includes(item.id)) ? item.like : item.like_status == 0 &&  select.includes(item.id) ? parseInt(item.like) + 1 : item.like
                } Likes</Text>
                <TouchableOpacity
                onPress={() => commnetsModal(item.id)}
                  style={{
                    paddingLeft: scale(7),
                  }}>
                  <Ionicons
                    name={'chatbubble-ellipses-outline'}
                    size={20}
                    color={'black'}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.LikeContainer3}>
                <Text
                  style={{
                    fontSize: scale(14),
                    color: 'black',
                    fontFamily: Font.OpenSans700,
                  }}>
                  Skin Tone:{' '}
                </Text>
                <View
                  style={{
                    height: scale(13),
                    width: scale(15),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: item.skin_tone
                  }} />
                 
              </View>
            </View>
            <View style={{flex:1,flexDirection: 'row',alignItems: 'center',paddingHorizontal:scale(23)}}>
            <Text style={{
              color: 'black',
              fontFamily: Font.OpenSans400,
              fontSize: scale(13),
              paddingRight: scale(5),
            }}>Creator</Text>
          <Text
            style={{
              color: 'black',
              fontSize: scale(13),
              fontFamily: Font.OpenSans700
            }}>
             {item?.tag}
          </Text>
            </View>
          </View>
        )
    }
    const commnetsModal = (id) => {
        getCommentsByID(id,setCommentsData)
        setModalVisible3(true)
        setCmmnt(id)
    }
    const sendComment = (item) => {
        send_Comments(item,cmmntId,reset)
        setTimeout(() => {
          getCommentsByID(cmmntId,setCommentsData)
        }, 1000);
    }
    const updatedPost = () => {
      if(selectDate && saveIMage?.uri){
        addImageAfter(
          saveIMage,
          tattoId,
          setIsLoading2,
          ToastAndroid,
          selectDate
          )
        }else{
          alert('Please select date and tattoo')
        }
    }
  return (
    <SafeAreaView style={styles.MainContainer}>
        <FlatList
          data={data?.tattoo}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}><Text style={{color: 'white',fontFamily: Font.Mulish500}}>No tattoos yet</Text></View>
          )}
        />

          <Modal
          backdropOpacity={0.2}
          onBackdropPress={() => setModalVisible(false)}
          isVisible={isModalVisible}
          style={{
            margin: 0,
            justifyContent: 'center'
          }}
          >
          {/* <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
          
            }}> */}
            <View style={styles.SecCon}>
              <View style={{flex:2,marginHorizontal:scale(20),paddingTop: scale(15)}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View 
  
              >
            <Text style={{color: 'Black',paddingLeft: scale(7),bottom:3,fontFamily: Font.OpenSans600}}>Add time</Text>
            <SelectList
              placeholder="Select time"
              arrowicon={
                <Entypo
                  name="chevron-down"
                  size={scale(18)}
                  color={'white'}
                />
              }
              closeicon={
                <Entypo
                  name="chevron-up"
                  size={scale(18)}
                  color={'white'}
                />
              }
              dropdownStyles={styles.dropdownStyles}
              dropdownItemStyles={styles.dropdownItemStyles}
              boxStyles={styles.boxStyles}
              dropdownTextStyles={styles.dropdownTextStyles}
              inputStyles={styles.inputStyles}
              search={false}
              setSelected={val => setSelectDate(val)}
              data={date}
              save="value"
            />
              </View>

              <CustomButton
                onPress={() => updatedPost()}
                Textalig={{
                  color: 'white',
                  fontSize: 18,
                }}
                text={'Update'}
                // btnLoader={btnLoader}
                />

            </ScrollView>
              </View>
              <View style={{flex:0.5,flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => photosave()}
                style={styles.ModalBtn}>
                {/* <Image
                  style={styles.tinyLogo}
                  source={require('../../assets/Images/camera.png')}
                /> */}
                <AntDesign name="folderopen" size={24} color="black" />
                <Text style={styles.Text1}>Upload picture</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => cameraLaunch()}
                style={styles.ModalBtn}>
                {/* <Image
                  style={styles.tinyLogo2}
                  source={require('../../assets/Images/camera.png')}
                /> */}
               <Feather name="camera" size={24} color="black" />
                <Text style={styles.Text1}>Take a picture</Text>
              </TouchableOpacity>
              </View>
            </View>
          {/* </View> */}
        </Modal>

         <Modal 
     backdropOpacity={0.4}
        animationType="slide"
        style={{
          margin: 0,
          justifyContent: 'flex-end'
        }}
        isVisible={modalVisible3}
        onBackdropPress={() => (setModalVisible3(false),setCommentsData([]))}
        // swipeDirection="down"
        // propagateSwipe={true}
        avoidKeyboard={true}
        scrollHorizontal={false}
    >
      <View
       style={{
        flex: 0.7,
        backgroundColor:'#2f2f2f',
        borderTopLeftRadius:scale(20),
        borderTopRightRadius:scale(20),
        overflow: 'hidden',
      }}>
  <View style={{height: '80%'}}>
    <ScrollView >
      {
        commentsData?.map((item) => {
          console.log('item', commentsData)
          return(
            <>
            <View style={{marginBottom: scale(10),flexDirection: 'row',paddingVertical:5}}>
              <View style={{height: verticalScale(40),width: scale(70),justifyContent: 'flex-start',alignItems: 'center'}}>
                <View style={{
                  marginTop: scale(10),
                  height: scale(40),
                  width: scale(40),
                  overflow: 'hidden',
                  borderRadius: 100,
                }}>
                  <Image 
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={{
                    uri: `${base_image_Url}` + item.profile_image
                  }}
                  />
                </View>
              </View>
              <View style={{marginTop: scale(10),maxWidth: '70%',borderRadius:10,overflow: 'hidden',}}>
                <Text style={{
                  color: 'white',
                  backgroundColor: '#3A3B3C',
                  paddingHorizontal: scale(10),
                  fontSize: scale(15),
                  // paddingVertical: verticalScale(10)
              }}>{item?.name}</Text>
                <Text style={{
                  color: 'white',
                  backgroundColor: '#3A3B3C',
                  paddingHorizontal: scale(10),
                  fontSize: scale(12),
                  paddingVertical: verticalScale(5)
                  }}>
                  {item?.remark}
                </Text>
              </View>
            </View>
            </>
          )
        })
      }
    </ScrollView>
  </View>
  <View style={{marginHorizontal: scale(20),height: verticalScale(70),borderTopWidth:1,borderTopColor: 'white'}}>

  <CommentsInput
      name="comment"
      control={control}
      
      keyboardType={'default'}
      Hello={{
        height: verticalScale(50),
      }}
      placeholder='Write a Comment...'
      restyle={{
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        // top: scale(30),
        // width: '85%',
        height: scale(45),
        bottom:20
      }}
      sendPress={handleSubmit(sendComment)}
    />

  </View>
      </View>
         </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: 'black',
      paddingHorizontal: scale(20),
      // paddingTop: scale(20),
      
    },
    CardContainer: {
      height: scale(250),
      backgroundColor: '#05BC03',
      borderRadius: 20,
      marginVertical: verticalScale(10),
      overflow: 'hidden',
    },
    NameContainer: {
      height: verticalScale(35),
      flexDirection: 'row',
      // position: 'relative',
      // width: '52%',
      // left: scale(100),
      marginTop: 4,
      // justifyContent:'space-between',
      // alignItems: ''
    },
    DPCon: {
      height: '100%',
      width: '20%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row',
    },
    ImgCon: {
      height: scale(35),
      width: scale(35),
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ImgBox: {
      height: scale(35),
      width: scale(35),
      borderRadius: 100,
    },
    NameTextCon: {
      height: '100%',
      width: '80%',
      justifyContent: 'center',
      paddingHorizontal: scale(10),
    },
    PersonName: {
      fontSize: scale(15),
      color: 'black',
      fontFamily: Font.OpenSans700,
    },
    Nickname: {
      fontSize: scale(12),
      color: 'black',
      bottom: scale(3),
      fontFamily: Font.OpenSans400,
    },
    MainImgCon: {
      height: scale(140),
      // width: '100%',
      marginVertical: verticalScale(5),
      paddingHorizontal: scale(20),
      overflow:'hidden'
    },
    LikeContainer1: {
      flexDirection: 'row',
      height: scale(26),
      // width: '100%',
      alignItems: 'center',
      paddingHorizontal: scale(10),
    },
    LikeContainer: {
      flexDirection: 'row',
      height: scale(26),
      width: '60%',
      alignItems: 'center',
      paddingHorizontal: scale(13),
    },
    LikeContainer3: {
      flexDirection: 'row',
      height: scale(26),
      width: '40%',
      alignItems: 'center',
      paddingHorizontal: scale(13),
    },
    LikeCount: {
      fontSize: scale(12),
      color: 'black',
      paddingLeft: scale(5),
      fontFamily: Font.OpenSans700,
    },
    CreatorCon: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: scale(20),
      marginVertical: 5,
    },
    CreatorText: {
      color: 'black',
      fontFamily: 'open sans',
      fontSize: 15,
      fontWeight: '400',
      paddingRight: scale(5),
    },
    CreatorName: {
      color: 'black',
      fontFamily: 'open sans',
      fontSize: 14,
      fontWeight: '700',
    },
    ModalBtn: {
      flex: 1,
      backgroundColor: 'white',
      margin: scale(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    Text1: {
      fontSize: scale(11),
      color: 'black',
      fontFamily: Font.Mulish600,
    },
    SecCon: {
      height: verticalScale(350),
      width: '100%',
      backgroundColor: 'white',
      // borderTopLeftRadius: 15,
      // borderTopRightRadius: 15,
      borderRadius:12,
      // flexDirection: 'row',
      overflow: 'hidden',
    },
    tinyLogo: {
      height: verticalScale(22),
      width: scale(22),
    },
    tinyLogo2: {
      height: verticalScale(22),
      width: scale(25),
    },
    boxStyles: {
      backgroundColor: 'white',
      height: verticalScale(55),
      alignItems: 'center',
      borderRadius: 8,
      // borderTopRightRadius:12,
      // borderTopLeftRadius:12,
      // marginTop: verticalScale(20),
    },
    inputStyles: {
      color: 'black',
      fontSize: scale(13),
      fontFamily: Font.OpenSans400
      // fontFamily: Font.Gilroy500,
    },
    dropdownTextStyles: {
      color: 'black',
      fontFamily: Font.OpenSans400
    },
    dropdownItemStyles: {
      backgroundColor: 'white',
    },
    dropdownStyles: {
      backgroundColor: 'white',
      borderWidth: scale(1),
      borderColor: 'white',
      bottom:10,
      borderRadius: 0,
      borderBottomRightRadius:12,
      borderBottomLeftRadius:12,
    },
  })
export default YourTatto
