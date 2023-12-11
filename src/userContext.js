import React, { useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "./services/authService";
import { getAuthorId } from "./services/apiService";

const UserContext = React.createContext(null);
const UserContextApi = React.createContext(null);

export const UserProvider = (props) => {
  const [id, setId] = React.useState(0);
  useEffect(() => {
    async function fetchData() {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const auth = await getAuthorId(currentUser.username);
        setId(auth.data);
      } else {
        setId(null);
      }
    }
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ id }}>
      <UserContextApi.Provider value={{ setId }}>
        {props.children}
      </UserContextApi.Provider>
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
export const useUserApi = () => React.useContext(UserContextApi);
