import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/files/";

const useFetch = ({ url, method, params = {} }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios({
      method,
      url,
      params,
    })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, loading };
};

export default useFetch;
