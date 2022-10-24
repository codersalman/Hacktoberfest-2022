import React,{useState}from "react"
import { Autocomplete } from "@react-google-maps/api"
import { AppBar, Toolbar,Typography, InputBase ,Box } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import useStyles from './style'

const Header =({setcooridnates})=>{
    const classes =useStyles();
    const [autoComplete, setAutoComplete] = useState(null)
    const onLoad=(autoc)=>setAutoComplete(autoc)
    const onPlaceChanged=()=>{
        const lat =autoComplete.getPlace().geometry.location.lat();
        const lng =autoComplete.getPlace().geometry.location.lng();
        setcooridnates({lat,lng})
    }

    
    
    return (
       <AppBar position='static'>
           <Toolbar className={classes.toolbar}>
               <Typography variant="h5" className={classes.title}>
                   Travel Advisor
               </Typography>
            <Box display="flex">
          
               <Typography variant="h6" className={classes.title}>
                   Explore New places
               </Typography>
               <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <div className={classes.search}>
                <div className={classes.searchIcon}>    
                <SearchIcon/>
                </div>
                <InputBase placeholder="Searh..." classes={{root:classes.inputRoot, input:classes.inputInput}}/>
                </div>

               </Autocomplete>
            </Box>
           </Toolbar>

       </AppBar>
    )
}

export default Header