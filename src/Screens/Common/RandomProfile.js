import StaggeredList from '@mindinventory/react-native-stagger-view'
import React, {useState} from 'react'
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

const width = Dimensions.get('screen').width

const images = [
  {id: '1', img: require('../../Assets/Images/people.png'), text: 'h1'},
  {id: '2', img: require('../../Assets/Images/people.png'), text: 'h2'},
  {id: '3', img: require('../../Assets/Images/people.png'), text: 'h3'},
  {id: '4', img: require('../../Assets/Images/people.png'), text: 'h4'},
  {id: '5', img: require('../../Assets/Images/people.png'), text: 'h5'},
  {id: '6', img: require('../../Assets/Images/people.png'), text: 'h6'},
]

const RandomProfile = ({navigation}) => {
  const [data, setData] = useState(images)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [chooseColor, setChooseColor] = useState(false)

  const getChildrenStyle = () => {
    return {
      width: (width - 18) / 2,
      height: Number(Math.random() * 20 + 12) * 10,
      borderRadius: 18,
      backgroundColor: 'grey',
      margin: 2,
    }
  }

  const renderChildren = (item) => {
    return (
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}>
        <View style={getChildrenStyle()} key={item.id}>
          <Image
            style={{
              flex: 1,
              borderRadius: 18,
            }}
            source={{
              uri: 'https://menshaircuts.com/wp-content/uploads/2019/01/tattoos-for-men-tribal-chest-sleeve-683x1024.jpg',
            }}
            resizeMode={'contain'}
          />
        </View>
      </TouchableOpacity>
    )
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
        </View>
        <View style={styles.ImgCon}></View>

        <View style={styles.NameCon}>
          <Text style={styles.NameText}>Graffiti Women</Text>

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

          <StaggeredList
            data={data}
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
    fontSize: moderateScale(25),
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: '900',
    color: 'white',
    letterSpacing: 0.7,
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
    fontSize: moderateScale(17),
    fontStyle: 'normal',
    fontWeight: '900',
  },
  BoxesText1: {
    color: '#05BC03',
    fontSize: moderateScale(15),
    fontStyle: 'normal',
    fontWeight: '900',
  },
  BoxexNum: {
    color: '#05BC03',
    fontSize: moderateScale(27),
    fontStyle: 'normal',
    fontWeight: '900',
  },
})
export default RandomProfile
