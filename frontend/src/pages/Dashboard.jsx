import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useModal } from "../store/ModalProvider";
import { tempData } from "../data/Data";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import PropertyCard from "../components/PropertyCard";
import useFetch from "../customHooks/useFetch";
import AddDetailsModal from "../modals/AddPropertyModal";
import BottomNavbar from "../components/common/BottomNavbar";

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

  const handleClick = (folder) => {
    console.log(folder);
    if (folder) {
      navigate("/property", { state: { propertyName: folder } });
    } else {
      console.error("Folder name is undefined");
    }
  };

  const generateShareLink = async (folderName) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/share/generate?folderName=${folderName}`);
      const token = response.data;
      const shareLink = `http://localhost:5173/shared/${token}`;
      
      navigator.clipboard.writeText(shareLink);
      showModal('Share Link', 'Share link copied to clipboard!');
    } catch (error) {
      console.error('Failed to generate share link', error);
      showModal('Error', 'Failed to generate share link');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Fragment>
    <Container maxWidth="false" sx={{ ml: '0px', mr: '0px' }}>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        {folders.map((folder) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={folder}>
            <PropertyCard
              propertyName={folder}
              onClick={() => handleClick(folder)}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => generateShareLink(folder)}
              sx={{ mt: 1 }}
            >
              Share
            </Button>
          </Grid>
        ))}
      </Grid>
      
    </Container>
    <BottomNavbar onClick={() => showModal("addProperty")}/>
    </Fragment>
  );


}

export default Dashboard;