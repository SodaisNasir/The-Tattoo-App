import React, {useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import {launchImageLibrary} from 'react-native-image-picker'
import {scale, verticalScale} from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Font } from '../../Assets/Fonts/Font'

const Gallery = ({saveImage6, setSaveImage6}) => {

  const [proimg, setproimg] = useState(true)
  const [saveImage,setSaveImage] = useState({})
  const [saveImage2,setSaveImage2] = useState({})
  const [saveImage3,setSaveImage3] = useState({})
  const [saveImage4,setSaveImage4] = useState({})
  const [saveImage5,setSaveImage5] = useState({})

  const filessave = () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
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
        setSaveImage({
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        })
        let sample = [saveImage, saveImage2, saveImage3, saveImage4, saveImage5]
        sample[0] = {
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        }
        setSaveImage6(sample)
        // const images = res.assets.map(e => ({uri: e.uri,name: e.fileName,type: e.type})).slice(0, 5);
        // if (saveImage6.length < 5){
        //   saveImage6.length  ? setSaveImage6([...saveImage6, ...images]) : setSaveImage6(images)
        // } else {
        //   const stateCopy = [...saveImage6];
        //   stateCopy.splice(stateCopy.length - images.length, images.length)
        //   setSaveImage6([...stateCopy, ...images])
        // }
      }
    })
  }
  const filessave2 = () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
      // selectionLimit: 5,
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
        setSaveImage2({
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        })
        let sample = [saveImage, saveImage2, saveImage3, saveImage4, saveImage5]
        sample[1] = {
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        }
        setSaveImage6(sample)
        // const images = res.assets.map(e => ({uri: e.uri,name: e.fileName,type: e.type})).slice(0, 5);

        // if (saveImage6.length < 5){
        //   saveImage6.length  ? setSaveImage6([...saveImage6, ...images]) : setSaveImage6(images)
        // } else {
        //   const stateCopy = [...saveImage6];
        //   stateCopy.splice(stateCopy.length - images.length, images.length)
        //   setSaveImage6([...stateCopy, ...images])
        // }
      }
    })
  }
  const filessave3 = () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
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
        setSaveImage3({
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        })
        let sample = [saveImage, saveImage2, saveImage3, saveImage4, saveImage5]
        sample[2] = {
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        }
        setSaveImage6(sample)
        // const images = res.assets.map(e => ({uri: e.uri,name: e.fileName,type: e.type})).slice(0, 5);

        // if (saveImage6.length < 5){
        //   saveImage6.length  ? setSaveImage6([...saveImage6, ...images]) : setSaveImage6(images)
        // } else {
        //   const stateCopy = [...saveImage6];
        //   stateCopy.splice(stateCopy.length - images.length, images.length)
        //   setSaveImage6([...stateCopy, ...images])
        // }
      }
    })
  }
  const filessave4 = () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
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
        setSaveImage4({
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        })
        let sample = [saveImage, saveImage2, saveImage3, saveImage4, saveImage5]
        sample[3] = {
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        }
        setSaveImage6(sample)
      }
    })
  }
  const filessave5 = () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
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
        setSaveImage5({
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        })
        let sample = [saveImage, saveImage2, saveImage3, saveImage4, saveImage5]
        sample[4] = {
          name: res.assets?.[0]?.fileName,
          uri: res.assets?.[0]?.uri,
          type: res.assets?.[0]?.type,
        }
        setSaveImage6(sample)
      }
    })
  }
  

  const emptyImage = () => {
    filessave()
    setproimg(false)
  }

  return (
    <>
      <TouchableOpacity onPress={() => filessave()} style={styles.SelectBox}>
        {!saveImage?.uri ? (
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
            source={{uri: saveImage?.uri}}
          />
        )}
      </TouchableOpacity>

      <View style={styles.FourCon}>
        <TouchableOpacity onPress={() => filessave2()}>
        <View style={styles.FourBoxes}>
          {!saveImage2?.uri ? (
            <Text style={{color: 'grey',fontFamily: Font.OpenSans400}}>no: 2</Text>
          ) : (
            <>
              <Image
                style={styles.UserImage}
                resizeMode="contain"
                source={{uri: saveImage2?.uri}}
              />
            
            </>
          )}
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => filessave3()}>
        <View style={styles.FourBoxes}>
          {!saveImage3?.uri ? (
            <Text style={{color: 'grey',fontFamily: Font.OpenSans400}}>no: 3</Text>
          ) : (
            <Image
              style={styles.UserImage}
              resizeMode="contain"
              source={{uri: saveImage3?.uri}}
            />
          )}
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => filessave4()}>

        <View style={styles.FourBoxes}>
          {!saveImage4?.uri ? (
            <Text style={{color: 'grey',fontFamily: Font.OpenSans400}}>no: 4</Text>
          ) : (
            <Image
              style={styles.UserImage}
              resizeMode="contain"
              source={{uri: saveImage4?.uri}}
            />
          )}
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => filessave5()}>

        <View style={styles.FourBoxes}>
          {!saveImage5?.uri ? (
            <Text style={{color: 'grey',fontFamily: Font.OpenSans400}}>no: 5</Text>
          ) : (
            <Image
              style={styles.UserImage}
              resizeMode="contain"
              source={{uri: saveImage5?.uri}}
            />
          )}
        </View>
        </TouchableOpacity>
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
