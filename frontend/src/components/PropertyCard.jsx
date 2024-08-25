import React, { useState, useEffect } from "react";
import useFetch from "../customHooks/useFetch";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function PropertyCard({ propertyName, onClick }) {
  const [houseImg, setHouseImg] = useState(null);
  const { response, error, loading } = useFetch({
    url: "/image",
    method: "GET",
    params: { prefix: propertyName },
  });

  useEffect(() => {
    if (response && response.length > 0) {
      setHouseImg(response[0]);
    }
  }, [response]);

  return (


    <Card sx={{ maxWidth: 345, maxHeight: 500,  p: 2, mb: 3 }}>
    <CardActionArea onClick={onClick}>
      <CardMedia
        component="img"
        height="200"
        image={houseImg}
        alt={propertyName.slice(0, -1)}
        sx={{ objectFit: 'cover' }}
      
      />
      <CardContent sx={{ backgroundColor: "white" }}>
        <Typography gutterBottom variant="h5" component="div" sx={{fontSize:"1rem"}}>
          {propertyName.slice(0, -1)}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>


  //   <Card sx={{ maxWidth: 345, maxHeight: 500,  p: 2, mb: 3, borderRadius: 5 }}>
  //   <CardActionArea onClick={onClick}>
  //     <CardMedia
  //       component="img"
  //       height="200"
  //       image={propertyName.image}
  //       alt={propertyName.name}
  //       sx={{ objectFit: 'cover', borderRadius: 1 }}
      
  //     />
  //     <CardContent sx={{ backgroundColor: "white" }}>
  //       <Typography gutterBottom variant="h5" component="div" sx={{fontSize:"1rem"}}>
  //         {propertyName.name}
  //       </Typography>
  //     </CardContent>
  //   </CardActionArea>
  // </Card>

   );
}

export default PropertyCard;