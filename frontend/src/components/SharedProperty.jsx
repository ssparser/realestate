// SharedProperty.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Typography, CardMedia, Box } from '@mui/material';

function SharedProperty() {
  const { token } = useParams();
  const [propertyData, setPropertyData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/share/validate/${token}`);
        setPropertyData(response.data);
      } catch (err) {
        setError('Failed to load property data');
      }
    };

    fetchPropertyData();
  }, [token]);

  if (error) return <div>{error}</div>;
  if (!propertyData) return <div>Loading...</div>;

  return (
    <Container sx={{ backgroundColor: "grey", mt: "20px" }}>
      <Typography variant="h4">{propertyData.folderName}</Typography>
      <Grid container spacing={2}>
        {propertyData.objectUrls.map((url, index) => (
          <Grid item xs={6} key={index}>
            <CardMedia
              component="img"
              height="200"
              image={url}
              alt={`Image ${index + 1}`}
              sx={{ objectFit: 'cover' }}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: 2 }}>
        {propertyData.files.map((file, index) => (
          <Typography key={index} variant="body2">- {file}</Typography>
        ))}
      </Box>
    </Container>
  );
}

export default SharedProperty;