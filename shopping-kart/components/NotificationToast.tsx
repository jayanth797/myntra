
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Platform } from 'react-native';
import { useNotifications } from '@/context/NotificationContext';
import { Bell, X } from 'lucide-react-native';

export const NotificationToast = () => {
    const { activeToast, hideToast } = useNotifications();
    const translateY = useRef(new Animated.Value(-100)).current; // Start off-screen top

    useEffect(() => {
        if (activeToast) {
            Animated.spring(translateY, {
                toValue: 50, // Moved down to be visible
                useNativeDriver: true,
                friction: 6,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: -150,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [activeToast]);

    if (!activeToast) return null;

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Bell size={20} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{activeToast.title}</Text>
                    <Text style={styles.body} numberOfLines={2}>{activeToast.body}</Text>
                </View>
                <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
                    <X size={16} color="#666" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999, // Ensure it's on top of everything
        elevation: 9999,
    },
    content: {
        backgroundColor: '#fff',
        width: '90%',
        maxWidth: 400,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#ff3f6c',
    },
    iconContainer: {
        backgroundColor: '#ff3f6c',
        padding: 8,
        borderRadius: 20,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2,
        color: '#333',
    },
    body: {
        fontSize: 12,
        color: '#666',
    },
    closeButton: {
        padding: 5,
    }
});
