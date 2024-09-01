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

    const sanitizedPropertyName = propertyName.replace(/^\/|\/$/g, '');
    const sanitizedItemName = itemName.replace(/^\/|\/$/g, '');
   

    formData.append('propertyName', sanitizedPropertyName);

    formData.append('itemName', sanitizedItemName);

    try {
      console.log("Sending POST request with the following data:");
      console.log("Form Data:", formData);
      

      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
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