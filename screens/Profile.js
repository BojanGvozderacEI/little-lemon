import { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { COLORS, USER_DATA_STORAGE_KEY } from '../constants';
import Button from '../components/Button';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const [loading, setLoading] = useState(true);

    const [imageSource, setImageSource] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Checkboxes state
    const [orderStatus, setOrderStatus] = useState(true);
    const [passwordChanges, setPasswordChanges] = useState(true);
    const [specialOffers, setSpecialOffers] = useState(true);
    const [newsletter, setNewsletter] = useState(true);

    const { updateUserData } = useContext(AuthContext);

    const onImageChange = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImageSource(result.assets[0].uri);
        }
    };

    const onImageClear = () => {
        setImageSource('');
    }

    const onLogOut = async () => {
        try {
            await AsyncStorage.removeItem(USER_DATA_STORAGE_KEY);

            updateUserData({});
        } catch (error) {
            console.log("Error logging out", error);
        }
    };

    const onSave = async () => {
        try {
            await AsyncStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify({
                imageSource,
                firstName,
                lastName,
                email,
                phoneNumber,
                orderStatus,
                passwordChanges,
                specialOffers,
                newsletter,
            }));
        } catch (error) {
            console.warn("Error setting user data", error);
        }
    };

    const initials = `${firstName?.length > 0 ? firstName[0] : ''} ${lastName?.length > 0 ? lastName[0] : ''}`

    useEffect(() => {
        const getUserData = async () => {
          try {
            const userData = await AsyncStorage.getItem(USER_DATA_STORAGE_KEY);
    
            if (userData) {
              const parsedUserData = JSON.parse(userData);

              setFirstName(parsedUserData.firstName);
              setEmail(parsedUserData.email);
              setLastName(parsedUserData.lastName ?? '');
              setPhoneNumber(parsedUserData.phoneNumber ?? '');

              setOrderStatus(parsedUserData.orderStatus ?? true);
              setPasswordChanges(parsedUserData.passwordChanges ?? true);
              setSpecialOffers(parsedUserData.specialOffers ?? true);
              setNewsletter(parsedUserData.newsletter ?? true);

              setImageSource(parsedUserData.imageSource ?? '');
            }
    
          } catch (error) {
            console.warn("Failed to fetch user data", error);
          } finally {
            setLoading(false);
          }
        };
    
        getUserData();
      }, []);

      if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
      }

    return (
        <SafeAreaView style={styles.container}>
            <Header initials={initials} profilePicture={imageSource} hasBack />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Personal Information</Text>

                {/* Change avatar section */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarContainer}>
                        {imageSource ? (
                            <Image source={{ uri: imageSource }} style={styles.avatar} />
                        ) : (
                            <Text style={styles.initials}>{initials}</Text>
                        )}
                    </View>
                    

                    <Button text="Change" variant="primary" onPress={onImageChange} />
                    <Button text="Remove" variant="secondary" onPress={onImageClear} />
                </View>

                {/* First name input section */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>
                        First name
                    </Text>
                    <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
                </View>

                {/* Last name input section */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>
                        Last name
                    </Text>
                    <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
                </View>

                {/* Email input section */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>
                        Email
                    </Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} />
                </View>

                {/* phone number input section */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>
                        Phone number
                    </Text>
                    <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} />
                </View>

                {/* Email notifications checkboxes section */}
                <View style={styles.notificationsContainer}>
                    <Text style={styles.title}>Email notifications</Text>

                    <View style={styles.checkboxContainer}>
                        <Checkbox style={styles.checkbox} value={orderStatus} onValueChange={setOrderStatus} />
                        <Text>Order statuses</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox style={styles.checkbox} value={passwordChanges} onValueChange={setPasswordChanges} />
                        <Text>Password changes</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox style={styles.checkbox} value={specialOffers} onValueChange={setSpecialOffers} />
                        <Text>Special offers</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox style={styles.checkbox} value={newsletter} onValueChange={setNewsletter} />
                        <Text>Newsletter</Text>
                    </View>
                </View>

                {/* Log out and save button section */}
                <View style={styles.actionsContainer}>
                    <Button customStyle={styles.actionButton} text="Log out" onPress={onLogOut} variant="secondary" />
                    <Button customStyle={styles.actionButton} text="Save changes" onPress={onSave} variant="primary" />
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        gap: 16,
        margin: 8,
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.black,
        borderRadius: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    avatarSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 64,
        height: 64,
        borderRadius: '100%',
        backgroundColor: COLORS.accent,
        overflow: 'hidden',
    },
    avatar: {
        width: 64,
        height: 64,
        resizeMode: 'cover',
    },
    initials: {
        color: COLORS.white,
        fontSize: 24,
    },
    inputSection: {
        gap: 4,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '200'
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#D9D9D9',
        borderRadius: 8,
        fontSize: 16,
    },
    notificationsContainer: {
        gap: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    checkbox: {
        borderRadius: 8,
    },
    actionsContainer: {
        flexDirection: 'row',
        marginTop: 'auto',
        gap: 16,
    },
    actionButton: {
        flex: 1,
    },
});

export default Profile;