/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import rain from "../assets/icons/rain.png";
import storm from "../assets/icons/storm.png";
import fog from "../assets/icons/fog.png";
import snow from "../assets/icons/snow.png";
import wind from "../assets/icons/windy.png";

const MiniCard = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState();

  useEffect(() => {
    if (iconString) {
      const lowerCaseIconString = iconString.toLowerCase();
      if (lowerCaseIconString.includes("cloud")) {
        setIcon(cloud);
      } else if (lowerCaseIconString.includes("rain") || lowerCaseIconString.includes("shower")) {
        setIcon(rain);
      } else if (lowerCaseIconString.includes("clear")) {
        setIcon(sun);
      } else if (lowerCaseIconString.includes("thunder") || lowerCaseIconString.includes("storm")) {
        setIcon(storm);
      } else if (lowerCaseIconString.includes("fog") || lowerCaseIconString.includes("sun")) {
        setIcon(fog);
      } else if (lowerCaseIconString.includes("snow")) {
        setIcon(snow);
      } else if (lowerCaseIconString.includes("wind")) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  return (
    <div className="glassCard w-[10rem] h-[10rem] p-4 flex flex-col">
      <p className="font-bold text-center">
        {new Date(time).toLocaleTimeString("pt-BR", { weekday: "long" }).split(",")[0]}
      </p>
      <hr />
      <div className="w-full flex justify-center items-center flex-1">
        <img src={icon} alt="forecast not available" className="w-[4rem] h-[4rem]" />
      </div>
      <p className="text-center font-bold">{temp} °C</p>
    </div>
  );
};

export default MiniCard;
