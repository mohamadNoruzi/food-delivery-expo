import axios from "axios";

const api = axios.create({
  baseURL: "https://api.myptv.com/geocoding/v1/locations/by-text?searchText=",
  headers: {
    apiKey: process.env.EXPO_PUBLIC_MYPTV,
    "Content-Type": "application/json",
  },
});

export default api;
