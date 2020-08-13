import * as ACTION_TYPES from "./types";
import { sortByString } from "../../helper/basicFunctions";

export const initialStateUser = {
  users: [],
  next: null,
  prev: null,
  selected: null,
};

export default (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.USERS_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.concat(action.users).sort((a,b) => sortByString(a.last_name, b.last_name)),
        next: action.next,
        prev: action.previous,
      };
    case ACTION_TYPES.USERS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case ACTION_TYPES.USER_SELECTED:
      return {
        ...state,
        selected: action.user,
      };
    case ACTION_TYPES.USER_DELETED:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.userId),
      };
    case ACTION_TYPES.CLEAR_USERS_LIST:
      return {
        ...state,
        users: [],
        next: null,
        prev: null,
      };
    default:
      return state;
  }
};
