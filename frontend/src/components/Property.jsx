import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import useFetch from "../customHooks/useFetch";

function Property() {
  const location = useLocation();
  const { folderName } = location.state || {};
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();

  const { response, error, loading } = useFetch({
    url: "/folders",
    method: "GET",
    params: { prefix: folderName },
  });

  useEffect(() => {
    if (response != null) {
      setFolders(response);
    }
  }, [response]);

  const handleClick = (folder) => {
    navigate("/item", { state: { folderName: folder } });
  };

  return (
    <div>
      <h2>Folders</h2>
      <ul>
        {folders.map((folder, index) => (
          <li key={index} style={{ padding: 5 }}>
            <button onClick={() => handleClick(folder)}>{folder}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Property;
