import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useModal } from "../store/ModalProvider";
import { tempData } from "../data/Data";
import { Box, Container, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import useFetch from "../customHooks/useFetch";
import PropertyCard from "../components/PropertyCard";



function Dashboard() {
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();
  const { showModal } = useModal();


  const { response, error, loading } = useFetch({
    url: "/folders",
    method: "GET",
    params: { prefix: "" },
  });

  useEffect(() => {
    if (response != null) {
      setFolders(response);
    }
  }, [response]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleClick = (folder) => {
    navigate("/property", { state: { folderName: folder } });
  };



  return (
    <Container 
    maxWidth = 'false'
 sx={{
      ml : '0px',
      mr : '0px',
    }}>
     <Grid container spacing={1} sx={{ marginTop: "20px" }}>
          {folders.map((folder) => (
            <Grid item md={3} key={folder}>
            <PropertyCard
                propertyName={folder}
                onClick={() => handleClick(folder)}
              />
            </Grid>
          ))}
        </Grid>

        </Container>
  );

//   return (
//     <Container 
//     maxWidth = 'false'
//  sx={{
//       ml : '0px',
//       mr : '0px',
//     }}>
//      <Grid container spacing={1} sx={{ marginTop: "20px" }}>
//           {tempData.map((data) => (
//             <Grid item md={3} key={data}>
//             <PropertyCard
//                 propertyName={data}
//                 onClick={() => handleClick(data)}
//               />
//             </Grid>
//           ))}
//         </Grid>

//         </Container>
//   );

}

export default Dashboard;