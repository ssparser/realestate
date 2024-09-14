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
    showModal("SharePropertyModal",{propertyName});
  }, [showModal, propertyName]);

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 500, p: 2, mb: 3 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="200"
          image={houseImg}
          alt={propertyName.slice(0, -1)}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ backgroundColor: "white" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: "1rem" }}
          >
            {propertyName.slice(0, -1)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={showshare}
          sx={{ mt: 1 }}
        >
          Share
        </Button>
      </CardActions>
    </Card>
  );
});

export default React.memo(PropertyCard);
