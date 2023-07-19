import React, {useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import {moderateScale, s, scale, verticalScale} from 'react-native-size-matters'
import CustomButton from '../CustomButton'
import CustomInput from '../CustomInput'
CustomInput

const SettingModal = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  return (
    // <View>
    //   <Text>huyh</Text>
    // </View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible2}
      onRequestClose={() => {
        setModalVisible2(!modalVisible2)
      }}>
      <View style={styles.centeredView2}>
        <View style={styles.CardContainer}>
          <View
            style={{
              height: scale(100),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: moderateScale(20),
                fontWeight: '700',
                color: 'black',
              }}>
              Agreement
            </Text>
          </View>
          <View
            style={{
              height: scale(250),
              width: '85%',
            }}></View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView2: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    // backgroundColor: ' rgba(6, 5, 24, 0.63)',
    backgroundColor: 'red',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 0.8,
  },
})
export default SettingModal
