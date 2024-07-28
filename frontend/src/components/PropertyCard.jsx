import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const styles = {
  card: {
    width: 345,
    height: 270,
  },
  media: {
    height: "100%",
  },
};

function PropertyCard({ propertyName }) {
  const Media = styled(CardMedia)({
    height: 200,
  });
  return (
    <Card sx={styles.card}>
        <Media
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {propertyName.slice(0, -1)}
          </Typography>
        </CardContent>
    </Card>
  );
}

PropertyCard.propTypes = {
  propertyName: PropTypes.string,
};

export default PropertyCard;
