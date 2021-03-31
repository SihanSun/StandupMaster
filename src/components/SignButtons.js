import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function SignButton({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

export function SignTextInput({ leftIcon, ...otherProps }) {
    return (
        <View style={styles.container}>
            {leftIcon && (
                <MaterialCommunityIcons
                    name={leftIcon}
                    size={20}
                    color="#6e6869"
                    style={styles.icon}
                />
            )}
            <TextInput
                {...otherProps}
                style={[styles.input, otherProps.style]}
                placeholderTextColor="#6e6869"
            />
        </View>
    );
}

const { width } = Dimensions.get("window");
export const styles = StyleSheet.create({
    button: 
    {
        marginVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '80%',
        backgroundColor: '#007aff'
    },
    buttonText: 
    {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    container: 
    {
        backgroundColor: '#f9f9f9',
        borderRadius: 25,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10
    },
    icon: 
    {
        marginRight: 10
    },
    input: 
    {
        width: '80%',
        fontSize: 18,
        color: '#101010'
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    ccontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 25,
        color: '#202020',
        fontWeight: '500',
        marginVertical: 15
    },
    footerButtonContainer: {
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotPasswordButtonText: {
        color: 'tomato',
        fontSize: 18,
        fontWeight: '600'
    },
    confirmButtonText: {
        color: 'grey',
        fontSize: 18,
        fontWeight: '600'
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height: 160,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    }
});