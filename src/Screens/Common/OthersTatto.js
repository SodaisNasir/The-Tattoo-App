import { useFocusEffect, useNavigation } from '@react-navigation/native'
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
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import {scale, verticalScale} from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getAllLikedTatto, getAllTatto, getCommentsByID, getCreators, getMyTattos, getSkinTone, getSkinTones, likedByID, send_Comments } from '../../redux/actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'
import { base_image_Url } from '../../Utils/BaseUrl'
import CommentsInput from '../../Components/CommentsInput'
import Modal from 'react-native-modal'
import { useForm } from 'react-hook-form'
import StaggeredList from '@mindinventory/react-native-stagger-view'
import { Font } from '../../Assets/Fonts/Font'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'

const width = Dimensions.get('screen').width

const OthersTatto = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const alltatto = useSelector(state => state.liked_tatto)
  const [data, setData] = useState([])
  const [images, setImages] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible3, setModalVisible3] = useState(false)
  const [isLike, setIsLike] = useState(true)
  const [selectImage,setSelectImage] = useState()
  const [commentsData, setCommentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllLikedTatto())
    }, []),
  );
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({mode: 'all'})

  const getChildrenStyle = () => {
    return {
      width: (width - 18) / 2,
      height: Number(Math.random() * 20 + 10) * 10,
      borderRadius: 18,
      backgroundColor: 'grey',
      margin: 2,
    }
  }
  const renderChildren = (item) => {
    const cnvrtData = JSON.parse(item.image)
    return (
      <TouchableOpacity
        onPress={() => onSubmit(item,cnvrtData)}
        activeOpacity={0.7}>
        <View style={getChildrenStyle()} key={item.id}>
          <Image
            style={{
              flex: 1,
              borderRadius: 18,
            }}
            source={{
              uri: `${base_image_Url}` + cnvrtData[0],
            }}
            resizeMode={'contain'}
          />
        </View>
      </TouchableOpacity>
    )
  }
  const onSubmit = (item,images) => {
    getCommentsByID(item.id,setCommentsData)
    setSelectImage(images[0])
    setImages(images)
    setData(item)
    setModalVisible(true)
  } 

const refrshView =  () => {
      dispatch(getAllTatto())
      dispatch(getSkinTones())
      dispatch(getCreators())
}
const goToProfile = () => {
  setModalVisible(false)
  navigation.navigate('RandomProfile',{id:data.user_id})
}

const likePost = (id) => {
  likedByID(id)
  setIsLike(!isLike)
}
const commnetsModal = () => {
  setModalVisible3(true)
}

const sendComment = (item) => {
  send_Comments(item,data.id,reset)
  setTimeout(() => {
    getCommentsByID(data.id,setCommentsData)
  }, 1000);
}
const closeModal = () =>{
  dispatch(getAllTatto())
  dispatch(getAllLikedTatto())
  setModalVisible(false)
  setIsLike(false)
}
console.log('data?.like_status', data?.like_status)
  return (
    <SafeAreaView style={{flex:1}}>
      {
        alltatto.length > 0 ?
        <StaggeredList
        data={alltatto}
        animationType={'FADE_IN_FAST'}
        contentContainerStyle={{
          paddingVertical: 10,
          paddingLeft: 5,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => renderChildren(item)}
        onRefresh={() => refrshView()}
        />
       :
       <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}><Text style={{color: 'white',fontFamily: Font.Mulish500}}>No tattoos found!</Text></View>
      }
     <Modal
      onBackdropPress={() => closeModal()}
      animationType="slide"
      // transparent={true}
      visible={modalVisible}
      style={{margin:0,backgroundColor: 'rgba(0,0,0,1)'}}
      >
    <View style={{flex: 1,marginHorizontal: scale(15)}}>
      <View style={{
        height: '10%',
        justifyContent: 'center'
      }}>
        <TouchableOpacity onPress={() => closeModal()}>
        <View style={{
          height: scale(35),
          width: scale(35),
          // backgroundColor: 'white',
          borderRadius:100,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
           <FontAwesome5 name="angle-left" size={25} color={'white'} />
        </View>
          </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{
          height: verticalScale(40),
          flexDirection: 'row'
        }}>
          <View style={{flex: 0.4,justifyContent: 'center',alignItems: 'center'}}>
            <TouchableOpacity onPress={() => goToProfile()}>
            <View style={{
              height: scale(40),
              width: scale(40),
              backgroundColor: 'black',
              overflow: 'hidden',
              borderRadius: 100
            }}>
               <Image
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={{
                  uri: `${base_image_Url}` + data?.profile_image,
                }}
                resizeMode={'cover'}
              />
            </View>
            </TouchableOpacity>
          </View>
          <View style={{flex:2,justifyContent: 'center',paddingLeft: scale(7)}}>
          <TouchableOpacity onPress={() => goToProfile()}>

          <Text
              style={{
                fontSize: scale(15),
                color: 'white',
                fontFamily: Font.OpenSans700
              }}>
              {data?.name}
            </Text>
            <Text
              style={{
                fontSize: scale(11),
                color: 'white',
                fontFamily: Font.OpenSans400
              }}>
                {data?.name}
            </Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={{
          height: verticalScale(300),
          marginVertical: verticalScale(5),
        }}>
           <Image
            style={{
              flex: 1,
            }}
            source={{
              uri:   selectImage ? `${base_image_Url}` + selectImage : `${base_image_Url}` + images[0],
            }}
            resizeMode={'cover'}
          />
        </View>
        <View style={{
          height: verticalScale(30),
          flexDirection: 'row',
            alignItems: 'center',
        }}>
           <TouchableOpacity onPress={() => likePost(data.id)}>
            <AntDesign
              name={data.like_status == 0 && isLike  ? 'like1' : data.like_status == 1 && !isLike ? 'like1' : 'like2'}
              size={scale(20)}
              color={'white'}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: scale(12),
              fontFamily: Font.OpenSans700,
              color: 'white',
              paddingLeft: scale(5),
            }}>
             {data.like_status == 0 && isLike ? parseInt(data?.like) + 1 : data.like_status == 1 && isLike ? parseInt(data?.like) - 1 : data?.like} Likes
          </Text>
          <TouchableOpacity
            onPress={() => commnetsModal()}
            style={{
              paddingLeft: scale(7),
            }}>
            <Ionicons
              name={'chatbubble-ellipses-outline'}
              size={scale(20)}
              color={'white'}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: scale(12),
              fontFamily: Font.OpenSans700,
              color: 'white',
              paddingLeft: scale(5),
            }}>
             {data?.comment} Comments
          </Text>
        </View>
        <View style={{
          height: verticalScale(20),
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Text style={{
              color: 'white',
              fontFamily: Font.OpenSans400,
              fontSize: scale(13),
              paddingRight: scale(5),
            }}>Creator </Text>
          <Text
            style={{
              color: 'white',
              fontSize: scale(13),
              fontFamily: Font.OpenSans700
            }}>
             {data?.tag}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
          }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {
              images?.map((item,index) => {
                console.log('item', item)
                return(
                  <>
                  <TouchableOpacity onPress={() => setSelectImage(item)}>
          <View
          key={index}
            style={{
              height: verticalScale(90),
              width: scale(80),
              margin:3,
            
            }}>
            <View
              style={{
                height: scale(70),
                width: '100%',
                borderRadius: 10,
                overflow: 'hidden',
                borderWidth: item == selectImage ? 1 : 0,
                borderColor: item == selectImage ? 'green' : 'red'
              }}>
              <Image
                style={{
                  flex: 1,
                
                }}
                source={{
                  uri: `${base_image_Url}` + item,
                }}
                resizeMode={'cover'}
              />
            </View>
            <Text
              style={{
                fontSize: 11,
                color: 'white',
                marginTop: scale(2),
                fontFamily: Font.OpenSans400,
              }}>
              {/* 1 Day ago */}
              {data?.time}
              {/* {moment(data?.created_at).fromNow()} */}
            </Text>
          </View>
                  </TouchableOpacity>
                  </>
                )
              })
            }
            {
              data?.images?.map((item,index) => {
                console.log('item', item)
                return(
                  <>
                  <TouchableOpacity onPress={() => setSelectImage(item.image)}>
          <View
          key={index}
            style={{
              height: verticalScale(90),
              width: scale(80),
              margin:3,
            
            }}>
            <View
              style={{
                height: scale(70),
                width: '100%',
                borderRadius: 10,
                overflow: 'hidden',
                borderWidth: item == selectImage ? 1 : 0,
                borderColor: item == selectImage ? 'green' : 'red'
              }}>
              <Image
                style={{
                  flex: 1,
                
                }}
                source={{
                  uri: `${base_image_Url}` + item.image,
                }}
                resizeMode={'cover'}
              />
            </View>
            <Text
              style={{
                fontSize: 11,
                color: 'white',
                marginTop: scale(2),
                fontFamily: Font.OpenSans400,
              }}>
              {/* 1 Day ago */}
              {item?.time}
              {/* {moment(item?.created_at).fromNow()} */}
            </Text>
          </View>
                  </TouchableOpacity>
                  </>
                )
              })
            }
            </ScrollView>
        </View>
      </ScrollView>
    </View>
    </Modal>

    <Modal 
     backdropOpacity={0.4}
        animationType="slide"
        style={{
          margin: 0,
          justifyContent: 'flex-end'
        }}
        isVisible={modalVisible3}
        onBackdropPress={() => (setModalVisible3(false))}
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
      {
        commentsData.length > 0 ?
    <ScrollView>
      {  commentsData?.map((item) => {
        console.log('item?.comment', item)
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
                  backgroundColor: 'white'
                }}>
                  {
                    item.profile_image ?
                    <Image 
                    style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={{
                    uri: `${base_image_Url}` + item.profile_image
                  }}
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
              <View style={{marginTop: scale(10),maxWidth: '70%',borderRadius:10,overflow: 'hidden',}}>
                <Text style={{
                  color: 'white',
                  backgroundColor: '#3A3B3C',
                  paddingHorizontal: scale(10),
                  fontSize: scale(15),
                  fontFamily: Font.Mulish700
              }}>{item?.name}</Text>
                <Text style={{
                  color: 'white',
                  backgroundColor: '#3A3B3C',
                  paddingHorizontal: scale(10),
                  fontSize: scale(12),
                  paddingVertical: verticalScale(5),
                  fontFamily: Font.OpenSans400
                  }}>
                  {item?.remark}
                </Text>
              </View>
            </View>
            </>
          )
        })}
    </ScrollView>
        :
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
          <Text style={{
            color: 'white',
            fontFamily: Font.Mulish800
          }}>Be first to comments on this</Text>
        </View>
      }
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
  },
  centeredView2: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    backgroundColor: 'rgba(6, 5, 24, 0.8)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: scale(5),
  },
})
export default OthersTatto
