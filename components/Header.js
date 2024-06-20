import { Pressable, Text, View, StyleSheet, Image } from "react-native";

import LogoImage from '../assets/logo-full.png';
import { COLORS, SCREEN_NAMES } from "../constants";
import { useNavigation } from "@react-navigation/native";


const Header = ({ hasBack = false, profilePicture, initials }) => {
    const { navigate, goBack } = useNavigation();

    return (
        <View style={styles.container}>
            {/* Back button */}
            {hasBack ? (
                <Pressable onPress={goBack} disabled={!hasBack} style={({ pressed }) => ({...styles.button, opacity: pressed ? 0.5 : 1})}>
                <Text style={styles.buttonText}>{'<'}</Text>
            </Pressable> 
            ) : <View style={styles.positioningView} />}
            

            {/* Logo */}
            <Image source={LogoImage} style={styles.logo} />

            {/* Profile picture */}
            <Pressable style={({ pressed }) => ({...styles.profilePictureContainer, opacity: pressed ? 0.5 : 1})} onPress={() => navigate(SCREEN_NAMES.Profile)}>
                {profilePicture ? (
                    <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                ) : (
                    <Text style={styles.initials}>{initials}</Text>
                ) }
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: COLORS.primary,
        borderRadius: '100%',
        
    },
    positioningView: {
        width: 40,
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    logo: {
        flex: 1,
        height: 48,
        resizeMode: 'contain',
    },
    profilePictureContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '100%',
        backgroundColor: COLORS.accent,
        overflow: 'hidden',
    },
    profilePicture: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
    initials: {
        color: COLORS.white,
    },
});

export default Header;