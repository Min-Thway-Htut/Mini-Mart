import { createContext, useContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("access"));

  const login = async (username: string, password: string) => {
    const res = await axios.post("http://127.0.0.1:8000/api/token/", { username, password });
    setToken(res.data.access);
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  const refreshAccessToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return logout();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh });
      setToken(res.data.access);
      localStorage.setItem("access", res.data.access);
    } catch {
      logout();
    }
  };

  // Axios interceptor to auto-refresh token on 401
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem("access")}`;
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
