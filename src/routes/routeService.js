import React, { useEffect, useContext } from 'react'
import authContext from '../context/auth/authContext';

const withRouteService = WrapperComponent => ({match}) => {
    const { login, getUserAuthenticated, accessToken } = useContext(authContext);
  
    useEffect(() => {
      if (window.location.href.includes("?")) {
        login(window.location.href);
      } 
    }, [login, getUserAuthenticated]);

    useEffect(() => {
      if(accessToken) {
        getUserAuthenticated()
      }
      }, [accessToken, getUserAuthenticated]);
    
    return <WrapperComponent match={match} />
}

export default withRouteService;