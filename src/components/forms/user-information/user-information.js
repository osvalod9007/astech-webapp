import React, { memo, useState, useRef } from "react";
import {
  Container,
  Box,
  Button,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import TitlePage from "../../atoms/title-page";
import { changeUserRole } from "../../../context/users/userActions";
import CustomDialog from "../../dialogs/custom-dialog";
import {
  editDialogText,
  removeDialogText,
} from "../../pages/content/users/texts";
import FormUserInformation from "./form-user-information";

function UserInformation({
  userAuth,
  userInformation,
  removeUserFromList,
  clearSelected,
  optionsRoles = [],
}) {
  const [openDiaglog, setOpenDialog] = useState();
  const formRef = useRef()

  const onSubmit = (_, form) => {
    const { dirty } = form.getFieldState("role");
    if (dirty) {
      setOpenDialog("EDIT_USER");
    }
  };

  const handleClose = () => {
    setTimeout(formRef.current.reset);
    setOpenDialog("");
  };

  const handleYesButton = () => {
    const { values } = formRef.current.getState();
    if (openDiaglog === "EDIT_USER") {
      changeUserRole(values).then(() => {
        setOpenDialog("");
      });
    }
    if (openDiaglog === "REMOVE_USER") {
      removeUserFromList(values.id).then(() => {
        handleClose();
        clearSelected();
      });
    }
  };

  return (
    <Container className="user-information" maxWidth="md">
      <CustomDialog open={!!openDiaglog} onClose={handleClose}>
        <p className="text-color-blue">
          {(openDiaglog === "EDIT_USER" && editDialogText) ||
            (openDiaglog === "REMOVE_USER" && removeDialogText)}
        </p>
        <Box margin={2} display="flex" justifyContent="space-around">
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleYesButton} className="text-color-green">
            Yes
          </Button>
        </Box>
      </CustomDialog>
      <TitlePage title={"Profile Information"} />
      <Box display="flex" justifyContent="space-between">
        <Button
          className="background-color-blue background-color-blue-hover text-color-white"
          startIcon={<ArrowBackIos />}
          onClick={clearSelected}
        >
          Back
        </Button>
        {userAuth.isAdmin && (
          <Button
            className="background-color-red background-color-red-hover text-color-white"
            onClick={setOpenDialog.bind(null, "REMOVE_USER")}
          >
            Remove this user
          </Button>
        )}
      </Box>
      <FormUserInformation
        userAuthId={userAuth.id}
        ref={formRef}
        userInformation={userInformation}
        onSubmit={onSubmit}
        optionsRoles={optionsRoles}
        type='from-user-list'
      />
    </Container>
  );
}

export default memo(UserInformation);
