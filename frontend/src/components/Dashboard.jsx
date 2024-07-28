import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import SimpleMediaCard from './SimpleMediaCard';

function Dashboard() {
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();

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
    <div>
      <h2>Folders</h2>
      <ul>
        {folders.map((folder, index) => (
            <li key={index} style={{ margin: '10px 0' }}>
            <div onClick={() => handleClick(folder)} style={{ cursor: 'pointer' }}>
              <SimpleMediaCard propertyName={folder} />
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default Dashboard;
