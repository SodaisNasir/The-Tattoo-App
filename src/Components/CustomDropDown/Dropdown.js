import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import DropDownPicker from 'react-native-dropdown-picker'
import { Font } from '../../Assets/Fonts/Font'

const Dropdown = ({
    open,
    placeholder,
    onConfirm,
    setOpen,
    value,
    items,
    setValue,
    setItems,
    multiple,
    min,
    max,
}) => {
    return (
        <DropDownPicker
            placeholder={placeholder}
            style={styles.textField}
            arrowIconStyle={{
                borderColor: '#435CA8',
            }}
            dropDownContainerStyle={{
                borderColor: 'lightgrey',
                width: '100%',
            }}
            textStyle={{
                fontSize: scale(10),
                fontFamily: Font.Mulish500,
                color: '#9093A3',
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            multiple={multiple}
            min={min}
            max={max}
            mode="BADGE"
            badgeDotColors={[
                '#e76f51',
                '#00b4d8',
                '#e9c46a',
                '#e76f51',
                '#8ac926',
                '#00b4d8',
                '#e9c46a',
            ]}
        />
    )
}

const styles = StyleSheet.create({
    textField: {
        height: verticalScale(50),
        backgroundColor: '#ffff',
        fontSize: scale(16),
        borderRadius: scale(8),
        borderColor: 'lightgrey',
        elevation: 1,
        shadowColor: 'rgba(0,0,0)',
        shadowOffset: [1, 1],
        shadowRadius: 5,
        shadowOpacity: 0.7,
    },
})

export default Dropdown
