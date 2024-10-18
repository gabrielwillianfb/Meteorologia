/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("New York");
  const [thisLocation, setLocation] = useState("");

  // Função para obter localização do usuário
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeather(`${latitude},${longitude}`); // Passando coordenadas
        },
        (error) => {
          console.error("Erro ao obter geolocalização: ", error);
          fetchWeather(place); // Se o usuário negar, use o valor padrão
        },
      );
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
      fetchWeather(place); // Caso a geolocalização não esteja disponível
    }
  };

  // fetch api
  const fetchWeather = async (location) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;

    try {
      const response = await axios.get(url);
      const thisData = response.data;
      setLocation(thisData.address);
      setValues(thisData.days);
      setWeather(thisData.days[0]);
    } catch (error) {
      console.error("Context retornou um erro ao buscar dados da API: ", error);
      alert("API RETORNOU UM ERRO. CONTATE O DESENVOLVEDOR.");
    }
  };

  // obtém a localização do usuário automaticamente
  useEffect(() => {
    getUserLocation();
  }, []);

  // Faz a função de pesquisa funcionar
  useEffect(() => {
    fetchWeather(place);
  }, [place]);

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
