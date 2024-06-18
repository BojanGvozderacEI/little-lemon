import { View, Image, StyleSheet } from 'react-native';

import LogoImage from '../assets/logo-full.png';

const SplashScreen = () => (
    <View style={styles.container}>
        <Image style={styles.image} source={LogoImage} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
    },
});

export default SplashScreen;