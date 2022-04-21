import { useState, useContext, createContext, SetStateAction } from "react";

import axios from "axios";
import Cookies from "universal-cookie";
import Admin from "../pages/admin";
import Layout from "../components/Layout";

const cookie = new Cookies();

const GlobalStateContext = createContext(
  {} as {
    errorMessage: string;
    setErrorMessage: React.Dispatch<SetStateAction<string>>;
    isLogin: boolean;
    setIsLogin: React.Dispatch<SetStateAction<boolean>>;
  }
);

export const GlobalStateProvider: React.FC = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <GlobalStateContext.Provider
      value={{ errorMessage, setErrorMessage, isLogin, setIsLogin }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalStateContext = () => useContext(GlobalStateContext);
