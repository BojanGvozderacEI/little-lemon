import { FlatList, Pressable, StyleSheet, View, Text} from "react-native";
import { COLORS } from '../constants';
import { useEffect, useState } from "react";

const Categories = ({ categories = [], onFilterByCategory }) => {
    const [listCategories, setListCategories] = useState([]);

    useEffect(() => {
        setListCategories(categories.map(item => ({ name: item, selected: false })))
    }, [categories]);

    const onPress = (category) => {
        const newCategories = listCategories.map(item => {
            if (item.name === category) {
                return { name: category, selected: !item.selected };
            }

            return item;
        })

        setListCategories(newCategories);

        onFilterByCategory(newCategories.filter(({ selected }) => selected).map(({ name }) => name));
    };

    return (
        <FlatList
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            horizontal
            data={listCategories}
            renderItem={({item}) => {
                return (
                    <Pressable
                    style={({ pressed }) => ({ ...styles.container,  ...(item.selected && styles.selected), ...(pressed && styles.pressed) })}
                    onPress={() => onPress(item.name)}>
                        <Text style={{ ...styles.text, ...(item.selected && styles.selectedText) }}>{item.name}</Text>
                    </Pressable>
                );
            }}
            keyExtractor={({ name }) => name}
        /> 
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        height: 34,
        gap: 8,
        paddingHorizontal: 8,
        marginVertical: 16,
    },
    container: {
        padding: 8,
        borderRadius: 16,
        backgroundColor: COLORS.gray,
    },
    text: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    selected: {
        backgroundColor: COLORS.primary,
    },
    selectedText: {
        color: COLORS.white,
    },
    pressed: {
        opacity: 0.5,
    },
});

export default Categories;