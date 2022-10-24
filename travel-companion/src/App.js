import React, {useState, useEffect}from "react"
import {getPlacesData} from "./api"
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./Compnents/Header/Header";
import List from "./Compnents/List/List.jsx";
import Map from "./Compnents/Map/Map.jsx";


function App() {
const [places, setplaces]=useState([]);
const [cooridnates,setcooridnates] =useState({});
const [filteredPlaceS, setFilteredPlaceS] = useState([])
const [bounds,setbounds] =useState({});
const [childClicked, setchildClicked] = useState(null)
const [isLoading, setisLoading] = useState(false)
const [type, settype]=useState('restaurants');
const [rating, setrating]=useState('restaurants');


useEffect(() => {
  navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
  setcooridnates({lat:latitude, lng:longitude })    
  })
}, [])
useEffect(() => {
  const filterdplaces=places.filter((place)=> place.rating > rating)
  setFilteredPlaceS(filterdplaces)
}, [rating])

useEffect(() => {
  if (bounds.sw && bounds.ne) {
  setisLoading(true)    
  getPlacesData(type,bounds.sw,bounds.ne)
    .then((data)=>{
    
      setplaces(data?.filter((place)=>place.name && place.num_reviews > 0))
      setFilteredPlaceS([])
      setisLoading(false)
    })  
  }
}, [type,bounds]);

  return (
    <>
    <CssBaseline/>
    <Header setcooridnates={setcooridnates}/>
    <Grid container spacing={3} style={{width:'100%'}} >
      <Grid item xs={12} md={4}>
      <List places={filteredPlaceS.length ? filteredPlaceS : places} childClicked={childClicked} isLoading={isLoading} type={type} settype={settype} rating={rating} setrating={setrating} />
      </Grid>
      <Grid item xs={12} md={8}>
      <Map places={filteredPlaceS.length ? filteredPlaceS : places} setcooridnates={setcooridnates} setbounds={setbounds} cooridnates={cooridnates} setChildClicked={setchildClicked}/>
      </Grid>


    </Grid>
      
    </>
  );
}

export default App;
