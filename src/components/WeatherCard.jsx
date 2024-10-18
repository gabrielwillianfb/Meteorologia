/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDate } from "../Utils/useDate";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import rain from "../assets/icons/rain.png";
import storm from "../assets/icons/storm.png";
import fog from "../assets/icons/fog.png";
import snow from "../assets/icons/snow.png";
import wind from "../assets/icons/windy.png";
import "../index.css";

const WeatherCard = ({ temp, windspeed, humidity, place, iconString }) => {
  const [icon, setIcon] = useState(sun);
  const { date, time } = useDate();

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes("cloud")) {
        setIcon(cloud);
      } else if (
        iconString.toLowerCase().includes("rain") ||
        iconString.toLowerCase().includes("shower")
      ) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes("clear")) {
        setIcon(sun);
      } else if (
        iconString.toLowerCase().includes("thunder") ||
        iconString.toLowerCase().includes("storm")
      ) {
        setIcon(storm);
      } else if (
        iconString.toLowerCase().includes("fog") ||
        iconString.toLowerCase().includes("sun")
      ) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes("snow")) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes("wind")) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  return (
    <div className="flex justify-center items-center">
      <div className="w-[22rem] h-auto sm:h-[23rem] glassCard p-4 sm:p-2 flex flex-col justify-center">
        <div className="font-bold text-center text-xl sm:text-lg">{place}</div>
        <div className="flex w-full justify-center items-center gap-4 mt-12 mb-4">
          <img src={icon} alt="Weather_icon" className="w-[4rem] h-[4rem] sm:w-[3rem] sm:h-[3rem]" />
          <p className="font-bold text-5xl sm:text-4xl flex justify-center items-center">{temp} °C</p>
        </div>
        <div className="w-full flex justify-between items-center mt-4">
          <p className="flex-1 text-center p-2 text-sm sm:text-xs">{date}</p>
          <p className="flex-1 text-center p-2 text-sm sm:text-xs">{time}</p>
        </div>
        <div className="w-full flex justify-between items-center mt-4 gap-4">
          <p className="flex-1 text-center p-2 font-bold text-sm bg-blue-600 shadow rounded-lg">
            Vento: <span className="font-normal">{windspeed} km/h</span>
          </p>
          <p className="flex-1 text-center p-2 font-bold text-sm rounded-lg bg-green-600">
            Umidade: <span className="font-normal">{humidity}%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
