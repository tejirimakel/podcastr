import { useEffect, useState } from "react";
import authService from "../features/auth/authService";
import { isset } from "../common/utils";

const tUser = JSON.parse(localStorage.getItem("user"));

const useMeUserFetch = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    function updateUser(u) {
      setUser(u);
    }
    authService.getMe(tUser.token).then((res) => {
      if (isset(() => res.user._id)) {
        updateUser(res.user);
      }
    });
  }, []);

  return user;
};

export default useMeUserFetch;
