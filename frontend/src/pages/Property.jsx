import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import DropdownMenu from "../components/DropdownMenu";
import BottomNavbar from "../components/common/BottomNavbar";
import { useModal } from "../store/ModalProvider";


function Property({}) {
  const location = useLocation();
  const { showModal } = useModal();

  const propertyName = location.state?.propertyName;

  return (
    <Fragment>
    <DropdownMenu propertyName={propertyName} />
    <BottomNavbar onClick={() => showModal("AddPropertyItem", { propertyName })}/>
    </Fragment>
  )
}

export default Property;