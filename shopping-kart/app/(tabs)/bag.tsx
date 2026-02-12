import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { ShoppingBag, Minus, Plus, Trash2, Bookmark, MoveUp } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { getBag, removeFromBag, getSavedItems, saveForLater, moveToBag, addToBag } from "@/utils/bagStorage";

export default function Bag() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [bag, setbag] = useState<any>(null);
  const [savedItems, setSavedItems] = useState<any>([]);
  const { isDark } = useTheme();
  const currentColors = Colors[isDark ? 'dark' : 'light'];

  useFocusEffect(
    React.useCallback(() => {
      fetchproduct();
      fetchSavedItems();
    }, [user])
  );

  const fetchproduct = async () => {
    if (user) {
      if (user._id.startsWith("guest-") || user._id.startsWith("user-")) { // Handle both guest and mock user
        const localBag = await getBag();
        setbag(localBag);
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const bag = await axios.get(
          `https://myntra-clone-xj36.onrender.com/bag/${user._id}`
        );
        setbag(bag.data);
      } catch (error) {
        console.log("API failed, utilizing local storage");
        const localBag = await getBag();
        setbag(localBag);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetchSavedItems = async () => {
    const items = await getSavedItems();
    setSavedItems(items);
  }

  const handleSaveForLater = async (item: any) => {
    await saveForLater(item);

    // Sync with backend: Remove from bag if logged in
    if (user && !user._id.startsWith("guest-") && !user._id.startsWith("user-")) {
      try {
        await axios.delete(`https://myntra-clone-xj36.onrender.com/bag/${item._id}`);
      } catch (error) {
        console.log("Failed to remove from backend bag", error);
      }
    }

    fetchproduct(); // Refresh bag
    fetchSavedItems(); // Refresh saved
  };

  const handleMoveToBag = async (item: any) => {
    // Sync with backend: Add to bag if logged in
    if (user && !user._id.startsWith("guest-") && !user._id.startsWith("user-")) {
      try {
        await axios.post(`https://myntra-clone-xj36.onrender.com/bag/add`, {
          userId: user._id,
          productId: item.productId._id,
          size: item.size,
          quantity: 1
        });
      } catch (error) {
        console.log("Failed to add to backend bag", error);
      }
    }

    await moveToBag(item);
    fetchproduct();
    fetchSavedItems();
  }

  const handleRemoveSaved = async (item: any) => {
    // We can reuse removeFromBag if we pass the right ID, but for saved items we might need a specific remove function
    // or just filter and update local storage directly here for simplicity if utils doesn't support it directly.
    // Wait, moveToBag removes from saved. We need a deleteFromSaved.
    // For now, let's just use moveToBag to get it back or implement a quick delete logic here using the same pattern.
    // Actually, let's just add it to utils later if needed, but for now I'll implement a direct storage update here for speed.
    const newSaved = savedItems.filter((i: any) => i._id !== item._id);
    // ... update storage ... (skipping clear specific saved item to avoid complexity drift, user just asked for move)
    // Start with just Move to Bag.
  }


  const total = bag?.reduce((sum: any, item: any) => {
    let price = item.productId.price;
    if (typeof price === "string") {
      price = parseFloat(price.replace(/[^0-9.]/g, ""));
    }
    return sum + price * item.quantity;
  }, 0) || 0;

  const handledelete = async (itemid: any) => {
    // Check for guest OR mocked user
    if (user && (user._id.startsWith("guest-") || user._id.startsWith("user-"))) {
      await removeFromBag(itemid);
      fetchproduct();
      return;
    }
    try {
      await axios.delete(`https://myntra-clone-xj36.onrender.com/bag/${itemid}`)
      fetchproduct();
    } catch (error) {
      console.log("Delete failed, likely local item or API error");
      await removeFromBag(itemid);
      fetchproduct();
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: currentColors.background }]}>
      <View style={[styles.header, { backgroundColor: currentColors.background, borderBottomColor: isDark ? '#333' : '#f0f0f0' }]}>
        <Text style={[styles.headerTitle, { color: currentColors.text }]}>Shopping Bag</Text>
      </View>

      <ScrollView style={styles.content}>
        {bag?.length === 0 && savedItems.length === 0 && (
          <View style={styles.emptyState}>
            <ShoppingBag size={48} color={currentColors.icon} />
            <Text style={[styles.emptyTitle, { color: currentColors.text }]}>Your bag is empty</Text>
          </View>
        )}

        {bag?.map((item: any) => (
          <View key={item._id} style={[styles.bagItem, { backgroundColor: isDark ? '#1E1E1E' : '#fff' }]}>
            <Image
              source={{ uri: item.productId.images[0] }}
              style={styles.itemImage}
            />
            <View style={styles.itemInfo}>
              <Text style={[styles.brandName, { color: currentColors.icon }]}>{item.productId.brand}</Text>
              <Text style={[styles.itemName, { color: currentColors.text }]}>{item.productId.name}</Text>
              <Text style={[styles.itemSize, { color: currentColors.icon }]}>Size: {item.size}</Text>
              <Text style={[styles.itemPrice, { color: currentColors.text }]}>₹{item.productId.price}</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity style={[styles.quantityButton, { backgroundColor: isDark ? '#333' : '#f5f5f5' }]}>
                  <Minus size={20} color={currentColors.text} />
                </TouchableOpacity>
                <Text style={[styles.quantity, { color: currentColors.text }]}>{item.quantity}</Text>
                <TouchableOpacity style={[styles.quantityButton, { backgroundColor: isDark ? '#333' : '#f5f5f5' }]}>
                  <Plus size={20} color={currentColors.text} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleSaveForLater(item)}>
                <Bookmark size={20} color="#666" />
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => handledelete(item._id)}>
                <Trash2 size={20} color="#ff3f6c" />
                <Text style={[styles.actionText, { color: '#ff3f6c' }]}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {savedItems.length > 0 && (
          <View style={styles.savedSection}>
            <Text style={[styles.savedTitle, { color: currentColors.text }]}>Saved for Later ({savedItems.length})</Text>
            {savedItems.map((item: any) => (
              <View key={item._id} style={[styles.bagItem, { backgroundColor: isDark ? '#1E1E1E' : '#fff', opacity: 0.8 }]}>
                <Image
                  source={{ uri: item.productId.images[0] }}
                  style={styles.itemImage}
                />
                <View style={styles.itemInfo}>
                  <Text style={[styles.brandName, { color: currentColors.icon }]}>{item.productId.brand}</Text>
                  <Text style={[styles.itemName, { color: currentColors.text }]}>{item.productId.name}</Text>
                  <Text style={[styles.itemPrice, { color: currentColors.text }]}>₹{item.productId.price}</Text>
                  <TouchableOpacity style={styles.moveToBagButton} onPress={() => handleMoveToBag(item)}>
                    <MoveUp size={16} color="#ff3f6c" />
                    <Text style={styles.moveToBagText}>Move to Bag</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

      </ScrollView>

      {bag?.length > 0 && (
        <View style={[styles.footer, { backgroundColor: currentColors.background, borderTopColor: isDark ? '#333' : '#f0f0f0' }]}>
          <View style={styles.totalContainer}>
            <Text style={[styles.totalLabel, { color: currentColors.text }]}>Total Amount</Text>
            <Text style={[styles.totalAmount, { color: currentColors.text }]}>₹{total}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => router.push("/checkout")}
          >
            <Text style={styles.checkoutButtonText}>PLACE ORDER</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  header: {
    padding: 15,
    paddingTop: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3e3e3e",
  },
  content: {
    flex: 1,
    padding: 15,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    color: "#3e3e3e",
    marginTop: 20,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#ff3f6c",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bagItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  itemImage: {
    width: 100,
    height: 120,
  },
  itemInfo: {
    flex: 1,
    padding: 15,
  },
  brandName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
    color: "#3e3e3e",
    marginBottom: 5,
  },
  itemSize: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3e3e3e",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
  },
  actionsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#f0f0f0",
  },
  actionButton: {
    alignItems: "center",
    padding: 5,
  },
  actionText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  savedSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  savedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#3e3e3e",
  },
  moveToBagButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ff3f6c",
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  moveToBagText: {
    color: "#ff3f6c",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
  footer: {
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: "#3e3e3e",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3e3e3e",
  },
  checkoutButton: {
    backgroundColor: "#ff3f6c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
