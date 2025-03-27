import axios from "axios";
import storage from "redux-persist/lib/storage"; // Import the storage from redux-persist

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["accept"] = "application/json";
instance.defaults.timeout = 60000;

// Function to set the access token in the axios instance
export const setAccessToken = (token: string) => {
  if (token) {
    instance.defaults.headers.Authorization = token;
  } else {
    delete instance.defaults.headers.Authorization; // Remove the header if no token
  }
};

const getPersistedToken = async () => {
  try {
    const persistedState = await storage.getItem("persist:auth"); // Get persisted auth state
    if (persistedState) {
      const authState = JSON.parse(persistedState);
      return authState.token ? JSON.parse(authState.token) : null;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
  return null;
};

//? Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    const token = await getPersistedToken(); // Retrieve the token from persisted storage
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance };
