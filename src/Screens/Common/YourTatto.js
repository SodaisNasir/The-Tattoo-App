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
} from 'react-native'
import {scale, verticalScale} from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getCommentsByID, getMyTattos, likedByID, send_Comments } from '../../redux/actions/UserActions'
import { useSelector } from 'react-redux'
import { base_image_Url } from '../../Utils/BaseUrl'
import CommentsInput from '../../Components/CommentsInput'
import Modal from 'react-native-modal'
import { useForm } from 'react-hook-form'
import { Font } from '../../Assets/Fonts/Font'

const YourTatto = () => {
    const [isLike, setIsLike] = useState(false)
    const [data, setData] = useState([])
    const [select, setSelect] = useState([])
    const [cmmntId, setCmmnt] = useState()
    const userData = useSelector(state => state.user_details)
    const [commentsData, setCommentsData] = useState([]);
    const [modalVisible3, setModalVisible3] = useState(false)

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors, isValid},
      } = useForm({mode: 'all'})
    useFocusEffect(
        useCallback(() => {
            getMyTattos(setData)
        },[isLike])
      )

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
        return (
          <View style={styles.CardContainer}>
            <View style={styles.NameContainer}>
              <View style={styles.DPCon}>
                <View style={styles.ImgCon}>
                  <TouchableOpacity>
                    <Image
                      style={styles.ImgBox}
                      source={{
                        uri: `${base_image_Url}` + userData.data.profile_image
                      }}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.NameTextCon}>
                <Text style={styles.PersonName}>{ userData?.data?.business_name ?  userData?.data?.business_name : userData.data.name}</Text>
                <Text style={styles.Nickname}>{userData?.data?.name}</Text>
              </View>
            </View>
      
            <View style={styles.MainImgCon}>
              <Image
                style={{
                  flex: 1,
                }}
                source={{
                  uri: `${base_image_Url}` + cnvrtData[0]
                }}
                resizeMode={'cover'}
              />
            </View>
      
            <View style={styles.LikeContainer1}>
              <View style={styles.LikeContainer}>
                <TouchableOpacity onPress={() => onSubmit(item.id)}>
                  <AntDesign
                    name={select.includes(item.id)   ? 'like1' : 'like2'}
                    size={20}
                    color={'black'}
                  />
                </TouchableOpacity>
                <Text style={styles.LikeCount}>{select.includes(item.id) ? parseInt(item.like) + 1 : item.like} Likes</Text>
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
  return (
    <SafeAreaView style={styles.MainContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
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
                  {item?.comment}
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
    },
    NameContainer: {
      height: scale(38),
      flexDirection: 'row',
      position: 'relative',
      width: '52%',
      left: scale(100),
      marginTop: 4,
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
      fontFamily: Font.OpenSans500,
    },
    Nickname: {
      fontSize: scale(12),
      color: 'black',
      bottom: scale(3),
      fontFamily: Font.OpenSans400,
    },
    MainImgCon: {
      height: scale(140),
      width: '100%',
      marginVertical: verticalScale(5),
      paddingHorizontal: scale(20),
    },
    LikeContainer1: {
      flexDirection: 'row',
      height: scale(26),
      // width: '100%',
      alignItems: 'center',
      paddingHorizontal: scale(20),
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
  })
export default YourTatto
