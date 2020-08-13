import React from 'react';
import { Dialog, Box } from '@material-ui/core';
import { ReactComponent as CloseIcon } from '../../assets/img/closex.svg';

const ContactUs = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} className="dialog-contact-us">
      <div className="container-dialog">
        <div
          className="close"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            border: '0px'
          }}
        >
          <CloseIcon className="icon-size" onClick={onClose} />
        </div>
        <div className="title-dialog">
          <span>Contact Us</span>
          <hr />
        </div>
        <div className="info-contact">
          <span className="number-phone">1-888-486-1166</span>
          <span className="email">customerservice@astech.com</span>
          <span className="date">Monday - Friday</span>
          <span className="date">6:30 AM - 7:30PM CST</span>
          <span className="date">Saturday</span>
          <span className="date">7:00 AM - 3:00 PM CST</span>
        </div>
      </div>
    </Dialog>
  );
};

export default ContactUs;
