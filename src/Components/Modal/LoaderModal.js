import { ActivityIndicator, StyleSheet,  View, useColorScheme } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-native-modal'

const Loader = (props) => {
    const Theme = useSelector(state => state.mode)
    return (
     <Modal  
    //  backdropOpacity={0.4}
     onBackdropPress={props.onBackdropPress}
     isVisible={props.isVisible}
    //  isVisible={true}
     animationIn="fadeInLeft" // Set the animationIn property to slideInDown
     animationInTiming={400} // Adjust the animationInTiming value as needed
     animationOut="fadeInRight" // Set the animationOut property to slideOutUp
     animationOutTiming={400} // Adjust the animationOutTiming value as needed
    //  style={{
    //    flex: 1,
    //    margin:0
    // //    justifyContent: 'flex-start',
    //  }}
     >
       <View
        style={{
          // marginTop: space ? '70%' : 0,
          justifyContent: 'center',
          alignItems: 'center',
        //   backgroundColor: Theme === 'dark' ? Color.DarkTheme : Color.White,
          flex:1
        }}>
        <ActivityIndicator
          size="large"
          color={'white'}
        />
      </View>
      </Modal>
    )
}

export default Loader

const styles = StyleSheet.create({})