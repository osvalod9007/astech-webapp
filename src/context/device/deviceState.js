import React, { useReducer, useCallback } from 'react';
import deviceContext from './deviceContext';
import deviceReducer from './deviceReducer';

import * as ACTION_TYPES from './types';
import httpService from '../../config/axios';

const DeviceState = props => {
  const initialState = {
    devices: [],
    organizationId: null
  };

  // dispatch for execute actions
  // take two parameters, reducer and initial state
  const [state, dispatch] = useReducer(deviceReducer, initialState);

  // get data devices in organization
  const getDevices = useCallback(async organizationId => {
    try {
      const response = await httpService.get(`api/v1/organizations/${organizationId}/devices/`);
      dispatch({
        type: ACTION_TYPES.DEVICE_SUCCESS,
        payload: {
          devices: response.data,
          organizationId
        }
      });
    } catch (error) {
      //console.log(error);
    }
  }, []);

  // set favorite device
  const setFavoriteDevice = useCallback(
    async (organizationId, deviceId) => {
      try {
        await httpService.post(`api/v1/organizations/${organizationId}/devices/${deviceId}/toggle-favorite/`);
        getDevices(organizationId);
      } catch (error) {}
    },
    [getDevices]
  );

  // pass functions and values of the state
  return (
    <deviceContext.Provider
      value={{
        devices: state.devices,
        organizationId: state.organizationId,
        getDevices,
        setFavoriteDevice
      }}
    >
      {props.children}
    </deviceContext.Provider>
  );
};

export default DeviceState;
