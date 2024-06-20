import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { COLORS } from '../constants';

import BannerImage from '../assets/banner-image.jpg';

const Banner = ({ searchValue, onSearch }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Little Lemon</Text>
            <View style={styles.descriptionContainer}>
                <View style={styles.descriptionTextsContainer}>
                    <Text style={styles.subTitle}>Chicago</Text>
                    <Text style={styles.description}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist</Text>
                </View>

                <Image source={BannerImage} style={styles.image} />
            </View>
            <TextInput style={styles.input} placeholder='Search' value={searchValue} onChangeText={onSearch} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 4,
        padding: 8,
        backgroundColor: COLORS.primary,
    },
    title: {
        fontSize: 64,
        color: COLORS.secondary,
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    descriptionTextsContainer: {
        flex: 1,
        gap: 4,
    },
    subTitle: {
        fontSize: 40,
        color: COLORS.white,
    },
    description: {
        color: COLORS.white,
        fontSize: 18,
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 16,
    },
    input: {
        backgroundColor: COLORS.gray,
        padding: 8,
        borderRadius: 8,
    },
});

export default Banner;