import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { ReactComponent as StartInactiveIcon } from '../../../assets/img/elements_ui/start_inactive.svg';
import { ReactComponent as StartActiveIcon } from '../../../assets/img/elements_ui/start_active.svg';
import { ReactComponent as ScanIcon } from '../../../assets/img/elements_ui/scan_history_active.svg';
import { ReactComponent as AddIcon } from '../../../assets/img/elements_ui/add_green.svg';

// import context
import deviceContext from '../../../context/device/deviceContext';

const useStyles = makeStyles(theme => ({
  marginAutoContainer: {
    textAlign: 'center',
    marginRight: '10px',
    cursor: 'pointer'
  },
  label: {
    flexDirection: 'column',
    color: 'green'
  }
}));

const Device = ({ device, organizationId }) => {
  const classes = useStyles();
  const { setFavoriteDevice } = useContext(deviceContext);

  const handleClickFavorite = () => {
    setFavoriteDevice(organizationId, device.id);
  };

  return device !== null ? (
    device.status.toLowerCase() !== 'offline' ? (
      <div className="list-card">
        <div className="card-device">
          <div className="type-card">
            {device.favorite ? (
              <StartActiveIcon
                className="icon-header-card"
                style={{ cursor: 'pointer' }}
                onClick={handleClickFavorite}
              />
            ) : (
              <StartInactiveIcon
                className="icon-header-card"
                style={{ cursor: 'pointer' }}
                onClick={handleClickFavorite}
              />
            )}

            <span className="status-device">{device.status}</span>
          </div>

          <div className="container-card">
            <div className="info-car">
              <div className="first-row">
                <div className="label__data">
                  <span className="block label">Device</span>
                  <span className="block value">{device.deviceSN}</span>
                </div>

                <div className="label__data">
                  <span className="block label">VIN</span>
                  <span className="block value">{device.vehicle.VIN}</span>
                </div>
              </div>
              <div className="second-row">
                <div className="label__data">
                  <span className="block label">Year/Make/Model</span>
                  <span className="block value">
                    {device.vehicle.year} {device.vehicle.make} {device.vehicle.model}
                  </span>
                </div>
              </div>
            </div>
            {device.vehicle.scanHistory ? (
              <div className="scan-history" style={{ cursor: 'pointer' }} onClick={e => console.log('Clicked')}>
                <div className="icon">
                  <ScanIcon width={40} height={40} />
                </div>
                <div>SCAN HISTORY</div>
              </div>
            ) : (
              <div className="scan-history">
                <div className="icon">
                  <ScanIcon width={40} height={40} />
                </div>
                <div>SCAN HISTORY</div>
              </div>
            )}
          </div>
        </div>

        <div className="action-button" style={{ alignSelf: 'center' }}>
          <div className={classes.marginAutoContainer} onClick={e => console.log('Clicked')}>
            <div className={classes.label}>
              <div>
                <AddIcon width={40} height={40} />
              </div>
              <div>NEW REQUEST</div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="list-card">
        <div className="card-device" style={{ borderRight: '0px' }}>
          <div className="type-card">
            <span className="status-device" style={{ color: 'gray' }}>
              {device.status}
            </span>
          </div>

          <div className="container-card">
            <div className="info-car">
              <div className="first-row">
                <div className="label__data">
                  <span className="block label">Device</span>
                  <span className="block value">{device.deviceSN}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  ) : null;
};

export default Device;
