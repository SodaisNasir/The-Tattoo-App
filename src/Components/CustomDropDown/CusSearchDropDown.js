import { Animated, Easing, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { Font } from '../../Assets/Fonts/Font'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const CusSearchDropDown = (props) => {
    const navigation = useNavigation()
    const allcreators = useSelector(state => state.allcreators)
    const userData = useSelector(state => state.user_details)

    const [show, setShow] = useState(false);
    const [data, setData] = useState('');
    console.log('data', data)
    // Define the animation value and its initial state
    const animatedHeight = useState(new Animated.Value(0))[0];

    const handleClick = () => {
        setShow(!show);
        // Start the animation to show/hide the dropdown
        Animated.timing(animatedHeight, {
            toValue: show ? 0 : 1, // Target value depending on show/hide state
            duration: 300, // Animation duration in milliseconds
            easing: Easing.linear, // Easing function for the animation
            useNativeDriver: false, // Set to false for this type of animation
        }).start(); // Start the animation
    };

    const handlePress = (code) => {
        props.setType(code.name)
        setData(code);
        setShow(!show);
        if (userData.data.role_id == 1) {
            navigation.navigate('RandomProfile', { id: code.id })
        }
        // Start the animation to show/hide the dropdown
        Animated.timing(animatedHeight, {
            toValue: show ? 0 : 1, // Target value depending on show/hide state
            duration: 300, // Animation duration in milliseconds
            easing: Easing.linear, // Easing function for the animation
            useNativeDriver: false, // Set to false for this type of animation
        }).start(); // Start the animation
    };

    // Calculate the animated height for the dropdown
    const dropdownHeight = animatedHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, verticalScale(5) * verticalScale(30)],
    });
    return (
        <>
            <TouchableOpacity onPress={() => handleClick()}>
                <View style={styles.MainContainer}>
                    <View style={{ flex: 2, justifyContent: 'center', paddingLeft: scale(15) }}>
                        {
                            data ?
                                <View
                                    style={{
                                        height: verticalScale(30),
                                        backgroundColor: 'white',
                                        justifyContent: 'center'
                                    }} >
                                    <Text style={{
                                        color: 'black',
                                        fontFamily: Font.OpenSans400
                                    }}>
                                        {
                                            data.name
                                        }
                                    </Text>
                                </View>
                                :
                                <Text style={{
                                    color: 'black',
                                    fontFamily: Font.OpenSans400
                                }}>{userData.data.role_id == 1 ? 'Tag creator' : 'Tag user'}</Text>
                        }

                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </TouchableOpacity>

            {/* Use Animated.View for the dropdown */}

            <Animated.View style={{ overflow: 'hidden', borderBottomRightRadius: 12, borderBottomLeftRadius: 12, height: dropdownHeight }}>
                <ScrollView contentContainerStyle={{ overflow: 'hidden', borderBottomRightRadius: 12, borderBottomLeftRadius: 12, }} nestedScrollEnabled={true}>
                    {allcreators?.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handlePress(item)}
                            style={{
                                height: verticalScale(30),
                                backgroundColor: 'white',
                                paddingLeft: scale(15),
                                justifyContent: 'center'
                            }}
                            activeOpacity={0.8}
                        >
                            <Text style={{
                                color: 'black',
                                fontSize: scale(13),
                                fontFamily: Font.OpenSans400,
                            }}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Animated.View>

        </>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'white',
        height: verticalScale(50),
        borderRadius: 8,
        // marginTop: scale(15),
        flexDirection: 'row',
        overflow: 'hidden',
    }
});
export default CusSearchDropDown
