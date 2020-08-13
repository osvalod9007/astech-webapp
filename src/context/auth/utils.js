import { astechAuth } from "../../helper/client0Auth";
import queryString from "querystring";

export const getLogoutUrl = () => {
  const { options } = astechAuth();

  const qs = {
    client_id: options.clientId,
    redirect_uri: options.redirectUri,
    scope: options.scopes.join(","),
    response_type: "code",
    state: options.state,
  };

  const urlBase = process.env.REACT_APP_URL_API +
  "logout/?next=/" + process.env.REACT_APP_AUTHORIZATION_URI.split(
    process.env.REACT_APP_URL_API
  )[1];

  return urlBase + encodeURIComponent(`?${queryString.encode(qs)}`)
};
