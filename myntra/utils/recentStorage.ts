import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENTLY_VIEWED_KEY = "recently_viewed";

export const addToRecentlyViewed = async (product: any) => {
    try {
        console.log("Adding to recently viewed:", product._id);
        let recentProducts = await getRecentlyViewed();

        // Remove if already exists to move to top
        recentProducts = recentProducts.filter((p: any) => p._id !== product._id);

        // Add to beginning
        recentProducts.unshift(product);

        // Limit to 10
        if (recentProducts.length > 10) {
            recentProducts.pop();
        }

        const jsonValue = JSON.stringify(recentProducts);
        if (Platform.OS === "web") {
            localStorage.setItem(RECENTLY_VIEWED_KEY, jsonValue);
        } else {
            await AsyncStorage.setItem(RECENTLY_VIEWED_KEY, jsonValue);
        }
    } catch (e) {
        console.error("Error saving recently viewed", e);
    }
};

export const getRecentlyViewed = async () => {
    try {
        let jsonValue = null;
        if (Platform.OS === "web") {
            jsonValue = localStorage.getItem(RECENTLY_VIEWED_KEY);
        } else {
            jsonValue = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);
        }
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error reading recently viewed", e);
        return [];
    }
};
