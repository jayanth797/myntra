
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Notification = {
    id: string;
    title: string;
    body: string;
    timestamp: number;
    read: boolean;
};

type NotificationContextType = {
    notifications: Notification[];
    unreadCount: number;
    sendNotification: (title: string, body: string, delay?: number) => void;
    markAsRead: (id: string) => void;
    clearAll: () => void;
    activeToast: Notification | null;
    hideToast: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const NOTIFICATIONS_KEY = 'myntra_notifications';

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [activeToast, setActiveToast] = useState<Notification | null>(null);
    const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Load notifications from storage on mount
    useEffect(() => {
        loadNotifications();

        // Check for "missed" notifications from background simulation
        if (Platform.OS === 'web') {
            const checkMissed = () => {
                if (document.visibilityState === 'visible') {
                    loadNotifications();
                }
            };
            document.addEventListener('visibilitychange', checkMissed);
            return () => document.removeEventListener('visibilitychange', checkMissed);
        }
    }, []);

    const loadNotifications = async () => {
        try {
            let jsonValue = null;
            if (Platform.OS === 'web') {
                jsonValue = localStorage.getItem(NOTIFICATIONS_KEY);
            } else {
                jsonValue = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
            }
            if (jsonValue) {
                setNotifications(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.error("Failed to load notifications", e);
        }
    };

    const saveNotifications = async (newNotifications: Notification[]) => {
        try {
            const jsonValue = JSON.stringify(newNotifications);
            if (Platform.OS === 'web') {
                localStorage.setItem(NOTIFICATIONS_KEY, jsonValue);
            } else {
                await AsyncStorage.setItem(NOTIFICATIONS_KEY, jsonValue);
            }
            setNotifications(newNotifications);
        } catch (e) {
            console.error("Failed to save notifications", e);
        }
    };

    const sendNotification = (title: string, body: string, delay: number = 0) => {
        const newNotification: Notification = {
            id: Date.now().toString(),
            title,
            body,
            timestamp: Date.now() + delay,
            read: false,
        };

        if (delay > 0) {
            setTimeout(() => {
                triggerNotification(newNotification);
            }, delay);
        } else {
            triggerNotification(newNotification);
        }
    };

    const triggerNotification = async (notification: Notification) => {
        // Refresh state first to ensure we have latest
        let currentNotifications = notifications;
        try {
            // We re-read purely to avoid stale closure if many come in fast, 
            // though React state usually handles this, storage is the source of truth for "background" checks
            let jsonValue = null;
            if (Platform.OS === 'web') {
                jsonValue = localStorage.getItem(NOTIFICATIONS_KEY);
            } else {
                jsonValue = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
            }
            if (jsonValue) currentNotifications = JSON.parse(jsonValue);
        } catch (e) { }

        const updated = [notification, ...currentNotifications];
        await saveNotifications(updated);

        // Show Toast if app is visible (or even if not, to queue it? Web: only if visible)
        if (Platform.OS === 'web' && document.visibilityState === 'visible') {
            showToast(notification);
        } else {
            // If background, we just saved it. The visibility listener will "load" it, 
            // but maybe we want to show a "You missed X" toast? 
            // For now, simple logic: saved = delivered.
        }
    };

    const showToast = (notification: Notification) => {
        setActiveToast(notification);
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = setTimeout(() => {
            setActiveToast(null);
        }, 4000); // Hide after 4s
    };

    const hideToast = () => {
        setActiveToast(null);
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    }

    const markAsRead = async (id: string) => {
        const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
        await saveNotifications(updated);
    };

    const clearAll = async () => {
        await saveNotifications([]);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, sendNotification, markAsRead, clearAll, activeToast, hideToast }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotifications must be used within NotificationProvider");
    return context;
};
