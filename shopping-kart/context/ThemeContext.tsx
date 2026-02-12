import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: ThemeType;
    toggleTheme: (newTheme: ThemeType) => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'system',
    toggleTheme: () => { },
    isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

const THEME_KEY = 'app_theme_preference';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeType>('system');

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            let savedTheme = null;
            if (Platform.OS === 'web') {
                savedTheme = localStorage.getItem(THEME_KEY);
            } else {
                savedTheme = await AsyncStorage.getItem(THEME_KEY);
            }

            if (savedTheme) {
                setTheme(savedTheme as ThemeType);
            }
        } catch (error) {
            console.error('Failed to load theme preference', error);
        }
    };

    const toggleTheme = async (newTheme: ThemeType) => {
        setTheme(newTheme);
        try {
            if (Platform.OS === 'web') {
                localStorage.setItem(THEME_KEY, newTheme);
            } else {
                await AsyncStorage.setItem(THEME_KEY, newTheme);
            }
        } catch (error) {
            console.error('Failed to save theme preference', error);
        }
    };

    const isDark = theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
