import { useEffect, useState } from "react";
import personalService from '../features/personal/personalService'

const user = JSON.parse(localStorage.getItem("user"));

const usePersonalDetailsFetch = () => {  
  const [personalDetails, setPersonalDetails] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    country: "",
    city: "",
    time_zone: "",
  });
  useEffect(() => {
    function updatePersonalDetails(pd) {
      setPersonalDetails(pd);
    }
    personalService.getPersonalDetails(user.token).then(res => {
      updatePersonalDetails(res.personal);
    })
  }, []);
  return [personalDetails];
};

export default usePersonalDetailsFetch;
