
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    // Navigate to the parent folder
    const newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    setCurrentPath(newPath || ''); // Go to root if no parent
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
    </div>
  );
}

export default App;
