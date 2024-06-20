import { useContext, useEffect, useState, useRef } from "react";
import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";
import * as SQLite from 'expo-sqlite';
import { AuthContext } from "../context/AuthContext";

import Header from '../components/Header';
import { fetchListData } from "../services/api";
import ListItem from "../components/ListItem";
import Categories from "../components/Categories";
import Banner from "../components/Banner";

const Home = () => {
    const { user } = useContext(AuthContext);

    const [listData, setListData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    let timerRef = useRef(null);
    let categoriesRef = useRef([]);

    let db = null;

    useEffect(() => {
        const getListData = async () => {
            if (!db) {
                db = await SQLite.openDatabaseAsync('little_lemon');
            }

            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, price FLOAT NOT NULL, description TEXT, image TEXT, category TEXT);
            `);

            const tableData = await db.getAllAsync('SELECT * FROM menu');

            if (tableData.length > 0) {
                setListData(tableData);

                const tableCategories = Array.from(new Set(tableData.map(({ category }) => category)));
                setCategories(tableCategories);
            } else {
                const remoteData = await fetchListData();

                setListData(remoteData);

                const tableCategories = Array.from(new Set(remoteData.map(({ category }) => category)));
                setCategories(tableCategories);

                const statement = await db.prepareAsync('INSERT INTO menu (name, price, description, image, category) VALUES ($name, $price, $description, $image, $category)');

                for (const item of remoteData) {
                    await statement.executeAsync({ $name: item.name, $price: item.price, $description: item.description, $image: item.image, $category: item.category });
                }
            }
        };

        getListData();
    }, []);

    const filterBySearch = async () => {
        if (!db) {
            db = await SQLite.openDatabaseAsync('little_lemon');
        }

        try {
            if (!searchValue && categoriesRef.current.length === 0) {
                tableData = await db.getAllAsync("SELECT * FROM menu");
            } else if (!searchValue && categoriesRef.current.length > 0) {
                let placeholders = categoriesRef.current.map((_,i) => '$'+(i+1)).join(',');
                tableData = await db.getAllAsync(`SELECT * FROM menu WHERE category IN (${placeholders})`, categoriesRef.current);
            } else if (searchValue && categoriesRef.current.length === 0) {
                tableData = await db.getAllAsync(`SELECT * FROM menu WHERE name LIKE ?`, `%${searchValue}%`)
            } else {
                let placeholders = categoriesRef.current.map((_,i) => '$'+(i+1)).join(',');
                tableData = await db.getAllAsync(`SELECT * FROM menu WHERE category IN (${placeholders}) AND name LIKE ?`, [...categoriesRef.current, `%${searchValue}%`]);
            }

            setListData(tableData);
        } catch (error) {
            console.warn(error);
        }
    };

    

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(filterBySearch, 500);

        return () => clearTimeout(timerRef.current);
    }, [searchValue]);

    const onFilterByCategory = async (selectedCategories) => {
        if (!db) {
            db = await SQLite.openDatabaseAsync('little_lemon');
        }

        let tableData = [];

        try {
            if (!searchValue && selectedCategories.length === 0) {
                tableData = await db.getAllAsync("SELECT * FROM menu");
            } else if (!searchValue && selectedCategories.length > 0) {
                let placeholders = selectedCategories.map((_,i) => '$'+(i+1)).join(',');
                tableData = await db.getAllAsync(`SELECT * FROM menu WHERE category IN (${placeholders})`, selectedCategories);
            } else if (searchValue && selectedCategories.length === 0) {
                tableData = await db.getAllAsync(`SELECT * FROM menu WHERE name LIKE ?`, `%${searchValue}%`)
            } else {
                let placeholders = selectedCategories.map((_,i) => '$'+(i+1)).join(',');
                tableData = await db.getAllAsync(`SELECT * FROM menu WHERE category IN (${placeholders}) AND name LIKE ?`, [...selectedCategories, `%${searchValue}%`]);
            }

            setListData(tableData);
        } catch (error) {
            console.warn(error);
        } finally {
            categoriesRef.current = selectedCategories;
        }
    };

    const initials = `${user?.firstName?.length > 0 ? user.firstName[0] : ''} ${user?.lastName?.length > 0 ? user.lastName[0] : ''}`

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Header component with no back button */}
            <Header initials={initials} profilePicture={user.imageSource} />
            
            {/* Hero image with search button */}
            <Banner searchValue={searchValue} onSearch={setSearchValue} />

            {/* Horizontal pills for filtering by category  */}
            <View style={{ flexShrink: 1 }}>
                <Categories categories={categories} onFilterByCategory={onFilterByCategory} />
            </View>
            
            {/* list of items */}
            <FlatList
                style={styles.list}
                data={listData}
                renderItem={ListItem}
                keyExtractor={({ name }) => name}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
});

export default Home;