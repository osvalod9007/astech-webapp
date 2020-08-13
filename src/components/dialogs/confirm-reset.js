import React from 'react';
import { Dialog, Box, Button } from '@material-ui/core';

export const ConfirmReset = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} className="dialog-confirm">
            <div className="container-dialog">
                <div className="title-dialog">
                    <span>Thank you an email with instructions was</span>
                    <span>sent to the email provided</span>
                </div>
                <div className="hint">
                    <span>This may take a few minutes</span>
                </div>
                <div className="continue-btn">
                    <Button variant="contained" color="primary" className="custom-send" onClick={onClose}>Continue</Button>
                </div>
            </div>
        </Dialog>
    )
}



