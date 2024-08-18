import React, { useState } from "react";
import { Collapse, Container, Grid, Box, Typography, CardMedia } from "@mui/material";

function Property() {
  const [open, setOpen] = useState(null); 
  const properties = [
    { id: 1, name: "Property 1" },
    { id: 2, name: "Property 2" },
    { id: 3, name: "Property 3" },
    { id: 4, name: "Property 4" },
    { id: 5, name: "Property 5" },
  ];

  const handleToggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <Container sx={{ backgroundColor: "grey", mt: "20px" }}>
      {properties.map((property, index) => (
        <Grid
          item
          xs={12}
          key={property.id}
          sx={{
            width: "100%",
            ml: 0,
            mr: 0,
            mt: "5px",
            mb: "5px",
            pt: "5px",
            pb: "5px",
            backgroundColor: "lightblue",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => handleToggle(index)}
        >
          <Typography variant="h6">{property.name}</Typography>
          <Collapse in={open === index} timeout="auto" unmountOnExit>
            <Box
              sx={{
                mt: "20px",
                backgroundColor: "white",
                padding: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CardMedia
                    component="img"
                    height="200"
                    image="https://via.placeholder.com/300"
                    alt="Before"
                    sx={{ objectFit: 'cover' }}
                  />
                  <Typography variant="caption">Before</Typography>
                </Grid>
                <Grid item xs={6}>
                  <CardMedia
                    component="img"
                    height="200"
                    image="https://via.placeholder.com/300"
                    alt="After"
                    sx={{ objectFit: 'cover' }}
                  />
                  <Typography variant="caption">After</Typography>
                </Grid>
              </Grid>
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body2">- Point 1 about the property</Typography>
                <Typography variant="body2">- Point 2 about the property</Typography>
                <Typography variant="body2">- Point 3 about the property</Typography>
              </Box>
            </Box>
          </Collapse>
        </Grid>
      ))}
    </Container>
  );
}

export default Property;
