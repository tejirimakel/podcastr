import React from 'react';
import { useDispatch } from 'react-redux';
import { getUserAuthState } from '../common/utils';
import { logout } from '../features/auth/authSlice';
// import useMeUserFetch from "../app/useMeUserFetch";

const authContext = React.createContext();

const user = getUserAuthState();
function useAuth() {
  const dispatch = useDispatch();
  // const user = useMeUserFetch();

  return {
    user,
    logout() {
      return new Promise((res) => {
        dispatch(logout());
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
