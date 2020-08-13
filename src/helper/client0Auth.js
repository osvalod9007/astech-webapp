import ClientOAuth2 from 'client-oauth2';

export const astechAuth = () => {
    return new ClientOAuth2({
        clientId: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET,
        authorizationUri: process.env.REACT_APP_AUTHORIZATION_URI,
        accessTokenUri: process.env.REACT_APP_ACCESS_TOKEN_URI,
        redirectUri: process.env.REACT_APP_REDIRECT_URI,
        scopes: ['write']
    });
}