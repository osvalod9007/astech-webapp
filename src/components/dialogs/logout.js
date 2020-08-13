import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import authContext from '../../context/auth/authContext';
import { Dialog, Button } from '@material-ui/core';
import { ReactComponent as CloseIcon } from '../../assets/img/closex.svg'

const Logout = ({ open, onClose }) => {
    const auth = useContext(authContext);
    const { logout } = auth;
    
    const handleLogout = () => {
        logout()
    }

    return (
        <Dialog open={open} onClose={onClose} className="dialog-logout">
            <div className="container-logout">
                <div className="close">
                    <CloseIcon className="icon-size" onClick={onClose} />
                </div>
                <div className="dialog-text">
                    <p>Are you sure you want to log out?</p>
                </div>
                <div className="actions-logout">
                    <Button className="yes space" onClick={handleLogout}>YES</Button>
                    <Button className="space" onClick={onClose}>NO</Button>
                </div>
            </div>
        </Dialog>
    )
}

export default Logout;