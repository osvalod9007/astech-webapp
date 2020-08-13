import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Box,
  ListItem,
  List,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { ContactUs, AboutUs, PrivacyPolicy, Logout } from '../dialogs';
// import svgs
import { ReactComponent as InformationIcon } from '../../assets/img/icons_menu/information_white.svg';
import { ReactComponent as ServiceIcon } from '../../assets/img/icons_menu/services_icon.svg';
import { ReactComponent as ShopIcon } from '../../assets/img/icons_menu/shops_icon.svg';

import { ReactComponent as CloudIcon } from '../../assets/img/icons_menu/cloud_white.svg';
import { ReactComponent as MobileIcon } from '../../assets/img/icons_menu/mobile_service_white.svg';
import { ReactComponent as KeyIcon } from '../../assets/img/icons_menu/keys_white.svg';

import { ReactComponent as BookIcon } from '../../assets/img/icons_menu/icon_book.svg';
import { ReactComponent as PrivacyIcon } from '../../assets/img/icons_menu/privacy_policy_icon.svg';
import { ReactComponent as AstechIcon } from '../../assets/img/icons_menu/icon_astech.svg';
import { ReactComponent as PhoneIcon } from '../../assets/img/icons_menu/icon_phone.svg';
import { ReactComponent as LogoutIcon } from '../../assets/img/icons_menu/logout.svg';

// import context
import deviceContext from '../../context/device/deviceContext';

const Accordion = withStyles({
  root: {
    backgroundColor: '#266CB2',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const CustomizedAccordions = ({ organizations }) => {
  const { getDevices } = useContext(deviceContext);

  const [expanded, setExpanded] = React.useState();
  const [dialog, setDialog] = React.useState({
    logout: false,
    aboutUs: false,
    contactUs: false,
    privacyPolicy: false,
  });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClick = (dialog) => (event) => {
    //setDialog(true);
    if (dialog === 'contact') {
      setDialog({ ...dialog, contactUs: true });
    } else if (dialog === 'privacy') {
      setDialog({ ...dialog, privacyPolicy: true });
    } else if (dialog === 'about') {
      setDialog({ ...dialog, aboutUs: true });
    } else {
      setDialog({ ...dialog, logout: true });
    }
  };

  const handleClose = (dialog) => (event) => {
    //setDialog(false);
    if (dialog === 'contact') {
      setDialog({ ...dialog, contactUs: false });
    } else if (dialog === 'privacy') {
      setDialog({ ...dialog, privacyPolicy: false });
    } else if (dialog === 'about') {
      setDialog({ ...dialog, aboutUs: false });
    } else {
      setDialog({ ...dialog, logout: false });
    }
  };

  const handleClickOrganization = (id) => (event) => {
    getDevices(id);
  };

  return (
    <div className='custom-list'>
      {organizations.length > 0 ? (
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <div
            className='container-expantion'
            style={{
              width: '90%',
              color: 'white',
              backgroundColor: expanded === 'panel1' ? '#11537f' : '',
              borderRadius: '0 25px 25px 0',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
              aria-controls='panel1d-content'
              id='panel1d-header'
            >
              <Box display='flex' className='center-content-menu'>
                <ShopIcon className='size-icon' />
                <div>Related Shops</div>
              </Box>
            </AccordionSummary>
          </div>
          <AccordionDetails style={{ padding: 0 }}>
            <List>
              {organizations.map((value) => {
                return (
                  <ListItem
                    button
                    key={value.id}
                    onClick={handleClickOrganization(value.id)}
                  >
                    <ListItemIcon></ListItemIcon>
                    <ListItemText className='text-white'>
                      {value.name}
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      ) : null}

      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <div
          className='container-expantion'
          style={{
            width: '90%',
            color: 'white',
            backgroundColor: expanded === 'panel2' ? '#11537f' : '',
            borderRadius: '0 25px 25px 0',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
            aria-controls='panel1d-content'
            id='panel1d-header'
          >
            <Box display='flex' className='center-content-menu'>
              <ServiceIcon className='size-icon' />
              <div>Services</div>
            </Box>
          </AccordionSummary>
        </div>
        <AccordionDetails style={{ padding: 0 }}>
          <List style={{ width: '100%' }}>
            <ListItem button className='list-item'>
              <ListItemIcon className='container-icon'>
                <CloudIcon className='size-icon' className='size-icon' />{' '}
              </ListItemIcon>
              <ListItemText className='text-white'>
                Remote Diagnostics
              </ListItemText>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <div
          className='container-expantion'
          style={{
            width: '90%',
            color: 'white',
            backgroundColor: expanded === 'panel3' ? '#11537f' : '',
            borderRadius: '0 25px 25px 0',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
            aria-controls='panel1d-content'
            id='panel1d-header'
          >
            <Box display='flex' className='center-content-menu'>
              <InformationIcon className='size-icon' />
              <div>More Options</div>
            </Box>
          </AccordionSummary>
        </div>
        <AccordionDetails style={{ padding: 0 }}>
          <List style={{ width: '100%' }}>
            <ListItem button className='list-item'>
              <ListItemIcon className='container-icon'>
                <BookIcon className='size-icon' className='size-icon' />{' '}
              </ListItemIcon>
              <ListItemText className='text-white'>User Guides</ListItemText>
            </ListItem>
            <ListItem
              button
              className='list-item'
              onClick={handleClick('privacy')}
            >
              <ListItemIcon className='container-icon'>
                <PrivacyIcon className='size-icon' className='size-icon' />{' '}
              </ListItemIcon>
              <ListItemText className='text-white'>Privacy Policy</ListItemText>
            </ListItem>
            <ListItem
              button
              className='list-item'
              onClick={handleClick('about')}
            >
              <ListItemIcon className='container-icon'>
                <AstechIcon className='size-icon' className='size-icon' />{' '}
              </ListItemIcon>
              <ListItemText className='text-white'>About Us</ListItemText>
            </ListItem>
            <ListItem
              button
              className='list-item'
              onClick={handleClick('contact')}
            >
              <ListItemIcon className='container-icon'>
                <PhoneIcon className='size-icon' className='size-icon' />{' '}
              </ListItemIcon>
              <ListItemText className='text-white'>Contact Us</ListItemText>
            </ListItem>
            <ListItem
              button
              className='list-item'
              onClick={handleClick('logout')}
            >
              <ListItemIcon className='container-icon'>
                <LogoutIcon className='size-icon' />
              </ListItemIcon>
              <ListItemText className='text-white'>Logout</ListItemText>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Import Dialogs 
            
            
        */}
      <ContactUs open={dialog.contactUs} onClose={handleClose('contact')} />
      <AboutUs open={dialog.aboutUs} onClose={handleClose('about')} />
      <PrivacyPolicy
        open={dialog.privacyPolicy}
        onClose={handleClose('privacy')}
      />
      <Logout open={dialog.logout} onClose={handleClose('logout')} />
    </div>
  );
};

export default CustomizedAccordions;
