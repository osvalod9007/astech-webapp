import httpService from "../../config/axios";
import * as ACTION_TYPES from "./types";

export const usersSuccess = ({ results, next, previous }) => ({
  type: ACTION_TYPES.USERS_SUCCESS,
  users: results,
  next,
  previous,
});

export const usersFailed = () => ({
  type: ACTION_TYPES.USERS_FAILED,
});

export const selectUserAction = (user) => ({
  type: ACTION_TYPES.USER_SELECTED,
  user,
});

export const crearUserListAction = () => ({
  type: ACTION_TYPES.CLEAR_USERS_LIST,
});

export const removedUserAction = (userId) => ({
  type: ACTION_TYPES.USER_DELETED,
  userId,
});

export const fetchUsersAction = async (filters) => {
  try {
    const response = await httpService.get(
      `api/v1/organizations/${localStorage.getItem("organizationId")}/users/`,
      {
        params: { ...JSON.parse(filters), page_size: 10 },
      }
    );
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const fetchSelectedUser = async (userId) => {
  try {
    const response = await httpService.get(
      `api/v1/organizations/${localStorage.getItem(
        "organizationId"
      )}/users/${userId}`
    );
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const changeUserRole = async ({ id, role }) => {
  try {
    const response = await httpService.put(
      `api/v1/organizations/${localStorage.getItem(
        "organizationId"
      )}/users/${id}/role/${role}/`
    );
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const removeUserAction = async (id) => {
  try {
    const response = await httpService.delete(
      `api/v1/organizations/${localStorage.getItem(
        "organizationId"
      )}/users/${id}/`
    );
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const setInvitationAction = async (invitation) => {
  try {
    const response = await httpService.post(
      `api/v1/organizations/${localStorage.getItem("organizationId")}/users/`,
      invitation
    );
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const fetchRoles = async () => {
  try {
    const response = await httpService.get(`api/v1/roles/`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const resendInvitationAction = async (email) => {
  try {
    const response = await httpService.post(
      `api/v1/organizations/${localStorage.getItem(
        "organizationId"
      )}/users/resend-invitation/`,
      { email }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
