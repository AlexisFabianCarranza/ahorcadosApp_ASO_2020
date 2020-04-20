import React, { Fragment } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    keyboard: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 16,
        alignItems: 'center'
    },
    buttonKeyboard: {
        paddingHorizontal: 10
    }
});



export const Keyboard = ({ onPressKey, letterIncludes }) => {
    const rowLetters = [ 
        {from: 'A', to: 'H'},
        {from: 'I', to: 'Q'},
        {from: 'R', to: 'Z'},
    ];

    const genCharArray = (charA, charZ) => {
        var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (; i <= j; ++i) {
            a.push(String.fromCharCode(i));
        }
        return a;
    }

    const getTextStyle = (letter) => {
        let style = {
            fontSize: 30,
            paddingVertical: 12
        }
        if (letterIncludes.includes(letter)) {
            style = {
                ...style,
                textDecorationLine: "line-through",
                color: 'green'
            }
        }
        return style
    };

    return (
        <Fragment>
            {rowLetters.map(({from, to}, i) => (
                <View key={i} style={styles.keyboard}>
                    {genCharArray(from, to).map(letter => (
                        <View style={styles.buttonKeyboard}>
                            <TouchableOpacity onPress={() => onPressKey(letter)} disabled={letterIncludes.includes(letter)}>
                                <Text style={getTextStyle(letter)}>{letter}</Text>
                            </TouchableOpacity>
                        </View>))}
                </View>
            ))}
        </Fragment>
    )
}