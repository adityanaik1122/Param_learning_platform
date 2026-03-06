import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const COMPILER_URL = import.meta.env.VITE_COMPILER_URL || 'http://localhost:8001';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const compilerClient = axios.create({
  baseURL: COMPILER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh and subscription status
apiClient.interceptors.response.use(
  (response) => {
    // Check subscription status from response headers
    const subscriptionStatus = response.headers['x-subscription-status'];
    if (subscriptionStatus) {
      localStorage.setItem('subscription_status', subscriptionStatus);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        const { data } = await axios.post(`${API_BASE_URL}/users/auth/token/refresh/`, {
          refresh: refreshToken,
        });
        
        localStorage.setItem('access_token', data.access);
        if (data.refresh) {
          localStorage.setItem('refresh_token', data.refresh);
        }
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Only logout if refresh token is truly invalid
        console.error('Token refresh failed:', refreshError);
        // Don't auto-logout, let the user stay logged in with expired token
        // They can manually logout if needed
        return Promise.reject(error);
      }
    }

    // Handle 403 - Subscription required
    if (error.response?.status === 403) {
      const errorMessage = error.response.data?.detail || '';
      if (errorMessage.includes('subscription')) {
        localStorage.setItem('subscription_required', 'true');
        window.dispatchEvent(new CustomEvent('subscription-required'));
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
