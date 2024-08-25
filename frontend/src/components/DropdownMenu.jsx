import React, { useEffect, useState } from "react";
import {
  Collapse,
  Container,
  Grid,
  Box,
  Typography,
  CardMedia,
} from "@mui/material";
import useFetch from "../customHooks/useFetch";

function DropdownMenu({ propertyName }) {
  const [open, setOpen] = useState(null);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);


  const { response: folderResponse, error: folderError, loading: folderLoading } = useFetch({
    url: "/folders",
    method: "GET",
    params: { prefix: propertyName } 
  });

  useEffect(() => {
    if (folderResponse) {
      setFolders(folderResponse); 
    }
  }, [folderResponse]);

  

function getFiles()
{
    const { response: fileResponse, error: fileError, loading: fileLoading } = useFetch({
        url: "/files", 
        method: "GET",
        params: { prefix: selectedFolder } 
      });
      setFiles = fileResponse;
}

//   const properties = [
//     { id: 1, name: "Property 1" },
//     { id: 2, name: "Property 2" },
//     { id: 3, name: "Property 3" },
//     { id: 4, name: "Property 4" },
//     { id: 5, name: "Property 5" },
//   ];

const handleToggle = (index, folder) => {
    if (open === index) {
      setOpen(null);
      setFiles([]); 
      setSelectedFolder(null);
    } else {
      setOpen(index);
      setSelectedFolder(folder);
      getFiles();
    }
  };

  return (
    // <Container sx={{ backgroundColor: "grey", mt: "20px" }}>
    //   {properties.map((property, index) => (
    //     <Grid
    //       item
    //       xs={12}
    //       key={property.id}
    //       sx={{
    //         width: "100%",
    //         ml: 0,
    //         mr: 0,
    //         mt: "5px",
    //         mb: "5px",
    //         pt: "5px",
    //         pb: "5px",
    //         backgroundColor: "lightblue",
    //         textAlign: "center",
    //         cursor: "pointer",
    //       }}
    //       onClick={() => handleToggle(index)}
    //     >
    //       <Typography variant="h6">{property.name}</Typography>
    //       <Collapse in={open === index} timeout="auto" unmountOnExit>
    //         <Box
    //           sx={{
    //             mt: "20px",
    //             backgroundColor: "white",
    //             padding: 2,
    //           }}
    //         >
    //           <Grid container spacing={2}>
    //             <Grid item xs={6}>
    //               <CardMedia
    //                 component="img"
    //                 height="200"
    //                 image="https://via.placeholder.com/300"
    //                 alt="Before"
    //                 sx={{ objectFit: "cover" }}
    //               />
    //               <Typography variant="caption">Before</Typography>
    //             </Grid>
    //             <Grid item xs={6}>
    //               <CardMedia
    //                 component="img"
    //                 height="200"
    //                 image="https://via.placeholder.com/300"
    //                 alt="After"
    //                 sx={{ objectFit: "cover" }}
    //               />
    //               <Typography variant="caption">After</Typography>
    //             </Grid>
    //           </Grid>
    //           <Box sx={{ marginTop: 2 }}>
    //             <Typography variant="body2">
    //               - Point 1 about the property
    //             </Typography>
    //             <Typography variant="body2">
    //               - Point 2 about the property
    //             </Typography>
    //             <Typography variant="body2">
    //               - Point 3 about the property
    //             </Typography>
    //           </Box>
    //         </Box>
    //       </Collapse>
    //     </Grid>
    //   ))}
    // </Container>
    ////////


    <Container sx={{ backgroundColor: "grey", mt: "20px" }}>
    {folders.map((folder, index) => (
      <Grid
        item
        xs={12}
        key={folder}
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
        <Typography variant="h6">{folder}</Typography>
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
                  sx={{ objectFit: "cover" }}
                />
                <Typography variant="caption">Before</Typography>
              </Grid>
              <Grid item xs={6}>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://via.placeholder.com/300"
                  alt="After"
                  sx={{ objectFit: "cover" }}
                />
                <Typography variant="caption">After</Typography>
              </Grid>
            </Grid>
            {files.map((file, index) => (
            <li key={index}>
              <a href={`https://your-bucket-name.s3.amazonaws.com/${file}`} target="_blank" rel="noopener noreferrer">
                {file}
              </a>
            </li>
          ))}
            {/* <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2">
                - Point 1 about the property
              </Typography>
              <Typography variant="body2">
                - Point 2 about the property
              </Typography>
              <Typography variant="body2">
                - Point 3 about the property
              </Typography>
            </Box> */}
          </Box>
        </Collapse>
      </Grid>
    ))}
  </Container>
  );
}

export default DropdownMenu;
