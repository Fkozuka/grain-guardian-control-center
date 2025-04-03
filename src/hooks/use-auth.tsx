
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem("isAuthenticated");
    const storedUserName = localStorage.getItem("userName");
    
    if (authStatus === "true") {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // This is a simple mock authentication
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", username);
      setIsAuthenticated(true);
      setUserName(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setUserName(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
