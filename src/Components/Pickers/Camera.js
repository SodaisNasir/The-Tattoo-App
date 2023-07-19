import React, {useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

const Camera = () => {
  const [imageUrl, setImageUrl] = useState({})

  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      saveToPhotos: true,
    }
    launchCamera(options, (res) => {
      console.log('Response = ', res)
      if (res.didCancel) {
        console.log('User cancelled image picker')
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error)
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton)
        alert(res.customButton)
      } else {
        let source = res
        setImageUrl({
          filePath: source,
          fileData: source.assets?.[0]?.data,
          fieUri: source.assets?.[0]?.uri,
        })
      }
    })
  }
  return (
    <TouchableOpacity
      style={{
        marginTop: 30,
      }}
      onPress={() => cameraLaunch()}>
      <Image
        style={{
          height: 50,
          width: 50,
          borderRadius: 100,
          borderWidth: 5,
          borderColor: 'red',
          margin: 10,
        }}
        source={{uri: imageUrl.fileUri}}
      />
      <Text style={{textAlign: 'center'}}>Camera</Text>
    </TouchableOpacity>
  )
}

export default Camera

const styles = StyleSheet.create({})
