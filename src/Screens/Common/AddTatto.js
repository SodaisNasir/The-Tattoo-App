import React, {useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo'
import BackArrow from '../../Components/BackArrow'
import DropDownPicker from 'react-native-dropdown-picker'
import Top2navigator from '../../Components/Top2bar'
import CustomButton from '../../Components/CustomButton'
import CustomInput from '../../Components/CustomInput'
import {useForm} from 'react-hook-form'
import Gallery from '../../Components/Pickers/Gallery'
import { useSelector } from 'react-redux'
import { Email_Regex } from '../../Utils/BaseUrl'
import Validation from '../../Components/Validation'
import Modal from 'react-native-modal'
import {SelectList} from 'react-native-dropdown-select-list';
import { creatorAddUser, submitTattoEntry } from '../../redux/actions/UserActions'
import Loader from '../../Components/Modal/LoaderModal'
import TickModal from '../../Components/Modal/TickModal'

const AddTatto = ({navigation}) => {
    const userData = useSelector(state => state.user_details)
    const skintones = useSelector(state => state.skintones)
    const allcreators = useSelector(state => state.allcreators)
    const [saveImage6, setSaveImage6] = useState([])
    const [btn1, setBtn1] = useState(true)
    const [btn2, setBtn2] = useState(false)
    const [chooseColor, setChooseColor] = useState(false)
    const [type, setType] = useState();
    const [selectCreator, setSelectCreator] = useState();
    const [loader, setLoader] = useState(false);
    const [check, setCheck] = useState(false)


    const newData = skintones.map((item) => {
        return {label: item.id, value: item.code}
      })
    const creatos = allcreators.map((item) => {
        return {label: item.id, value: item.name}
      })

    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
      } = useForm({mode: 'all'})
    const AllOne = () => {
      setBtn1(true)
      setBtn2(false)
    }
    const CreditTwo = () => {
      setBtn2(true)
      setBtn1(false)
      setChooseColor(true)
    }
    const CancelModal = (data) => {
      creatorAddUser(
        data,
        setBtn1,
      setBtn2,
      setChooseColor)
   
    }
    const onSubmit = () => {
        submitTattoEntry(saveImage6,selectCreator,type,setLoader,setCheck,navigation)
    }


  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackArrow
          onPress={() => navigation.goBack()}
          restyle={{
            marginTop: scale(20),
          }}
        />
        <Text style={styles.TopText}>add new tattoo</Text>

        <Text style={styles.SelectBoxText}>You can add up to 5 images</Text>

        <Gallery   {...{setSaveImage6,saveImage6}}/>

        <View style={styles.DropdownBox}>
            <Text style={{color: 'white',paddingLeft: scale(7),bottom:3}}>Skin Tone</Text>
            <SelectList
              placeholder="Select tone"
              arrowicon={
                <Entypo
                  name="chevron-down"
                  size={scale(18)}
                  color={'white'}
                />
              }
              closeicon={
                <Entypo
                  name="chevron-up"
                  size={scale(18)}
                  color={'white'}
                />
              }
              dropdownStyles={styles.dropdownStyles}
              dropdownItemStyles={styles.dropdownItemStyles}
              boxStyles={styles.boxStyles}
              dropdownTextStyles={styles.dropdownTextStyles}
              inputStyles={styles.inputStyles}
              search={false}
              setSelected={val => setType(val)}
              data={newData}
              save="value"
            />
          </View>

        {/* <Top2navigator
          NameOne={userData.data.role_id == 1? 'tag creator' :'tag user'}
          All={AllOne}
          AllText={{
            color: btn1 ? 'white' : '#05BC03',
          }}
          AllBG={{
            backgroundColor: btn1 ? '#05BC03' : '#D7D7D7',
          }}
          Credit={CreditTwo}
          NameTwo={userData.data.role_id == 1? 'add creator' :'add user'}
          CreditText={{
            color: btn2 ? 'white' : '#05BC03',
          }}
          BGCOLOR={{
            backgroundColor: btn2 ? '#05BC03' : '#D7D7D7',
          }}
        /> */}
  
          <View style={[styles.DropdownBox,{marginTop:scale(15)}]}>
            <Text style={{color: 'white',paddingLeft: scale(7),bottom:3}}>{userData.data.role_id == 1? 'Tag creator' :'Tag user'}</Text>
            <SelectList
             placeholder={userData.data.role_id == 1? 'Tag creator' :'Tag user'}
              arrowicon={
                <Entypo
                  name="chevron-down"
                  size={scale(18)}
                  color={'white'}
                />
              }
              closeicon={
                <Entypo
                  name="chevron-up"
                  size={scale(18)}
                  color={'white'}
                />
              }
              dropdownStyles={styles.dropdownStyles}
              dropdownItemStyles={styles.dropdownItemStyles}
              boxStyles={styles.boxStyles}
              dropdownTextStyles={styles.dropdownTextStyles}
              inputStyles={styles.inputStyles}
              search={false}
              setSelected={val => setSelectCreator(val)}
              data={creatos}
              save="key"
            />
          </View>
          {
            userData.data.role_id == 2 &&
           <>
            <View style={{height: verticalScale(70),flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>

              <Text style={{height:0,borderWidth:1,borderColor: 'white',width: '40%'}}></Text>
              <Text style={{color: 'white',fontSize:scale(17)}}>OR</Text>
              <Text style={{height:0,borderWidth:1,borderColor: 'white',width: '40%'}}></Text>

            </View>           
            <CustomButton
            onPress={() => setChooseColor(true)}
            text={'add user'}
              // stylz={{
              //   marginTop: scale(40),
              // }}
              Textalig={{
                color: 'white',
                fontSize: 17,
              }}
              />
              </>
          }

        <CustomButton
        //   onPress={() => navigation.navigate('creatorhome')}
        onPress={() => onSubmit()}
          text={'add entry'}
          // stylz={{
          //   marginTop: scale(10),
          // }}
          Textalig={{
            color: 'white',
            fontSize: 17,
          }}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={chooseColor}
          style={{
            margin:0
          }}
          onBackdropPress={CancelModal}>
          <View style={styles.centeredView2}>
            <TouchableOpacity
              onPress={() => setChooseColor(false)}
              style={{
                height: scale(25),
                width: scale(25),
                backgroundColor: 'rgba(6, 5, 24, 0.90)',
                borderRadius: 100,
                position: 'absolute',
                right: scale(20),
                top: scale(10),
              }}>
              <Entypo name="cross" color={'white'} size={20} />
            </TouchableOpacity>

            <View style={styles.CardContainer}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontFamily: 'sans open',
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                    {userData.data.role_id == 1? 'Add New Creator' :'Add New User'}
              </Text>

              <CustomInput
                InputUText={'Full Name'}
                name="f_name"
                rules={{
                  required: 'Full Name is required',
                }}
                control={control}
                style={styles.textInput}
                textStyle={styles.InputTextStyle}
                keyboardType={'default'}
                Hello={{
                  height: scale(75),
                  marginTop: scale(40),
                }}
                restyle={{
                  height: scale(44),
                }}
              />
                 {errors.f_name && <Validation title={errors.f_name.message} />}
              <CustomInput
                InputUText={'Email'}
                name="email"
                rules={{
                    required: 'Email is required',
                    value: Email_Regex,
                    pattern: {
                      value: Email_Regex,
                      message: 'Enter a valid Email',
                    },
                  }}
                control={control}
                style={styles.textInput}
                textStyle={styles.InputTextStyle}
                keyboardType={'email-address'}
                restyle={{
                  height: scale(44),
                }}
              />
              {errors.email && <Validation title={errors.email.message} />}

              <CustomButton
                onPress={handleSubmit(CancelModal)}
                Textalig={{
                  color: 'white',
                  fontSize: 18,
                }}
                text={userData.data.role_id == 1? 'Add creator' :'Add user'}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
      <Loader
        onBackdropPress={() => setLoader(false)}
        isVisible={loader}
        /> 
         <TickModal
          text={'User has been added successfully!'}
          onPress={() => setCheck(false)}
          onBackdropPress={() => setCheck(false)}
          isVisible={check}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: 'black',
      paddingHorizontal: scale(20),
    },
    TopText: {
      color: 'white',
      textTransform: 'capitalize',
      textAlign: 'center',
      position: 'relative',
      bottom: scale(25),
      fontFamily: 'sans open',
      fontSize: moderateScale(15),
      fontWeight: '700',
      fontStyle: 'normal',
      letterSpacing: 0.4,
    },
    SelectBox: {
      height: scale(110),
      borderRadius: 10,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    IconCon: {
      height: scale(50),
      width: scale(50),
      borderRadius: 100,
      backgroundColor: '#05BC03',
      justifyContent: 'center',
      alignItems: 'center',
    },
    SelectBoxText: {
      color: 'white',
      textTransform: 'capitalize',
      fontFamily: 'sans open',
      fontSize: moderateScale(13),
      fontWeight: '500',
      fontStyle: 'normal',
      letterSpacing: 0.4,
      paddingHorizontal: scale(5),
    },
  
    centeredView2: {
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(6, 5, 24, 0.90)',
      paddingHorizontal: scale(20),
    },
    CardContainer: {
      height: '70%',
      width: '100%',
      position: 'relative',
      top: scale(70),
    },
    UserImage: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },

    boxStyles: {
        backgroundColor: 'white',
        height: verticalScale(55),
        alignItems: 'center',
        borderRadius: 8,
        // borderTopRightRadius:12,
        // borderTopLeftRadius:12,
        // marginTop: verticalScale(20),
      },
      inputStyles: {
        color: 'black',
        fontSize: scale(13),
        // fontFamily: Font.Gilroy500,
      },
      dropdownTextStyles: {
        color: 'black',
      },
      dropdownItemStyles: {
        backgroundColor: 'white',
      },
      dropdownStyles: {
        backgroundColor: 'white',
        borderWidth: scale(1),
        borderColor: 'black',
        bottom:10,
        borderRadius: 0,
        borderBottomRightRadius:12,
        borderBottomLeftRadius:12,
      },
  })
export default AddTatto
