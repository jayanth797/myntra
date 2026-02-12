import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BAG_KEY = "shopping_kart_bag";
const SAVED_KEY = "shopping_kart_saved";

export const addToBag = async (item: any) => {
    try {
        const existingBag = await getBag();
        const existingItemIndex = existingBag.findIndex(
            (i: any) => i.productId._id === item.productId._id && i.size === item.size
        );

        let newBag;
        if (existingItemIndex > -1) {
            newBag = [...existingBag];
            newBag[existingItemIndex].quantity += 1;
        } else {
            newBag = [...existingBag, { ...item, quantity: 1, _id: `local-${Date.now()}` }];
        }

        const jsonValue = JSON.stringify(newBag);
        if (Platform.OS === "web") {
            localStorage.setItem(BAG_KEY, jsonValue);
        } else {
            await AsyncStorage.setItem(BAG_KEY, jsonValue);
        }
    } catch (e) {
        console.error("Error adding to bag", e);
    }
};

export const getBag = async () => {
    try {
        let jsonValue = null;
        if (Platform.OS === "web") {
            jsonValue = localStorage.getItem(BAG_KEY);
        } else {
            jsonValue = await AsyncStorage.getItem(BAG_KEY);
        }
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error reading bag", e);
        return [];
    }
};

export const removeFromBag = async (itemId: string) => {
    try {
        const existingBag = await getBag();
        const newBag = existingBag.filter((item: any) => item._id !== itemId);
        const jsonValue = JSON.stringify(newBag);

        if (Platform.OS === "web") {
            localStorage.setItem(BAG_KEY, jsonValue);
        } else {
            await AsyncStorage.setItem(BAG_KEY, jsonValue);
        }
    } catch (e) {
        console.error("Error removing from bag", e);
    }
}

export const clearBag = async () => {
    try {
        if (Platform.OS === "web") {
            localStorage.removeItem(BAG_KEY);
        } else {
            await AsyncStorage.removeItem(BAG_KEY);
        }
    } catch (e) {
        console.error("Error clearing bag", e);
    }
}

// Save for Later Functions

export const getSavedItems = async () => {
    try {
        let jsonValue = null;
        if (Platform.OS === "web") {
            jsonValue = localStorage.getItem(SAVED_KEY);
        } else {
            jsonValue = await AsyncStorage.getItem(SAVED_KEY);
        }
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error reading saved items", e);
        return [];
    }
};

export const saveForLater = async (item: any) => {
    try {
        // 1. Add to Saved
        const existingSaved = await getSavedItems();
        // Check if already saved to avoid duplicates (optional, but good UX)
        const isAlreadySaved = existingSaved.some((i: any) => i.productId._id === item.productId._id && i.size === item.size);

        let newSaved;
        if (!isAlreadySaved) {
            newSaved = [...existingSaved, item];
        } else {
            newSaved = existingSaved;
        }

        const jsonSaved = JSON.stringify(newSaved);
        if (Platform.OS === "web") {
            localStorage.setItem(SAVED_KEY, jsonSaved);
        } else {
            await AsyncStorage.setItem(SAVED_KEY, jsonSaved);
        }

        // 2. Remove from Bag
        await removeFromBag(item._id);

    } catch (e) {
        console.error("Error saving for later", e);
    }
};

export const moveToBag = async (item: any) => {
    try {
        // 1. Add to Bag (re-using existing logic but as a fresh add)
        // We need to strip the _id or handle it, addToBag generates a new ID for local items usually
        // But `addToBag` logic defined above handles duplication check.
        await addToBag({
            productId: item.productId,
            size: item.size
        });

        // 2. Remove from Saved
        const existingSaved = await getSavedItems();
        const newSaved = existingSaved.filter((i: any) => i._id !== item._id);
        const jsonSaved = JSON.stringify(newSaved);

        if (Platform.OS === "web") {
            localStorage.setItem(SAVED_KEY, jsonSaved);
        } else {
            await AsyncStorage.setItem(SAVED_KEY, jsonSaved);
        }

    } catch (e) {
        console.error("Error moving to bag", e);
    }
}
