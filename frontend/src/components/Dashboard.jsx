import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import PropertyCard from "./PropertyCard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BottomAppBar from "./common/BottomAppBar";
import { useModal } from "../store/ModalProvider";


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
    <>
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {folders.map((folder) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={folder}>
            <Box sx={{ maxWidth: 280, margin: 'auto' }}>
              <PropertyCard
                propertyName={folder}
                onClick={() => handleClick(folder)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
    <BottomAppBar  onClick={() => showModal('addDetails')}/>
    </>
  );
}

export default Dashboard;