import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DropdownMenu from '../components/DropdownMenu';

function SharedProperty() {
  const { token } = useParams();
  const [propertyName, setPropertyName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyName = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/share/validate/${token}`);
        setPropertyName(response.data.folderName);
      } catch (err) {
        setError('Failed to load property data');
      }
    };

    fetchPropertyName();
  }, [token]);

  if (error) return <div>{error}</div>;
  if (!propertyName) return <div>Loading...</div>;

  return (
    <Fragment>
          <DropdownMenu propertyName={propertyName} />
    </Fragment>
  );
}

export default SharedProperty;