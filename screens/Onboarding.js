import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState } from 'react';
import { TextInput, View, Pressable, Image, SafeAreaView, StyleSheet, Text } from 'react-native';

import LogoFull from '../assets/logo-full.png';
import { USER_DATA_STORAGE_KEY } from '../constants';
import { AuthContext } from '../context/AuthContext';

export const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

const Onboarding = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const isLogInDisabled = !validateEmail(email) || !name;

    const { updateUserData } = useContext(AuthContext);

    AsyncStorage.clear();

    const onLogIn = async () => {
        // Guard against invalid input
        if (isLogInDisabled) {
            return;
        }

        try {
            await AsyncStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify({ firstName: name, email }));
            updateUserData({ firstName: name, email });
        } catch {
            console.warn("Error setting user data");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Logo Image */}
            <View style={styles.logoContainer}>
                <Image source={LogoFull} style={styles.logo} />
            </View>
            
            {/* Header - welcome text */}
            <Text style={styles.title}>
                Let us get to know you!
            </Text>
            
            {/* Inputs section to collect user first name and email  */}
            <View style={styles.inputsContainer}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder='First Name'
                />

                <TextInput 
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder='Email'
                    keyboardType='email-address'
                />
            </View>

            {/* Button to navigate to next screen with first name and email */}
            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => ({...styles.button, opacity: pressed || isLogInDisabled ? 0.5 : 1 })}
                    disabled={isLogInDisabled}
                    onPress={onLogIn}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 32,
    },
    logoContainer: {
        width: '100%',
        paddingHorizontal: 16,
        maxWidth: 240,
    },
    logo: {
        width: '100%',
        resizeMode: 'contain'
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
    },
    inputsContainer: {
        gap: 8,
        width: '100%',
        paddingHorizontal: 16,
        
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#D9D9D9',
        borderRadius: 8,
        fontSize: 20,
    },
    buttonContainer: {
        marginTop: 'auto',
        width: '100%',
        paddingHorizontal: 16,
    },
    button: {
        width: '100%',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#F4CE14',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 20,
    },
});

export default Onboarding;