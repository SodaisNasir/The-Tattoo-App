import React, {useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native'
import StaggeredList from '@mindinventory/react-native-stagger-view'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters'
import {SafeAreaView} from 'react-native-safe-area-context'
import CustomInput from '../../Components/CustomInput'
import {useForm} from 'react-hook-form'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomButton from '../../Components/CustomButton'

const AddTattoArchive = () => {
  const [isModal, setIsModal] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [chooseColor, setChooseColor] = useState(false)
  return (
    <Modal
      onRequestClose={() => setChooseColor(false)}
      onClose={() => setChooseColor(false)}
      animationType="slide"
      transparent={true}
      visible={chooseColor}>
      <View style={styles.centeredView2}>
        <View
          style={{
            height: scale(260),
            backgroundColor: '#9F9F9F',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: scale(65),
              width: scale(65),
              borderRadius: 100,
              backgroundColor: '#D9D9D9',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="plus" size={40} color={'#05BC03'} />
          </TouchableOpacity>
        </View>

        <View style={{width: '100%'}}>
          <CustomInput
            InputUText={'Time Passed'}
            name="Email"
            rules={{
              required: 'Email is required',
            }}
            style={styles.textInput}
            textStyle={styles.InputTextStyle}
            keyboardType={'default'}
            restyle={{
              height: scale(40),
            }}
            Hello={{
              marginVertical: verticalScale(10),
            }}
          />
          {/* {errors.Email && <Validation title={errors.Email.message} />} */}

          <CustomButton
            restyle={{
              height: scale(44),
              marginTop: scale(10),
            }}
            Textalig={{
              fontSize: 17,
            }}
            text={'add to archive'}
          />
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
    backgroundColor: 'rgba(6, 5, 24, 0.63)',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // opacity: 0.8,
    paddingHorizontal: scale(20),
    justifyContent: 'center',
  },
})
export default AddTattoArchive
