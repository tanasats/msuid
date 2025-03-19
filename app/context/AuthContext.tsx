"use client";
import { createContext, useContext, useState, useEffect } from "react";
//import { useRouter } from "next/navigation";

const AuthContext = createContext({ isAuthenticated: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const router = useRouter();

  useEffect(() => {
    // ตรวจสอบ session หรือ token
    const token = localStorage.getItem("token");
    console.log("Token==",token)
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);