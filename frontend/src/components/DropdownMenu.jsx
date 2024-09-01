import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Grid,
  Box,
  Typography,
  CardMedia,
  Stack,
} from "@mui/material";
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useFetch from "../customHooks/useFetch";
import axios from "axios";

function DropdownMenu({ propertyName }) {
  const [folders, setFolders] = useState([]);
  const [expandedFolder, setExpandedFolder] = useState(false);
  const [folderData, setFolderData] = useState({});

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
    if (folder) {
      try {
        const [fileResponse, imageResponse] = await Promise.all([
          axios.get("http://localhost:8080/files/files", {
            params: { prefix: folder },
          }),
          axios.get("http://localhost:8080/files/image", {
            params: { prefix: folder },
          }),
        ]);

        setFolderData((prevData) => ({
          ...prevData,
          [folder]: {
            files: fileResponse.data,
            images: imageResponse.data,
          },
        }));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
  }

  const handleAccordionChange = (folder) => (event, isExpanded) => {
    setExpandedFolder(isExpanded ? folder : false);
    if (isExpanded && !folderData[folder]) {
      getFiles(folder);
    }
  };

  return (
    <Container sx={{ mt: "20px" }}>
      {folders.map((folder) => (
        <Accordion
          key={folder}
          expanded={expandedFolder === folder}
          onChange={handleAccordionChange(folder)}
          sx={{ borderRadius: 2 ,mb: 1, border: 'none' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${folder}-content`}
            id={`${folder}-header`}
          >
          <Stack alignItems="center" direction="row" gap={1}>
          <HolidayVillageIcon fontSize="small"/>
            <Typography>
            {folder
                .slice(0, -1)
                .substring(folder.slice(0, -1).lastIndexOf("/") + 1)}
            </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ backgroundColor: "white", padding: 2 }}>
              {folderData[folder] ? (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={6} align='center'>
                      <CardMedia
                        component="img"
                        image={folderData[folder].images.find((str) =>
                          str.includes("beforeImage")
                        )}
                        alt="Before"
                        sx={{ objectFit: "cover", aspectRatio: 3 / 2, border: 1 }}
                      />
                      <Typography variant="caption">Before</Typography>
                    </Grid>
                    <Grid item xs={6} align='center'>
                      <CardMedia
                        component="img"
                        image={folderData[folder].images.find((str) =>
                          str.includes("afterImage")
                        )}
                        alt="After"
                        sx={{ objectFit: "cover", aspectRatio: 3 / 2 }}
                      />
                      <Typography variant="caption">After</Typography>
                    </Grid>
                  </Grid>
                  {folderData[folder].files.length > 0 ? (
                    <ul>
                      {folderData[folder].files.map((file, index) => (
                        <li key={index}>
                          <a
                            href={`https://your-bucket-name.s3.amazonaws.com/${file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.substring(
                              file.slice(0, -1).lastIndexOf("/") + 1
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography>No files found</Typography>
                  )}
                </>
              ) : (
                <Typography>Loading...</Typography>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}

export default DropdownMenu;