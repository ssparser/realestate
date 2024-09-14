import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Pagination,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useModal } from "../store/ModalProvider";
import PropertyCard from "../components/PropertyCard";
import useFetch from "../customHooks/useFetch";
import BottomNavbar from "../components/common/BottomNavbar";

const ITEMS_PER_PAGE = 8;

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { showModal } = useModal();

  const { response, error, loading, refetch } = useFetch({
    url: "/folders",
    method: "GET",
    params: { prefix: "", page: page, size: ITEMS_PER_PAGE },
  });

  useEffect(() => {
    if (response != null) {
      setFolders(response.content);
      setTotalPages(response.totalPages);
    }
  }, [response]);

  const handleClick = useCallback(
    (folder) => {
      if (folder) {
        navigate("/property", { state: { propertyName: folder } });
      } else {
        console.error("Folder name is undefined");
      }
    },
    [navigate]
  );

  const handleAddProperty = useCallback(() => {
    showModal("addProperty");
  }, [showModal]);



  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value - 1);
      refetch({ page: value - 1, size: ITEMS_PER_PAGE });
    },
    [refetch]
  );

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <>
      <Container maxWidth="false" sx={{ ml: "0px", mr: "0px" }}>
        {folders.length === 0 ? (
          <Typography variant="body1">No folders found.</Typography>
        ) : (
          <Grid container spacing={2} sx={{ paddingTop: "20px" }}>
            {folders.map((folder) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={folder}>
                <PropertyCard
                  propertyName={folder}
                  onClick={() => handleClick(folder)}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={handlePageChange}
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        />
      </Container>
      <BottomNavbar onClick={handleAddProperty} />
      {/* <BottomNavbar onClick={showshare} /> */}
    </>
  );
};

export default React.memo(Dashboard);
