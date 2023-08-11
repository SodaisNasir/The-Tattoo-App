import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { scale } from 'react-native-size-matters'
import BackArrow from '../../Components/BackArrow'
import CustomButton from '../../Components/CustomButton'
import Top2navigator from '../../Components/Top2bar'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { base_image_Url } from '../../Utils/BaseUrl'
import YourTatto from './YourTatto'
import OthersTatto from './OthersTatto'
import { Font } from '../../Assets/Fonts/Font'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { getAllLikedTatto, getAllTatto, getRandomProfile } from '../../redux/actions/UserActions'

const Profile = ({ navigation }) => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user_details)

  const [btn1, setBtn1] = useState(true)
  const [btn2, setBtn2] = useState(false)
  const [data, setData] = useState(true)
  const [dataTwo, setDataTwo] = useState(false)
  const [profileData, setProfileData] = useState([])
  const [isLoading, setIsLoading] = useState(true);



  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
      getRandomProfile(userData.data.id, setProfileData, setIsLoading)
      dispatch(getAllTatto())
      dispatch(getAllLikedTatto())
    }, []),
  );
  const AllOne = () => {
    setBtn1(true)
    setBtn2(false)
    setData(true)
    setDataTwo(false)
  }
  const CreditTwo = () => {
    setBtn2(true)
    setBtn1(false)
    setDataTwo(true)
    setData(false)
  }
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' })


  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          height: scale(34),
          width: scale(34),
          borderRadius: 100,
          backgroundColor: 'white',

          position: 'absolute',
          top: scale(20),
          left: scale(20),
          zIndex: 999,
        }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome5 name="angle-left" size={scale(22)} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.ProContainer}>
          {/* <BackArrow
          onPress={() => navigation.goBack()}
          restyle={{
            position: 'absolute',
            top: scale(20),
            left: scale(20),
            zIndex: 10,
          }}
        /> */}
          <Image
            style={{
              height: '100%',
              width: '100%'
            }}
            source={{ uri: `${base_image_Url}` + userData?.data?.cover_image }}
            resizeMode='cover'
          />
        </View>
        <View style={[styles.ImgCon, { overflow: 'hidden', }]}>
          {
            userData?.data?.profile_image ?
              <Image
                style={{
                  height: '100%',
                  width: '100%'
                }}
                source={{ uri: `${base_image_Url}` + userData?.data?.profile_image }}
                resizeMode='cover'
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

        <View style={styles.NameCon}>
          <Text style={styles.NameText}>
            {userData?.data?.role_id == 2 ? userData?.data?.business_name : userData?.data?.name}
          </Text>

          <CustomButton
            onPress={() => navigation.navigate('editprofile')}
            restyle={{
              width: '42%',
            }}
            text={'edit'}
            Textalig={{
              color: 'white',
            }}
          />

          <View style={styles.TwoBox}>
            <View style={styles.Box1}>
              <Text style={styles.BoxexNum}>{profileData?.total_tattoo}</Text>
              <Text style={styles.BoxesText}>Tattoos</Text>
            </View>
            <View style={[styles.Box1, { marginLeft: scale(5) }]}>
              <Text style={styles.BoxexNum}>{profileData?.total_like}</Text>
              <Text style={styles.BoxesText1}>Thumbs Up</Text>
            </View>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Top2navigator
              NameOne={'your tattoos'}
              All={AllOne}
              AllText={{
                color: btn1 ? 'white' : '#05BC03',
              }}
              AllBG={{
                backgroundColor: btn1 ? '#05BC03' : '#D7D7D7',
              }}
              Credit={CreditTwo}
              NameTwo={'Liked Tattoos'}
              CreditText={{
                color: btn2 ? 'white' : '#05BC03',
              }}
              BGCOLOR={{
                backgroundColor: btn2 ? '#05BC03' : '#D7D7D7',
              }}
              restyle={{
                width: '80%',
                height: scale(42),
              }}
            />
          </View>

          {data && <YourTatto />}
          {dataTwo && <OthersTatto />}
        </View>
      </ScrollView>
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
    backgroundColor: 'white',
    // backgroundColor: '#05BC03',
    borderRadius: 100,
    marginLeft: scale(110),
    // position: 'relative',
    bottom: scale(65),
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
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: scale(1),
  },
})
export default Profile
