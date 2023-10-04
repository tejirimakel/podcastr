import { useEffect, useState } from "react";
import dataService from '../features/data/dataService'

const user = JSON.parse(localStorage.getItem("user"));

const useCountryFetch = () => {  
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    function updateCountriesArray(c) {
      setCountries(c);
    }
    dataService.getCountries(user.token).then(res => {
      updateCountriesArray(res);
    })
  }, []);

  return [countries];
};

export default useCountryFetch;
