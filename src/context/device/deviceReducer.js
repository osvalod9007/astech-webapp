import * as ACTION_TYPES from './types';

export default (state, action) => {
  switch (action.type) {
    // copy old state and replace the value
    case ACTION_TYPES.DEVICE_SUCCESS:
      return {
        ...state,
        devices: action.payload.devices,
        organizationId: action.payload.organizationId
      };
    default:
      return state;
  }
};
