import React, {useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native'
import {moderateScale, scale, verticalScale} from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HomeModal = () => {
  const [isEnabled, setIsEnabled] = useState(true)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [chooseColor, setChooseColor] = useState(false)
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible2}>
      <View style={styles.centeredView2}>
        <View
          style={{
            height: scale(60),
            width: '100%',
            marginTop: scale(80),
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
              width: '20%',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: scale(50),
                width: scale(50),
                borderRadius: 100,
              }}>
              <TouchableOpacity>
                <Image
                  style={{
                    flex: 1,
                    borderRadius: 100,
                  }}
                  source={{
                    uri: 'https://menshaircuts.com/wp-content/uploads/2019/01/tattoos-for-men-tribal-chest-sleeve-683x1024.jpg',
                  }}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: '100%',
              width: '80%',
              justifyContent: 'center',
              paddingHorizontal: scale(10),
            }}>
            <Text
              style={{
                fontFamily: 'mulish',
                fontSize: 15,
                fontWeight: '700',
                color: 'white',
              }}>
              Arneo Paris
            </Text>
            <Text
              style={{
                fontFamily: 'mulish',
                fontSize: 13,
                fontWeight: '700',
                color: 'white',
              }}>
              Arneo
            </Text>
          </View>
        </View>

        <View
          style={{
            height: scale(300),
            width: '100%',
            marginVertical: verticalScale(5),
            paddingHorizontal: scale(10),
          }}>
          <Image
            style={{
              flex: 1,
            }}
            source={{
              uri: 'https://menshaircuts.com/wp-content/uploads/2019/01/tattoos-for-men-tribal-chest-sleeve-683x1024.jpg',
            }}
            resizeMode={'cover'}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: scale(40),
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: scale(10),
          }}>
          <TouchableOpacity onPress={() => setIsLike(true)}>
            <AntDesign
              name={isLike ? 'like1' : 'like2'}
              size={27}
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
            56 Likes
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
              size={27}
              color={'white'}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
            marginBottom: scale(15),
            flexDirection: 'row',
            paddingHorizontal: scale(10),
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'open sans',
              fontSize: 15,
              fontWeight: '400',
              paddingRight: scale(5),
            }}>
            Creator
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'open sans',
              fontSize: 15,
              fontWeight: '700',
            }}>
            Gadbu et D autres personnes
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              height: scale(90),
              width: scale(80),
            }}>
            <View
              style={{
                height: scale(70),
                width: '100%',
              }}>
              <Image
                style={{
                  flex: 1,
                  borderRadius: 10,
                }}
                source={{
                  uri: 'https://menshaircuts.com/wp-content/uploads/2019/01/tattoos-for-men-tribal-chest-sleeve-683x1024.jpg',
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
              1 Day ago
            </Text>
          </View>
          <View
            style={{
              height: scale(90),
              width: scale(80),
            }}>
            <View
              style={{
                height: scale(70),
                width: '100%',
              }}>
              <Image
                style={{
                  flex: 1,
                  borderRadius: 10,
                }}
                source={{
                  uri: 'https://menshaircuts.com/wp-content/uploads/2019/01/tattoos-for-men-tribal-chest-sleeve-683x1024.jpg',
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
              1 Month ago
            </Text>
          </View>
          <View
            style={{
              height: scale(90),
              width: scale(80),
            }}>
            <View
              style={{
                height: scale(70),
                width: '100%',
              }}>
              <Image
                style={{
                  flex: 1,
                  borderRadius: 10,
                }}
                source={{
                  uri: 'https://menshaircuts.com/wp-content/uploads/2019/01/tattoos-for-men-tribal-chest-sleeve-683x1024.jpg',
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
              2 Years ago
            </Text>
          </View>
          <View
            style={{
              height: scale(90),
              width: scale(80),
            }}>
            <View
              style={{
                height: scale(70),
                width: '100%',
              }}>
              <Image
                style={{
                  flex: 1,
                  borderRadius: 10,
                }}
                source={{
                  uri: 'https://menshaircuts.com/wp-content/uploads/2019/01/tattoos-for-men-tribal-chest-sleeve-683x1024.jpg',
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
              4 Years ago
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView2: {
    height: '100%',
    width: '100%',
    // alignItems: 'center',
    shadowColor: '#000',
    backgroundColor: ' rgba(6, 5, 24, 0.63)',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // opacity: 0.8,
    paddingHorizontal: scale(5),
  },
})
export default HomeModal
