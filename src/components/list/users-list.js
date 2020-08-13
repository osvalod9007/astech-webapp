import React, { useRef, useEffect, useCallback, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  IconButton,
  Button,
  Box,
} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatDate, hasNameAndLastName } from "../../context/users/util";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import { ReactComponent as ResendIcon } from "../../assets/img/resend_icon.svg";
import CustomDialog from "../dialogs/custom-dialog";
import { removeInvitationText } from "../pages/content/users/texts";

const removeDuplicated = (array=[]) => Array.from(new Set(array.map(user => user.id))).map(userId => array.find(user => user.id === userId)).filter(value => !!value);

function UsersList({
  userAuth,
  fetchUsers,
  clearUserList,
  users,
  filters,
  next,
  refresh,
  selectRowFromList,
  removeUserFromList,
  resendInvitation,
}) {
  const [openDialog, setOpenDialog] = useState(null);
  const [resending, setResending] = useState(null);
  const params = JSON.stringify(filters);
  const divRef = useRef();
  const userList = removeDuplicated(users);

  useEffect(() => {
    fetchUsers(params);

    return () => {
      clearUserList()
    }
  }, [fetchUsers, params, refresh, clearUserList]);

  const handleFetchDate = useCallback(() => {
    if (next) {
      const url = new URL(next);
      let pagination = {};
      url.searchParams.forEach((a, b) => {
        pagination[b] = ["page", "page_size"].includes(b) ? Number(a) : a;
      });
      const params = JSON.stringify({ ...pagination, ...filters });
      fetchUsers(params);
    }
  }, [next, fetchUsers, filters]);

  useEffect(() => {
    if (window.innerHeight > divRef.current.offsetHeight) {
      handleFetchDate();
    }
  }, [handleFetchDate]);

  const handleClickYes = () => {
    if (setOpenDialog) {
      removeUserFromList(openDialog.id).then(() => {
        setOpenDialog(null);
        handleFetchDate();
      });
    }
  };

  const handleResendInvitation = ({ id, email }) => {
    setResending(id);
    resendInvitation(email).finally(() => {
      setResending("");
    });
  };

  return (
    <TableContainer>
      {openDialog && (
        <CustomDialog
          open={!!openDialog}
          onClose={setOpenDialog.bind(null, false)}
        >
          <p className="text-color-blue">{removeInvitationText}</p>
          <Box margin={2} display="flex" justifyContent="space-around">
            <Button onClick={setOpenDialog.bind(null, false)}>No</Button>
            <Button onClick={handleClickYes} className="text-color-green">
              Yes
            </Button>
          </Box>
        </CustomDialog>
      )}
      <div ref={divRef}>
        <InfiniteScroll
          dataLength={userList.length}
          next={handleFetchDate}
          hasMore={next}
          loader={<h4>...</h4>}
          initialScrollY={0}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="user-list-first-cell" />
                <TableCell>First and Last Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="center">Last Login</TableCell>
                <TableCell className="user-list-last-cell" />
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="user-list-first-cell">
                    {!user?.invitation_accepted && (
                      <IconButton onClick={setOpenDialog.bind(null, user)}>
                        <RemoveCircleRoundedIcon className="text-color-red" />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      className="user-list-name-cell"
                      component="div"
                      variant="body2"
                      color="inherit"
                      onClick={selectRowFromList.bind(null, user)}
                    >
                      {`${
                        hasNameAndLastName(user.first_name, user.last_name) ||
                        user?.email ||
                        ""
                      }`}
                    </Link>
                  </TableCell>
                  <TableCell>{`${user.roles
                    .map((role) => role.name)
                    .join(", ")}`}</TableCell>
                  <TableCell align="center">{`${
                    !user.invitation_accepted
                      ? formatDate(user.sent_invitation)
                      : formatDate(user.last_login)
                  }`}</TableCell>
                  <TableCell className="user-list-last-cell" align="center">
                    {!user?.invitation_accepted && (
                      <IconButton
                        onClick={handleResendInvitation.bind(null, user)}
                      >
                        <ResendIcon
                          className={`icon-size ${
                            resending === user.id ? "icon-spin" : ""
                          }`}
                        />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </div>
    </TableContainer>
  );
}

export default UsersList;
