"use client";

const { createContext, useContext, useState } = require("react");

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [seminar, setSeminar] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [questions,setQuestions]=useState([])

  return (
    <authContext.Provider
      value={{
        auth,
        setAuth,
        seminar,
        setSeminar,
        apiKey,
        setApiKey,
        questions,
        setQuestions,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export { useAuth, AuthProvider };
