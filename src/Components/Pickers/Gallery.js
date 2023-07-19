import React, {useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import {launchImageLibrary} from 'react-native-image-picker'
import {scale, verticalScale} from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Font } from '../../Assets/Fonts/Font'

const Gallery = ({saveImage6, setSaveImage6}) => {

  const [proimg, setproimg] = useState(true)


  const filessave = () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
      selectionLimit: 5,
    }

    launchImageLibrary(options, (res) => {
      // console.log(res)
      if (res.didCancel) {
        // console.log('User cancelled image picker')
      } else if (res.error) {
        // console.log('ImagePicker Error: ', res.error)
      } else if (res.customButton) {
        // console.log('User tapped custom button: ', res.customButton)
        alert(res.customButton)
      } else {
        const images = res.assets.map(e => ({uri: e.uri,name: e.fileName,type: e.type})).slice(0, 5);

        if (saveImage6.length < 5){
          saveImage6.length  ? setSaveImage6([...saveImage6, ...images]) : setSaveImage6(images)
        } else {
          const stateCopy = [...saveImage6];
          stateCopy.splice(stateCopy.length - images.length, images.length)
          setSaveImage6([...stateCopy, ...images])
        }
      }
    })
  }

  const emptyImage = () => {
    filessave()
    setproimg(false)
  }

  return (
    <>
      <TouchableOpacity onPress={emptyImage} style={styles.SelectBox}>
        {proimg ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.IconCon}>
              <AntDesign name="upload" size={scale(20)} color={'white'} />
            </View>
            <Text style={{color: '#000000',fontFamily: Font.OpenSans400, fontSize: scale(10)}}>
              Tap to upload
            </Text>
          </View>
        ) : (
          <Image
            style={styles.UserImage}
            resizeMode="contain"
            source={{uri: saveImage6[0]?.uri}}
          />
        )}
      </TouchableOpacity>

      <View style={styles.FourCon}>
        <View style={styles.FourBoxes}>
          {proimg ? (
            <Text style={{color: 'grey',fontFamily: Font.OpenSans400}}>no: 2</Text>
          ) : (
            <>
              <Image
                style={styles.UserImage}
                resizeMode="contain"
                source={{uri: saveImage6[1]?.uri}}
              />
            
            </>
          )}
        </View>
        <View style={styles.FourBoxes}>
          {proimg ? (
            <Text style={{color: 'grey',fontFamily: Font.OpenSans400}}>no: 3</Text>
          ) : (
            <Image
              style={styles.UserImage}
              resizeMode="contain"
              source={{uri: saveImage6[2]?.uri}}
            />
          )}
        </View>
        <View style={styles.FourBoxes}>
          {proimg ? (
            <Text style={{color: 'grey',fontFamily: Font.OpenSans400}}>no: 4</Text>
          ) : (
            <Image
              style={styles.UserImage}
              resizeMode="contain"
              source={{uri: saveImage6[3]?.uri}}
            />
          )}
        </View>
        <View style={styles.FourBoxes}>
          {proimg ? (
            <Text style={{color: 'grey',fontFamily: Font.OpenSans400}}>no: 5</Text>
          ) : (
            <Image
              style={styles.UserImage}
              resizeMode="contain"
              source={{uri: saveImage6[4]?.uri}}
            />
          )}
        </View>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  SelectBox: {
    height: scale(110),
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconCon: {
    height: scale(40),
    width: scale(40),
    borderRadius: 100,
    backgroundColor: '#05BC03',
    justifyContent: 'center',
    alignItems: 'center',
  },
  UserImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  FourCon: {
    // height: scale(180),
    marginVertical: verticalScale(15),
    borderRadius: 12,
    width: '70%',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  },
  FourBoxes: {
    height: scale(70),
    width: scale(80),
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default Gallery
