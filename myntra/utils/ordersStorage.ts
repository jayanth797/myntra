import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const ORDERS_KEY = "myntra_orders";

export const saveOrder = async (order: any) => {
    try {
        const existingOrders = await getOrders();
        const newOrders = [order, ...existingOrders];
        const jsonValue = JSON.stringify(newOrders);

        if (Platform.OS === "web") {
            localStorage.setItem(ORDERS_KEY, jsonValue);
        } else {
            await AsyncStorage.setItem(ORDERS_KEY, jsonValue);
        }
    } catch (e) {
        console.error("Error saving order", e);
    }
};

export const getOrders = async () => {
    try {
        let jsonValue = null;
        if (Platform.OS === "web") {
            jsonValue = localStorage.getItem(ORDERS_KEY);
        } else {
            jsonValue = await AsyncStorage.getItem(ORDERS_KEY);
        }
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error reading orders", e);
        return [];
    }
};
