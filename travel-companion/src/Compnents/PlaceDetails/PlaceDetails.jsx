import React from 'react'
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyle from "./style"
const PlaceDetails = ({place,selected,refprop}) => {
    const classes=useStyle();
    if (selected) refprop?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    return (
        
            <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
    <CardContent>
    <Typography gutterBottom variant="h5">{place.name}</Typography>
    <Box display="flex" justifyContent="space-between">
    <Rating  value={Number(place.rating)} readOnly /> 
          <Typography gutterBottom variant="subtitle1">
            Out of {place.num_reviews} reviews
          </Typography>
    </Box>
    <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
    </Box>
    <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
    </Box>
    {place?.awards?.map((award)=> (
        <Box display="flex" justifyContent="space-between" my={1} alignItems="center" >
        <img src={award.images.small} alt="award pics" />
        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
      </Box>
    ))}
    {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
    {place.address && (
        <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
        <LocationOnIcon />{place.address}
      </Typography>
    )

    }
     {place.phone && (
        <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
        <PhoneIcon />{place.phone}
      </Typography>
    )
    }
    <CardActions>
        <button  size="small" color="primary" onClick={()=>window.open(place.web_url,'_blank')}>Trip Advisor</button>
        <button  size="small" color="primary" onClick={()=>window.open(place.website,'_blank')}>Website</button>
    </CardActions>
    </CardContent>
        </Card>
    )
}

export default PlaceDetails
