import React from 'react';


const WeatherCard = ({temp, pressure, humidity,sea_level,speed, country,name,main,description,icon}) => {
  console.log(temp, pressure, humidity,sea_level,speed,country,name,main,description,icon);

  const iconURL = "https://openweathermap.org/img/wn/";

  const getIcon = (icon) =>{
    return iconURL + icon + ".png";
  }
  const convertTemp = (temp) => {
    return Math.round(temp-273.15)
  }

  return (
    <div className="output-container">
        <h2 className="city">{name}</h2>
        <h2 className="countryCode">{country}</h2>
        <img src={getIcon(icon)} alt="icon"/>
        <p>Temperature: {convertTemp(temp)} °C</p>
        <p>Humidity: {humidity} %</p>
        <p>Pressure: {pressure} N/m<sup>2</sup></p>
        <p>Speed: {speed} km/hr</p>
    </div>
  )
}

export default WeatherCard;
