import React, {useCallback, useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
} from 'react-native'
import StaggeredList from '@mindinventory/react-native-stagger-view'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters'
import {SafeAreaView} from 'react-native-safe-area-context'
import CustomInput from '../../Components/CustomInput'
import {useForm} from 'react-hook-form'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { getAllTatto, getCreators, getSkinTone, getSkinTones } from '../../redux/actions/UserActions'
import { base_Url, base_image_Url } from '../../Utils/BaseUrl'
import Modal from 'react-native-modal'
import SearchInput from '../../Components/SearchInput'
import moment from 'moment';

const width = Dimensions.get('screen').width

const Home = ({navigation}) => {
  const dispatch = useDispatch()
  const alltatto = useSelector(state => state.alltatto)
  const skintones = useSelector(state => state.skintones)
  const [data, setData] = useState([])
  const [images, setImages] = useState([])
  const [skinTone, setSkinTone] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [modalVisible3, setModalVisible3] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [chooseColor, setChooseColor] = useState(false)
  const [selectImage,setSelectImage] = useState()
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);


  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'})
  useFocusEffect(
    useCallback(() => {
      dispatch(getAllTatto())
      dispatch(getSkinTones())
      dispatch(getCreators())
    },[])
  )
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
    setSelectImage(images[0])
    setImages(images)
    setData(item)
    setModalVisible(true)
  } 
  const handlePress = (item) => {
    getSkinTone(item,setSkinTone)
    setChooseColor(false)
  }
