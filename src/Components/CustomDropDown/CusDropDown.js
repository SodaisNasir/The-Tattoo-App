import { Animated, Easing, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { Font } from '../../Assets/Fonts/Font'
import { useSelector } from 'react-redux'

const CusDropDown = (props) => {
    const skintones = useSelector(state => state.skintones);
    const [show, setShow] = useState(false);
    const [data, setData] = useState('');

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
        props.setType(code)
        setData(code);
        setShow(!show);
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
        outputRange: [0, skintones.length * verticalScale(30)],
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
                                height: scale(20),
                                width: scale(20),
                                backgroundColor: data
                            }}
                            />
                            :
                        <Text style={{
                            color: 'black',
                            fontFamily: Font.OpenSans400
                        }}>Select tone</Text>
                    }
                            
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </TouchableOpacity>

            {/* Use Animated.View for the dropdown */}

            <Animated.View style={{
                flex: 1,
                overflow: 'hidden',
                borderBottomRightRadius: 12,
                borderBottomLeftRadius: 12,
                height: dropdownHeight,
            }}>
                <FlatList
                    data={skintones}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => handlePress(item.code)}
                                key={item.id}
                                style={{
                                    height: verticalScale(30),
                                    backgroundColor: item.code,
                                }} />
                        );
                    }}
                />
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

export default CusDropDown;
