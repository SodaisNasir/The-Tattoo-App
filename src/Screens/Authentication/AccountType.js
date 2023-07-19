import React, {useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BackArrow from '../../Components/BackArrow'
import CustomButton from '../../Components/CustomButton'

const AccountType = ({navigation,route}) => {
  const {UserData} = route.params
  const [select, setSelect] = useState('')


  const Selectbox1 = () => {
    setSelect('1')
  }
  const Selectbox2 = () => {
    setSelect('2')
  }

  const CallSignup = () => {
    if (select == '1') {
      navigation.navigate('signup',{
        role_id: select,
        UserData:UserData
      })
    } else if (select == '2') {
      navigation.navigate('signup',{
        role_id: select,
        UserData:UserData
      })
    } else {
      alert('Please select account type')
    }
  }

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackArrow onPress={() => navigation.goBack()} />
        <View style={styles.ImgContainer}>
          <Image
            style={{height: scale(200)}}
            resizeMode="contain"
            source={require('../../Assets/Images/logo.png')}
          />
        </View>

        <Text style={styles.firstText}>Account type</Text>
        <Text style={styles.Stext}>Lorem ipsemLorem ipsem Lorem</Text>

        <View style={styles.BoxContainer}>

          
          <TouchableOpacity activeOpacity={0.6} onPress={Selectbox1}>
            <View style={styles.Boxes}>
              <View style={styles.IconBox}>
                <Image
                  style={[styles.Icons]}
                  resizeMode="cover"
                  source={require('../../Assets/Images/user.png')}
                />
              </View>
              <Text style={styles.IconText}>User</Text>
              {select == '1' ? (
                <View style={styles.IconContainer}>
                  <View style={styles.CheckIcon}>
                    <FontAwesome name="check" size={18} color={'white'} />
                  </View>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} onPress={Selectbox2}>
            <View style={styles.Boxes}>
              <View style={styles.IconBox}>
                <Image
                  style={styles.Icons}
                  resizeMode="cover"
                  source={require('../../Assets/Images/creator.png')}
                />
              </View>
              <Text style={styles.IconText}>Creator</Text>
              {select == '2' ? (
                <View style={styles.IconContainer}>
                  <View style={styles.CheckIcon}>
                    <FontAwesome name="check" size={18} color={'white'} />
                  </View>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>


        </View>

        <CustomButton
          onPress={CallSignup}
          text={'continue'}
          stylz={{
            paddingVertical: verticalScale(20),
          }}
          Textalig={{
            color: 'white',
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    backgroundColor: 'black',
    paddingTop: scale(20),
  },
  ImgContainer: {
    alignItems: 'center',
  },
  firstText: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: '#FFFF',
    paddingHorizontal: scale(22),
  },
  Stext: {
    color: '#FFFF',
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(22),
  },
  BoxContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: verticalScale(20),
  },
  Boxes: {
    height: scale(160),
    width: scale(145),
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Icons: {
    height: scale(35),
    width: scale(35),
  },
  IconBox: {
    height: scale(55),
    width: scale(55),
    backgroundColor: '#05BC03',
    borderRadius: moderateScale(17),
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconText: {
    marginTop: scale(10),
    fontWeight: '600',
    fontSize: moderateScale(15),
    color: '#05BC03',
  },
  CheckIcon: {
    height: scale(24),
    width: scale(24),
    borderRadius: 100,
    backgroundColor: '#05BC03',
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconContainer: {
    position: 'absolute',
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default AccountType