const refrshView =  () => {
      dispatch(getAllTatto())
      dispatch(getSkinTones())
      dispatch(getCreators())
      setSkinTone([])
}
const goToProfile = () => {
  setModalVisible(false)
  navigation.navigate('RandomProfile')
}
const handleSearch = text2 => {
  const formattedQuery = text2?.toLowerCase();
  const filteredData = alltatto?.filter(item => {
    return item?.name?.toLowerCase().includes(formattedQuery);
  });
  setFilteredData(filteredData);
  setSearchQuery(text2);
};
  return (
    <SafeAreaView style={styles.MainContainer}>
    <View style={{
      // height: 100,
      width: '100%',
      position: 'absolute',
      zIndex: 999,
    }}>
      {/* <TextInput
         name="search"
       onChangeText={text => handleSearch(text)}
       value={searchQuery}
       returnKeyType='search'
       style={{
        position: 'absolute',
        top: scale(45),
        width: '85%',
        zIndex: 9,
        height: scale(40),
       }}
      /> */}
        <SearchInput
         onChangeText={text => handleSearch(text)}
         value={searchQuery}
         returnKeyType='search'
      keyboardType={'default'}
      Hello={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 0,
      }}
      restyle={{
        position: 'absolute',
        top: scale(45),
        width: '85%',
        zIndex: 9,
        height: scale(40),
      }}
    />
    <TouchableOpacity
      onPress={() => setChooseColor(true)}
      style={{
        height: scale(35),
        width: scale(35),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: scale(47),
        zIndex: 100,
        right: scale(35),
      }}>
      <Image
        style={{
          height: scale(25),
          width: scale(25),
        }}
        source={require('../../Assets/Images/slider.png')}
      />
    </TouchableOpacity>
    </View>
  
    <StaggeredList
      data={filteredData.length > 0 ? filteredData : skinTone?.length > 0 ? skinTone : alltatto}
      animationType={'FADE_IN_FAST'}
      contentContainerStyle={{
        paddingVertical: 10,
        paddingLeft: 5,
      }}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => renderChildren(item)}
      onRefresh={() => refrshView()}

    />

    <Modal
      onBackdropPress={() => setChooseColor(false)}
      onClose={() => setChooseColor(false)}
      animationType="slide"
      style={{margin:0}}
      transparent={true}
      visible={chooseColor}>
      <View style={styles.centeredView2}>
        <TouchableOpacity
          onPress={() => setChooseColor(!true)}
          style={{
            height: scale(38),
            width: scale(38),
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: scale(47),
            zIndex: 100,
            right: scale(35),
            backgroundColor: 'rgba(255, 255, 255, 0.3);',
            borderRadius: 100,
          }}>
          <Image
            style={{
              height: scale(25),
              width: scale(25),
            }}
            source={require('../../Assets/Images/slider.png')}
          />
        </TouchableOpacity>

        <View
          style={{
            // height: scale(200),
            width: '75%',
            position: 'absolute',
            top: scale(90),
            borderRadius: 10,
            overflow: 'hidden',
          }}>
            <FlatList 
            data={skintones}
            renderItem={({item}) => {
              return(
                <TouchableOpacity
                onPress={() => handlePress(item.code)}
                key={item.id}
                style={{
                  height:verticalScale(30),
                  backgroundColor: item.code,
                  // borderTopLeftRadius: 14,
                  // borderTopRightRadius: 14,
                }} />
              )
            }}
            />
          {/* <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#44362E',
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14,
            }}></TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#725A4D',
            }}></TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#9F7E6B',
            }}></TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#B49F96',
            }}></TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#D6BA9A',
              borderBottomLeftRadius: 14,
              borderBottomRightRadius: 14,
            }}></TouchableOpacity> */}
        </View>
      </View>
    </Modal>

    <Modal
      onBackdropPress={() => setModalVisible(false)}
      animationType="slide"
      // transparent={true}
      visible={modalVisible}
      style={{margin:0,backgroundColor: 'rgba(0,0,0,0.8)'}}
      >
    <View style={{flex: 0.8,marginHorizontal: scale(15)}}>
      <ScrollView>
        <View style={{
          height: verticalScale(40),
          flexDirection: 'row'
        }}>
          <View style={{flex: 0.4,justifyContent: 'center',alignItems: 'center'}}>
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
          </View>
          <View style={{flex:2,justifyContent: 'center',paddingLeft: scale(7)}}>
          <Text
              style={{
                fontFamily: 'mulish',
                fontSize: scale(15),
                fontWeight: '700',
                color: 'white',
              }}>
              {data?.name}
            </Text>
            <Text
              style={{
                fontFamily: 'mulish',
                fontSize: 11,
                fontWeight: '700',
                color: 'white',
              }}>
                {data?.name}
            </Text>
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
           <TouchableOpacity onPress={() => setIsLike(true)}>
            <AntDesign
              name={isLike ? 'like1' : 'like2'}
              size={scale(20)}
              color={'white'}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: scale(15),
              fontFamily: 'open sans',
              fontWeight: '700',
              color: 'white',
              paddingLeft: scale(5),
            }}>
             {data?.like} Likes
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible2(!modalVisible2)
            }}
            style={{
              paddingLeft: scale(7),
            }}>
            <Ionicons
              name={'chatbubble-ellipses-outline'}
              size={scale(20)}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
        <View style={{
          height: verticalScale(20),
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Text style={{
              color: 'white',
              fontFamily: 'open sans',
              fontSize: scale(13),
              fontWeight: '400',
              paddingRight: scale(5),
            }}>Creator</Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'open sans',
              fontSize: scale(13),
              fontWeight: '700',
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
                fontWeight: '700',
              }}>
              {/* 1 Day ago */}
              {moment(data?.created_at).fromNow()}
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
        onSwipeComplete={() => setModalVisible3(false)}
        swipeDirection="down"
        propagateSwipe={true}
        avoidKeyboard={true}
        scrollHorizontal={false}
    >
      <View
       style={{
        flex: 0.7,
        backgroundColor:'white',
        borderTopLeftRadius:scale(20),
        borderTopRightRadius:scale(20),
        overflow: 'hidden',
      }}>
  <View style={{height: '80%'}}>
    <ScrollView style={{backgroundColor: 'blue'}}></ScrollView>
  </View>
  <View style={{marginHorizontal: scale(20),height: verticalScale(70)}}>

  <CustomInput
      name="search"
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
        // height: scale(50),
        bottom:20
      }}
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
export default Home
