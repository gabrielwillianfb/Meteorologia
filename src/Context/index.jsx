/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("São Francisco do Sul");
  const [thisLocation, setLocation] = useState("");

  // fetch api
  const fetchWeather = async (location) => {
    const apiKey = import.meta.env.VITE_API_KEY; // substitua pela sua chave de API
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`;

    const options = {
      method: "GET",
      params: {
        unitGroup: "metric",
        key: apiKey,
        contentType: "json",
        location: place,
      },
    };

    try {
      const response = await axios.request({ url, ...options });
      const thisData = response.data;
      setLocation(thisData.address);
      setValues(thisData.days);
      setWeather(thisData.days[0]);
    } catch (error) {
      console.error("Context retornou um erro ao buscar dados da API: ", error);
      alert("API RETORNOU UM ERRO. CONTATE O DESENVOLVEDOR.");
    }
  };

  useEffect(() => {
    fetchWeather(place);
  }, [place]);

  useEffect(() => {
    console.log("Valores: ", values);
  }, [values]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
