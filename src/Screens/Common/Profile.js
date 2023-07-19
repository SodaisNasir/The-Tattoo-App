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
} from 'react-native'
import {moderateScale, scale} from 'react-native-size-matters'
import BackArrow from '../../Components/BackArrow'
import CustomButton from '../../Components/CustomButton'
import Top2navigator from '../../Components/Top2bar'
import { useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { base_image_Url } from '../../Utils/BaseUrl'
import YourTatto from './YourTatto'
import OthersTatto from './OthersTatto'
import { Font } from '../../Assets/Fonts/Font'

const Profile = ({navigation}) => {
    const [btn1, setBtn1] = useState(true)
    const [btn2, setBtn2] = useState(false)
    const [data, setData] = useState(true)
    const [dataTwo, setDataTwo] = useState(false)
    const userData = useSelector(state => state.user_details)
    useFocusEffect(
      useCallback(() => {
        navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
        // dispatch(getChapters(setData,item.id))
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
      formState: {errors, isValid},
    } = useForm({mode: 'all'})
  return (
    <SafeAreaView style={styles.MainContainer}>
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
        style={{
          height: '100%',
          width: '100%'
        }}
        source={{uri: `${base_image_Url}` + userData?.data?.cover_image }}
        resizeMode='cover'
        />
      </View>
      <View style={[styles.ImgCon,{overflow: 'hidden',}]}>
      <Image 
        style={{
          height: '100%',
          width: '100%'
        }}
        source={{uri: `${base_image_Url}` + userData?.data?.profile_image}}
        resizeMode='cover'
        />
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
            <Text style={styles.BoxexNum}>30</Text>
            <Text style={styles.BoxesText}>Tattoos</Text>
          </View>
          <View style={[styles.Box1, {marginLeft: scale(5)}]}>
            <Text style={styles.BoxexNum}>30</Text>
            <Text style={styles.BoxesText1}>Thumbs Ups</Text>
          </View>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
            NameTwo={'others'}
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
      backgroundColor: '#05BC03',
      borderRadius: 100,
      marginLeft: scale(110),
      position: 'relative',
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
      fontSize: scale(14),
   fontFamily: Font.OpenSans700
    },
    BoxesText1: {
      color: '#05BC03',
      fontSize: scale(12),
   fontFamily: Font.OpenSans700
    },
    BoxexNum: {
      color: '#05BC03',
      fontSize: scale(27),
      fontFamily: Font.OpenSans700
    },
  })
export default Profile
