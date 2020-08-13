import React, { useReducer, useCallback } from "react";
import { useContext } from "react";
import UserContext from "./userContext";
import userReducers, { initialStateUser } from "./userReducer";
import {
  fetchUsersAction,
  usersSuccess,
  usersFailed,
  setInvitationAction,
  selectUserAction,
  crearUserListAction,
  removeUserAction,
  resendInvitationAction,
  removedUserAction,
} from "./userActions";

const UserContextProvider = ({ children }) => {
  const [{ users, next, prev, selected }, dispatch] = useReducer(
    userReducers,
    initialStateUser
  );

  const fetchUsers = useCallback(async (params) => {
    try {
      const result = await fetchUsersAction(params);
      dispatch(usersSuccess(result));
    } catch (e) {
      dispatch(usersFailed());
    }
  }, []);

  const submitInvitation = useCallback(async (values) => {
    try {
      return await setInvitationAction(values);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const selectRowFromList = useCallback((row) => {
    dispatch(selectUserAction(row));
  }, []);

  const clearUserList = useCallback(() => {
    dispatch(crearUserListAction());
  }, []);

  const removeUserFromList = useCallback(async (id) => {
    try {
      await removeUserAction(id);
      dispatch(removedUserAction(id));
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  const resendInvitation = useCallback(async (email) => {
    return await resendInvitationAction(email)
  }, [])

  return (
    <UserContext.Provider
      value={{
        users,
        next,
        prev,
        selected,
        fetchUsers,
        submitInvitation,
        selectRowFromList,
        clearUserList,
        removeUserFromList,
        resendInvitation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const value = useContext(UserContext);

  if (!value) throw new Error("Only works inside ");

  const {
    users,
    next,
    prev,
    selected,
    fetchUsers,
    submitInvitation,
    selectRowFromList,
    clearUserList,
    removeUserFromList,
    resendInvitation,
  } = value;
  return {
    users,
    next,
    prev,
    selected,
    fetchUsers,
    submitInvitation,
    selectRowFromList,
    clearUserList,
    removeUserFromList,
    resendInvitation,
  };
};

export default UserContextProvider;
