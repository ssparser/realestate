import React from "react";
import { useLocation } from "react-router-dom";
import DropdownMenu from "../components/DropdownMenu";

function Property({}) {
  const location = useLocation();
  const propertyName = location.state?.propertyName;

  return (
    <DropdownMenu propertyName={propertyName} />
  )
}

export default Property;