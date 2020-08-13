import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Toolbar, IconButton, TextField, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import { ReactComponent as AstechLogo } from '../../assets/img/logowhite.svg';
// impot icons
import { ReactComponent as LockUi } from '../../assets/img/elements_ui/lock.svg';
import { emptyString, validateEmail } from '../../helper/validators';
import {ConfirmReset} from '../dialogs/confirm-reset';

const useStyles = makeStyles((theme) => ({
    root: {

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 300,
        },
    },
    appBar: {
        backgroundColor: '#11537f',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
}));
export default function ForgotPassword() {
    const classes = useStyles();
    const [email, setEmail] = React.useState({
        email: '',
        message: '',
        validate: false
    });
    const [open, setOpen] = React.useState(false);

    // open dialog success
    const dialogSuccess = () => {
        setOpen(!open);
    }

    // save data in state
    const onChange = (e) => {
        setEmail({ ...email, email: e.target.value });
    }
    // send email
    const onClick = (e) => {
        if(!emptyString(email.email)) {
            setEmail({...email, validate: true, message: 'Please enter Email.'});
        } else if(!validateEmail(email.email)) {
            setEmail({...email, validate: true, message: 'Please enter a valid Email.'});
        } else {
            setEmail({...email, validate: false, message: ''});
            dialogSuccess();
        }
    }
    return (
        <div className={'forgot-password'}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classes.appBar}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        className={clsx(classes.menuButton)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <AstechLogo width={100} height={60} />
                </Toolbar>
            </AppBar>
            <main
            >
                <div className={`${classes.drawerHeader} main`} />
                <div className="container-forgot">
                    <div className="align-center">
                        <h1>Recovery Password</h1>
                        <hr />

                        <div className="center-info">
                            <LockUi className="space" />
                            <h2>Forgot Password?</h2>
                            <p className="hint">Enter your email and we will send you</p>
                            <p className="hint">a reset link to create a new password</p>

                            <form className={classes.root} noValidate autoComplete="off">
                                <div>
                                    <TextField
                                        error={email.validate}
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        helperText={email.message}
                                        onChange={onChange}
                                    />
                                </div>

                            </form>
                            <Button variant="contained" color="primary" className="custom-send" onClick={onClick}>Send</Button>
                        </div>
                    </div>
                </div>
            </main>
            <ConfirmReset open={open} onClose={dialogSuccess}/>
        </div>
    );
}