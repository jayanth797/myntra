import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.4;

interface Product {
    _id: string;
    name: string;
    brand: string;
    price: number;
    images: string[];
    discount?: string;
}

interface RecommendationCarouselProps {
    products: Product[];
    title?: string;
}

export const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({ products, title = "You May Also Like" }) => {
    const router = useRouter();
    const { isDark } = useTheme();
    const currentColors = Colors[isDark ? 'dark' : 'light'];

    if (!products || products.length === 0) return null;

    const renderItem = ({ item }: { item: Product }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: currentColors.background, borderColor: isDark ? '#333' : '#f0f0f0' }]}
            onPress={() => router.push(`/product/${item._id}`)}
        >
            <Image source={{ uri: item.images[0] }} style={styles.image} />
            <View style={styles.info}>
                <Text numberOfLines={1} style={[styles.brand, { color: currentColors.icon }]}>{item.brand}</Text>
                <Text numberOfLines={1} style={[styles.name, { color: currentColors.text }]}>{item.name}</Text>
                <View style={styles.priceRow}>
                    <Text style={[styles.price, { color: currentColors.text }]}>₹{item.price}</Text>
                    {item.discount && <Text style={styles.discount}>{item.discount}</Text>}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: currentColors.text }]}>{title}</Text>
            <FlatList
                horizontal
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 10,
        color: '#333',
    },
    listContent: {
        paddingHorizontal: 15,
    },
    card: {
        width: ITEM_WIDTH,
        marginRight: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: ITEM_WIDTH * 1.25,
        resizeMode: 'cover',
    },
    info: {
        padding: 10,
    },
    brand: {
        fontSize: 12,
        color: '#666',
        fontWeight: '600',
    },
    name: {
        fontSize: 12,
        color: '#333',
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    discount: {
        fontSize: 10,
        color: '#ff3f6c',
        fontWeight: 'bold'
    }
});
