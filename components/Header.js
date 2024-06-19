import { Pressable, Text, View, StyleSheet, Image } from "react-native";

import LogoImage from '../assets/logo-full.png';
import { COLORS } from "../constants";


const Header = ({ hasBack = false, profilePicture, initials }) => {
    return (
        <View style={styles.container}>
            {/* Back button */}
            <Pressable disabled={!hasBack} style={({ pressed }) => ({...styles.button, opacity: pressed ? 0.5 : 1})}>
                <Text style={styles.buttonText}>{'<'}</Text>
            </Pressable>

            {/* Logo */}
            <Image source={LogoImage} style={styles.logo} />

            {/* Profile picture */}
            <View style={styles.profilePictureContainer}>
                {profilePicture ? (
                    <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                ) : (
                    <Text style={styles.initials}>{initials}</Text>
                ) }
            </View>
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