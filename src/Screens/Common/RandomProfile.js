import StaggeredList from '@mindinventory/react-native-stagger-view'
import React, {useCallback, useState} from 'react'
import {useForm} from 'react-hook-form'
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters'
import BackArrow from '../../Components/BackArrow'
import { useSelector } from 'react-redux'
import { base_image_Url } from '../../Utils/BaseUrl'
import { useFocusEffect } from '@react-navigation/native'
import { Font } from '../../Assets/Fonts/Font'
import { getRandomProfile } from '../../redux/actions/UserActions'

const width = Dimensions.get('screen').width

const images = [
  {id: '1', img: require('../../Assets/Images/people.png'), text: 'h1'},
  {id: '2', img: require('../../Assets/Images/people.png'), text: 'h2'},
  {id: '3', img: require('../../Assets/Images/people.png'), text: 'h3'},
  {id: '4', img: require('../../Assets/Images/people.png'), text: 'h4'},
  {id: '5', img: require('../../Assets/Images/people.png'), text: 'h5'},
  {id: '6', img: require('../../Assets/Images/people.png'), text: 'h6'},
]

const RandomProfile = ({route,navigation}) => {
  const {id} = route.params
  // const profileData = useSelector((state) => state.randomprofile)
  const [profileData, setProfileData] = useState([])
  const [isLoading, setIsLoading] = useState(true);


  useFocusEffect(
    useCallback(() => {
   getRandomProfile(id,setProfileData,setIsLoading)
    }, []),
  );
  const {
    control,
    handleSubmit,
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
        // onPress={() => onSubmit(item,cnvrtData)}
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

 

  return (
    <SafeAreaView style={styles.MainContainer}>
      {
        isLoading ?
        <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
          <ActivityIndicator color={'white'} size={scale(25)} />
          <Text style={{color: 'white',fontFamily: Font.Mulish700}}>Loading...</Text>
        </View>
        :
      <ScrollView showsVerticalScrollIndicator={false}>
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
          resizeMode='cover'
          style={{
            height: '100%',
            width:'100%'
          }}
          source={{uri : `${base_image_Url}` + profileData?.data?.cover_image}}
          />
        </View>
        <View style={styles.ImgCon}>
          <Image 
          resizeMode='contain'
          style={{
            height: '100%',
            width:'100%'
          }}
          source={{uri : `${base_image_Url}` + profileData?.data?.profile_image}}
          />
        </View>

        <View style={styles.NameCon}>
          <Text style={styles.NameText}>{profileData?.data?.name}</Text>

          <View style={styles.TwoBox}>
            <View style={styles.Box1}>
              <Text style={styles.BoxexNum}>{profileData?.total_tattoo}</Text>
              <Text style={styles.BoxesText}>Tattoos</Text>
            </View>
            <View style={[styles.Box1, {marginLeft: scale(5)}]}>
              <Text style={styles.BoxexNum}>{profileData?.total_like}</Text>
              <Text style={styles.BoxesText1}>Thumbs Ups</Text>
            </View>
          </View>

          <StaggeredList
            data={profileData?.tattoo}
            animationType={'FADE_IN_FAST'}
            contentContainerStyle={{
              paddingVertical: 10,
              paddingLeft: 5,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => renderChildren(item)}
          />
        </View>
      </ScrollView>
      }
      <View  style={{height: verticalScale(20)}}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'black',
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
    marginLeft: scale(110),
    position: 'relative',
    bottom: scale(65),
    overflow:'hidden'
  },
  NameCon: {
    flex: 1,
    position: 'relative',
    bottom: scale(50),
  },
  NameText: {
    fontSize: scale(25),
    textAlign: 'center',
    color: 'white',
    letterSpacing: 0.7,
    fontFamily: Font.OpenSans700
  },
  TwoBox: {
    // height: scale(90),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: scale(5),
  },
  Box1: {
    height: scale(85),
    width: scale(110),
    backgroundColor: 'white',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(5),
  },
  BoxesText: {
    color: '#05BC03',
    fontSize: scale(15),
    fontFamily: Font.Mulish700
  },
  BoxesText1: {
    color: '#05BC03',
    fontSize: scale(15),
    fontFamily: Font.Mulish700,
    
  },
  BoxexNum: {
    color: '#05BC03',
    fontSize: scale(27),
   fontFamily: Font.Mulish700,
   textShadowColor: 'rgb(0, 0, 0)',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: scale(1),
  },
})
export default RandomProfile
