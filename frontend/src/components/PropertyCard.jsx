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
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        overflow: 'hidden',
      }}
    >
      <CardActionArea 
        onClick={onClick}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ p: 2 }}>
            Error loading image
          </Typography>
        ) : (
          <CardMedia
            component="img"
            height="200"
            image={houseImg}
            alt="House"
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {propertyName.slice(0, -1)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PropertyCard;