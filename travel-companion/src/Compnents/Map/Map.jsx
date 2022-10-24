// import React from 'react';
// import GoogleMapReact  from 'google-map-react';
// import { Paper,Typography, useMediaQuery } from '@material-ui/core';
// import LocationOnOutlinedIcon  from '@material-ui/icons/LocationOnOutlined';
// import Rating from "@material-ui/lab"

// import useStyles from './style'

// const Map = ({setcooridnates,setbounds,cooridnates}) => {
//     const classes = useStyles;
//     const isMobile= useMediaQuery('(min-width:600px)');
    
//     return (
//         <div className={classes.mapContainer}>
//             <GoogleMapReact              
//                 bootstrapURLKeys={{ key: 'AIzaSyCZYfki69FHrablhsPw_CjWcAi5EMQwW2s' }}
//                 defaultCenter={cooridnates}
//                 center={cooridnates}
//                 defaultZoom={14}
//                 margin={[50, 50, 50, 50]}
//                 options={' '}
//                 onChange={''}
//                 onChildClick={''}     
//             >   
//             </GoogleMapReact>
//             <h1>Maps</h1>
//         </div>
        
//     )
// }

// export default Map









import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import mapStyle from "./mapStyle"

// import mapStyles from '../../mapStyles';
import useStyles from './style';

const Map = ({ setcooridnates,setbounds,cooridnates,places,setChildClicked }) => {
  const isDesktop = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  
  return (
    <div style={{margin:"20px"}} className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={cooridnates}
        center={cooridnates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI:true, zoomControl:true ,styles:mapStyle}}
        onChange={(e) => {
          setcooridnates({ lat: e.center.lat, lng: e.center.lng });
          setbounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >{
        places?.map((place,i)=>(
          <div
          className={classes.markerContainer}
          lat={Number(place.latitude)}
          lng={Number(place.longitude)}
          key={i}
          >
            {
              isDesktop?(<Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                {place.name}
                </Typography>
                <img
                className={classes.pointer} 
                src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                alt={place.name}
                />
                  <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
              ):(
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              )
            
            }
          </div>
        ))
       }
        
      </GoogleMapReact>
    </div>
  );
};

export default Map;







