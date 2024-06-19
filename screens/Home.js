import { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";
import * as SQLite from 'expo-sqlite';
import { AuthContext } from "../context/AuthContext";

import Header from '../components/Header';
import { fetchListData } from "../services/api";
import ListItem from "../components/ListItem";

const Home = () => {
    const { user } = useContext(AuthContext);

    const [listData, setListData] = useState([]);

    useEffect(() => {
        const getListData = async () => {
            const db = await SQLite.openDatabaseAsync('little_lemon');

            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, price FLOAT NOT NULL, description TEXT, image TEXT, category TEXT);
            `);

            const tableData = await db.getAllAsync('SELECT * FROM menu');

            if (tableData.length > 0) {
                setListData(tableData);
            } else {
                const remoteData = await fetchListData();

                setListData(remoteData);

                const statement = await db.prepareAsync('INSERT INTO menu (name, price, description, image, category) VALUES ($name, $price, $description, $image, $category)');

                for (const item of remoteData) {
                    await statement.executeAsync({ $name: item.name, $price: item.price, $description: item.description, $image: item.image, $category: item.category });
                }
            }
        };

        getListData();
    }, []);

    const initials = `${user?.firstName?.length > 0 ? user.firstName[0] : ''} ${user?.lastName?.length > 0 ? user.lastName[0] : ''}`

    return (
        <SafeAreaView>
            {/* Header component with no back button */}
            <Header initials={initials} profilePicture={user.imageSource} />
            
            {/* Hero image with search button */}

            {/* Horizontal pills for filtering by category  */}

            {/* list of items */}
            <FlatList
                // contentContainerStyle={styles.list}
                data={listData}
                renderItem={ListItem}
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