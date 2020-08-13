import React, { useReducer, useCallback, useEffect } from "react";
import authContext from "./authContext";
import authReducer, { initialState } from "./authReducer";
import { astechAuth } from "../../helper/client0Auth";
import * as ACTION_TYPES from "./types";
import httpService from "../../config/axios";
import { getLogoutUrl } from "./utils";

const getUserProfile = () => {
  return httpService.get("api/v1/users/profile/");
};

const profileRoles = (roles) => ({
  isAdmin:
    roles.some((role) => role.name.toLowerCase().includes("admin")) || false,
  roles: roles || [],
});

const AuthState = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleErrors = useCallback((e) => {
    if (e?.response?.status === 401) {
      logout();
    }
  }, []);

  const getUserAuthenticated = useCallback(async () => {
    try {
      const response = await getUserProfile();
      if (!response?.data?.organizations[0]?.roles) {
        logout();
      } else {
        dispatch({
          type: ACTION_TYPES.USER_SUCCESS,
          payload: {
            ...response.data,
            ...profileRoles(response?.data?.organizations[0]?.roles),
          },
        });
      }
    } catch (e) {
      handleErrors(e);
    }
  }, [handleErrors]);

  const login = useCallback(async (originalUrl) => {
    const auth = astechAuth();
    try {
      const response = await auth.code.getToken(originalUrl);
      dispatch({
        type: ACTION_TYPES.AUTH_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      logout();
    }
  }, []);

  const logout = async () => {
    const formData = new FormData();
    formData.append("client_id", process.env.REACT_APP_CLIENT_ID);
    formData.append("token", localStorage.getItem("access_token"));
    try {
      await httpService.post("api/auth/revoke-token/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: ACTION_TYPES.LOGOUT_SUCCESS,
      });

      window.location.href = getLogoutUrl();
    } catch (error) {
      console.error(error);
    }
  };

  const saveDataProfile = useCallback(
    async ({ id, first_name, last_name, email, phone_number }) => {
      try {
        const response = await httpService.patch(`api/v1/users/${id}/`, {
          first_name,
          last_name,
          email,
          phone_number,
        });

        dispatch({
          type: ACTION_TYPES.USER_SUCCESS,
          payload: {
            ...state.user,
            ...response.data,
          },
        });
      } catch (e) {
        throw new Error(e.message);
      }
    },
    [state.user]
  );

  useEffect(() => {
    httpService.interceptors.request.use((request) => {
      if (!request.url.includes("api/v1/users/profile/")) {
        getUserProfile().then((profile) => {
          if (!profile?.data?.organizations?.length) {
            logout();
          }
        });
        return request;
      }
      return request;
    });
  }, [handleErrors]);

  return (
    <authContext.Provider
      value={{
        accessToken: state.accessToken,
        refreshToken: localStorage.getItem("refresh_token"),
        organizationId: localStorage.getItem("organizationId"),
        user: state.user,
        login,
        logout,
        getUserAuthenticated,
        saveDataProfile,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
