import React, { useState, useEffect, useCallback, memo } from "react";
import useFetch from "../customHooks/useFetch";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import axios from "axios";
import { useModal } from "../store/ModalProvider";

const PropertyCard = memo(({ propertyName, onClick }) => {
  const [houseImg, setHouseImg] = useState(null);
  const { response, error, loading } = useFetch({
    url: "/image",
    method: "GET",
    params: { prefix: propertyName },
  });
  const { showModal } = useModal();

  useEffect(() => {
    if (response && response.length > 0) {
      setHouseImg(response[0]);
    }
  }, [response]);

  const showshare = useCallback(() => {
    showModal("SharePropertyModal", { propertyName });
  }, [showModal, propertyName]);

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 500, p: 2, mb: 3,  display: "flex", flexDirection: "column"}}>
      <CardMedia
        component="img"
        height="200"
        image={houseImg}
        alt={propertyName.slice(0, -1)}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ backgroundColor: "white" }}>
        <Typography gutterBottom variant="h6"   sx={{  }}>
          {propertyName.slice(0, -1)}
        </Typography>
      </CardContent>
      <CardActions
        component="div"
        sx={{
          display: "inline-flex",
          justifyContent: "space-evenly"
                  }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={showshare}
          sx={{ mt: 1 }}
        >
          Share
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={onClick}
          sx={{ mt: 1, ml: 0 }}
        >
          Show Property
        </Button>
      </CardActions>
    </Card>
  );
});

export default React.memo(PropertyCard);
