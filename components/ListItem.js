import { View, StyleSheet, Image, Text } from "react-native";
import { COLORS } from "../constants";

const ListItem = ({item: { name, image, description, price }}) => {
    return (
        <View style={styles.container}>
            <View style={styles.textsContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
            <Image source={{ uri: image }} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 8,
        width: '100%',
    },
    textsContainer: {
        flex: 1,
        gap: 8,
    },
    name: {
        fontWeight: 'bold',
    },
    description: {
        fontWeight: 'light',
    },
    price: {
        color: COLORS.primary,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        backgroundColor: COLORS.gray,
    },
});

export default ListItem;