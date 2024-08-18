import { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/files";

const useUpload = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFiles = async (files, propertyName, itemName) => {
    setLoading(true);
    setError("");
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    
    formData.append('propertyName', propertyName);
    formData.append('itemName', itemName);
    
    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(response.data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, uploadFiles };
};

export default useUpload;
