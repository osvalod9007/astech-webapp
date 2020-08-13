import React, { useContext, useState } from 'react';
import { Box } from '@material-ui/core';

import Device from './card';

import deviceContext from '../../../context/device/deviceContext';
import { counterDevice } from '../../../helper/basicFunctions';

export const Devices = props => {
  const [type, setType] = useState('connected');

  const handleType = typeDevice => event => {
    setType(typeDevice);
  };

  const { devices, organizationId } = useContext(deviceContext);

  return (
    <Box className="content-devices" display="flex">
      <Box className="general-devices-info">
        <div className="title-info">Devices</div>
        <div className={`counters ${type === 'connected' ? 'selected' : ''}`} onClick={handleType('connected')}>
          <span className="count">{devices.results !== null ? counterDevice(devices.results).connected : 0}</span>
          <span className="span-title">Connected</span>
        </div>
        <div className={`counters ${type === 'submitted' ? 'selected' : ''}`} onClick={handleType('submitted')}>
          <span className="count">{devices.results !== null ? counterDevice(devices.results).submitted : 0}</span>
          <span className="span-title">Submitted</span>
        </div>
        <div className={`counters ${type === 'completed' ? 'selected' : ''}`} onClick={handleType('completed')}>
          <span className="count">{devices.results !== null ? counterDevice(devices.results).completed : 0}</span>
          <span className="span-title">Completed</span>
        </div>
        <div className={`counters ${type === 'offline' ? 'selected' : ''}`} onClick={handleType('offline')}>
          <span className="count">{devices.results !== null ? counterDevice(devices.results).offline : 0}</span>
          <span className="span-title">Offline</span>
        </div>
        <div className="title-info">History</div>
      </Box>

      <Box className="cards-devices">
        {devices.results !== undefined
          ? devices.results
              .sort((a, b) => {
                if (a.favorite > b.favorite) {
                  return -1;
                } else if (a.favorite === b.favorite) {
                  return a.deviceSN > b.deviceSN;
                } else {
                  return 1;
                }
              })
              .map(value => {
                if (value.status.toLowerCase() === type) {
                  return <Device key={value.id} device={value} organizationId={organizationId} />;
                }
              })
          : null}
      </Box>
    </Box>
  );
};
