
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleMediaCard from './components/SimpleMediaCard';

function App() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/files/folders', {
          params: { prefix: currentPath }
        });
        setFolders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchFolders();
  }, [currentPath]);

  useEffect(() => {
    const fetchFiles = async () => {
      if (currentPath) {
        try {
          const response = await axios.get('http://localhost:8080/files/files', {
            params: { prefix: currentPath }
          });
          setFiles(response.data);
        } catch (err) {
          setError(err);
        }
      }
    };

    fetchFiles();
  }, [currentPath]);

  const handleFolderClick = (folder) => {
    setCurrentPath(folder);
  };

  const handleGoBack = () => {
    const newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    setCurrentPath(newPath || ''); 
  };

  return (
    <div className="App">
      <h1>S3 Bucket Contents</h1>
      <button onClick={handleGoBack} disabled={!currentPath}>
        Go Back
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div>
        <h2>Folders</h2>
        <ul>
          {folders.map((folder, index) => (
            <li key={index}>
              <button onClick={() => handleFolderClick(folder)}>
                {folder}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Files</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a href={`https://your-bucket-name.s3.amazonaws.com/${file}`} target="_blank" rel="noopener noreferrer">
                {file}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <SimpleMediaCard/>
    </div>
  );
}


import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

const CardContainer = styled(Card)({
  maxWidth: 345,
});

const CardButton = styled(ButtonBase)({
  display: "block",
  textAlign: "initial",
});

const Media = styled(CardMedia)({
  height: 200,
});


function SimpleMediaCard({propertyName}) {
  return (
    <div>
      <CardContainer>
        <CardButton>
          <Media
            image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {propertyName.slice(0, -1)}
            </Typography>
            <Typography variant="body2" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica.
            </Typography>
          </CardContent>
        </CardButton>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </CardContainer>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SimpleMediaCard;


