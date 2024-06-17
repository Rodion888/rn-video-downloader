import React, { ReactNode } from "react";

import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

export interface UserProps {
  userName: string;
  email: string;
  avatar: string;
  accountId: string;
}

export interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          const userData: UserProps = {
            userName: res.userName,
            email: res.email,
            avatar: res.avatar,
            accountId: res.accountId
          };
          setIsLoggedIn(true);
          setUser(userData);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <GlobalContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      user,
      setUser,
      isLoading
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;