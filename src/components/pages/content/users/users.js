import React, { useEffect, useContext, useState, useRef } from "react";
import { Box, Grid, Button, Typography } from "@material-ui/core";
import UserContextProvider, {
  useUserContext,
} from "../../../../context/users/userState";
import UserInvitation from "../../../forms/user-invitation/user-invitation";
import authContext from "../../../../context/auth/authContext";
import TitlePage from "../../../atoms/title-page";
import { ArrowUpward } from "@material-ui/icons";
import UsersList from "../../../list/users-list";
import UserInformation from "../../../forms/user-information/user-information";
import { fetchRoles } from "../../../../context/users/userActions";
import UserFilters from "./user-filters";

const filteredRoles = (array = [], userAuth) => array.filter(role => {
  if (userAuth.isAdmin) {
    return role.name !== "In-Shop";
  } else {
    return true;
  }
})

export function Users({ userAuth }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [optionsRoles, setOptionsRoles] = useState([]);
  const [search, setSearch] = useState({});
  const [refresh, setRefresh] = useState(0);

  const {
    fetchUsers,
    users,
    next,
    clearUserList,
    submitInvitation,
    selected,
    selectRowFromList,
    removeUserFromList,
    resendInvitation,
  } = useUserContext();

  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    fetchRoles().then((roles) => {
      if (mounted.current) {
        setOptionsRoles(roles.data.results);
      }
    });

    return () => {
      mounted.current = false;
    };
  }, [userAuth]);

  const handleSubmit = (values) => {
    submitInvitation(values).then(() => {      
      setRefresh(Math.random())
      if (openDialog === "bulkInvitation") setOpenDialog("");
    });
  };

  const handleClose = () => setOpenDialog(false);

  return (
    <Box margin={2} className="users-content">
      {selected ? (
        <UserInformation
          userAuth={userAuth}
          removeUserFromList={removeUserFromList}
          userInformation={selected}
          clearSelected={selectRowFromList.bind(null, null)}
          optionsRoles={optionsRoles}
        />
      ) : (
        <>
          <Box display="flex" alignItems="top">
            <TitlePage
              title={"User Management"}
              subtitle={<Typography variant="h5">Members</Typography>}
            />
            <Box margin="16px">
              <Button
                className="background-color-blue background-color-blue-hover text-color-white"
                onClick={setOpenDialog.bind(this, "bulkInvitation")}
                startIcon={
                  <ArrowUpward
                    style={{ borderRadius: "50%" }}
                    fontSize="small"
                    className="background-color-white text-color-blue"
                  />
                }
              >
                Copy A List
              </Button>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <UserFilters
                optionsRoles={optionsRoles}
                searches={search}
                setSearches={setSearch}
              />
              <UsersList
                filters={search}
                refresh={refresh}
                userAuth={userAuth}
                clearUserList={clearUserList}
                fetchUsers={fetchUsers}
                next={next}
                users={users}
                selectRowFromList={selectRowFromList}
                removeUserFromList={removeUserFromList}
                resendInvitation={resendInvitation}
              />
            </Grid>
            <Grid item xs={6}>
              <Box padding={2}>
                <UserInvitation
                  bulkDialog={openDialog}
                  closeBulkDialog={handleClose}
                  submitInvitation={handleSubmit}
                  optionsRoles={filteredRoles(optionsRoles, userAuth)}
                />
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default () => {
  const { user } = useContext(authContext); // extract values from context
  return (
    <UserContextProvider>
      <Users userAuth={user} />
    </UserContextProvider>
  );
};
