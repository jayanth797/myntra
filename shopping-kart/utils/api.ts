import axios from 'axios';
import { Platform } from 'react-native';

// Use environment variable if available, otherwise fallback to Render URL (or localhost for dev)
// Vercel/Expo automatically injects EXPO_PUBLIC_ variables into the bundle.
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://myntra-clone-xj36.onrender.com';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
