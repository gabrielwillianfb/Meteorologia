import { useState, useEffect } from "react";

export const useDate = () => {
  const locale = "pt-BR";
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${today.getDate()} de ${today.toLocaleDateString(locale, {
    month: "long",
  })} de ${today.getFullYear()}`;
  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "numeric",
  });

  return { date, time };
};
