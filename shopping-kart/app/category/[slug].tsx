import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { mockProducts } from "@/data/mockData";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { ArrowLeft } from "lucide-react-native";

export default function CategoryPage() {
    const { slug } = useLocalSearchParams();
    const router = useRouter();
    const { isDark } = useTheme();
    const currentColors = Colors[isDark ? "dark" : "light"];
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call/filtering
        setLoading(true);
        setTimeout(() => {
            const filtered = mockProducts.filter(
                (p) => p.category?.toLowerCase() === (slug as string)?.toLowerCase()
            );
            setProducts(filtered);
            setLoading(false);
        }, 500);
    }, [slug]);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[
                styles.productCard,
                { backgroundColor: isDark ? "#1E1E1E" : "#fff" },
            ]}
            onPress={() => router.push(`/product/${item._id}`)}
        >
            <Image source={{ uri: item.images[0] }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={[styles.brandName, { color: currentColors.icon }]}>
                    {item.brand}
                </Text>
                <Text
                    style={[styles.productName, { color: currentColors.text }]}
                    numberOfLines={1}
                >
                    {item.name}
                </Text>
                <View style={styles.priceRow}>
                    <Text style={[styles.productPrice, { color: currentColors.text }]}>
                        {item.price}
                    </Text>
                    <Text style={styles.discount}>{item.discount}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View
            style={[styles.container, { backgroundColor: currentColors.background }]}
        >
            <View
                style={[
                    styles.header,
                    {
                        backgroundColor: currentColors.background,
                        borderBottomColor: isDark ? "#333" : "#f0f0f0",
                    },
                ]}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <ArrowLeft size={24} color={currentColors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: currentColors.text }]}>
                    {slug}
                </Text>
                <View style={{ width: 24 }} />
            </View>

            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#ff3f6c"
                    style={styles.loader}
                />
            ) : products.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyText, { color: currentColors.text }]}>
                        No products found for {slug}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={styles.columnWrapper}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        paddingTop: 50,
        borderBottomWidth: 1,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    loader: {
        marginTop: 50,
    },
    listContent: {
        padding: 10,
    },
    columnWrapper: {
        justifyContent: "space-between",
    },
    productCard: {
        width: "48%",
        marginBottom: 15,
        borderRadius: 10,
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
    productImage: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
    productInfo: {
        padding: 10,
    },
    brandName: {
        fontSize: 12,
        marginBottom: 2,
    },
    productName: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: "500",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    productPrice: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 8,
    },
    discount: {
        fontSize: 12,
        color: "#ff3f6c",
        fontWeight: "500",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
    },
});
