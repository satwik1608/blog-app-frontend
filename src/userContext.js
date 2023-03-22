import React, { useMemo, useState } from "react";
import { getCurrentUser } from "./services/authService";
import { getAuthorId } from "./services/apiService";
import { useQuery } from "react-query";

const UserContext = React.createContext(null);

export const UserProvider = (props) => {
  const [id, setId] = React.useState(null);

  const [author, setAuthor] = useState(null);

  useMemo(async () => {
    const currentUser = await getCurrentUser();
    setAuthor(currentUser);
  }, []);

  const userQuery = useQuery(
    [author],
    async () => {
      const auth = await getAuthorId(author.username);

      return auth.data;
    },
    {
      enabled: !!author,
    }
  );

  React.useEffect(() => {
    if (userQuery.isSuccess) setId(userQuery.data);
  }, [userQuery.data]);

  return (
    <UserContext.Provider value={{ id, setId }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
