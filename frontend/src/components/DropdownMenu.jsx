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
import axios from "axios";

function DropdownMenu({ propertyName }) {
  const [open, setOpen] = useState(null);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const {
    response: folderResponse,
    error: folderError,
    loading: folderLoading,
  } = useFetch({
    url: "/folders",
    method: "GET",
    params: { prefix: propertyName },
  });

  useEffect(() => {
    if (folderResponse) {
      setFolders(folderResponse);
    }
  }, [folderResponse]);

  async function getFiles(folder) {
    console.log(folder);
    if (folder) {
      try {
        const response = await axios.get("http://localhost:8080/files/files", {
          params: { prefix: folder },
        });
        setFiles(response.data);
        console.log(files);
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    }
  }

  const handleToggle = (index, folder) => {
    if (open === index) {
      setOpen(null);
      setFiles([]);
      setSelectedFolder(null);
    } else {
      setOpen(index);
      setSelectedFolder(folder);
      getFiles(folder);
    }
  };

  return (
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
          onClick={() => handleToggle(index, folder)}
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
              {files.length > 0 ? (
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>
                      <a
                        href={`https://your-bucket-name.s3.amazonaws.com/${file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography>No files found</Typography>
              )}
            </Box>
          </Collapse>
        </Grid>
      ))}
    </Container>
  );
}

export default DropdownMenu;
