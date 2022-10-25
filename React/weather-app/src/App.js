import React, {useState, useEffect} from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard.js'

function App() {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Delhi');
  const [weatherData, setWeatherData] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3045dd712ffe6e702e3245525ac7fa38`;

 const getWeatherInfo = async () => {
   try {
     const res = await fetch(url);
     const data = await res.json();
     //console.log(data);
     const { temp, pressure, humidity, sea_level } = data["main"];
     const { speed } = data["wind"];
     const { country } = data["sys"];
     const { name } = data;
     const { main, description, icon } = data["weather"][0];

     const weatherObj = {temp, pressure, humidity,sea_level,speed, country,name,main,description,icon};
     setWeatherData(weatherObj);
     setLoading(false);
     document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')";
   } catch (err) {
     //console.log(err);
     setLoading(false);
     setWeatherData(err.message);
   }
 };

 useEffect(() => {
   getWeatherInfo();
 }, []);

 // useEffect(() => {
 //   document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')";
 // }, [city])

  return (
    <div className="container">
      <div className="input-container">
        <input type="text" placeholder="Enter a city name" value={city} onChange={(e)=> setCity(e.target.value)}/>
        <button className="Search" onClick={getWeatherInfo}>Search</button>
      </div>
      {loading ? "...Loading" : <WeatherCard {...weatherData}/>}
    </div>

  );
}

export default App;
