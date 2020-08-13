import * as ACTION_TYPES from './types';
import { setAccessToken } from '../../config/axios';

export const initialState = {
    user: null,
    accessToken: localStorage.getItem('access_token')
  };

export default (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.AUTH_SUCCESS: {
            localStorage.setItem('access_token', action.payload.access_token);
            localStorage.setItem('refresh_token', action.payload.refresh_token);
            setAccessToken(action.payload.access_token)
            return { ...state, accessToken: action.payload.access_token, user: null }
        }
        case ACTION_TYPES.USER_SUCCESS:
            if (action.payload.organizations.length > 0 || action.payload.organizations !== null) {
                localStorage.setItem('organizationId', action.payload.organizations[0].id);
            }
            return {
                ...state,
                user: action.payload
            }
        case ACTION_TYPES.AUTH_FAILURE: {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('organizationId');
            return {
                ...state, user: null
            }
        }
        case ACTION_TYPES.LOGOUT_SUCCESS: {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('organizationId');
            return {
                ...state, user: null
            }
        }
        default:
            return state;
    }
}