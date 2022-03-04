import * as Msal from 'msal';

export default class AuthService {
  constructor() {
    let PROD_REDIRECT_URI = 'https://sunilbandla.github.io/vue-msal-sample/';
    let redirectUri = window.location.origin;
    // if (window.location.hostname !== '127.0.0.1') {
    //   redirectUri = PROD_REDIRECT_URI;
    // }
    this.applicationConfig = {
      // 9d86c8dc-bf7d-4573-bc3c-4df2f2c32b93
      clientID: '01d31b5c-f7c8-4c93-b2c6-089ac44ce603',
      tenantID: 'bf37f315-bac2-44a8-ae6c-2f21351d264c',
      authority: 'https://login.microsoftonline.com/bf37f315-bac2-44a8-ae6c-2f21351d264c',
      graphScopes: ['user.read']
    };
    this.app = new Msal.UserAgentApplication(
      this.applicationConfig.clientID,
      this.applicationConfig.authority,
    );
  };


  login() {
    return this.app.loginPopup(this.applicationConfig.graphScopes).then(
      idToken => {
        const user = this.app.getUser();
        if (user) {
          return user;
        } else {
          return null;
        }
      },
      () => {
        return null;
      }
    );
  };


  logout() {
    this.app.logout();
  };

  
  getToken() {
    return this.app.acquireTokenSilent(this.applicationConfig.graphScopes).then(
      accessToken => {
        return accessToken;
      },
      error => {
        return this.app
          .acquireTokenPopup(this.applicationConfig.graphScopes)
          .then(
            accessToken => {
              return accessToken;
            },
            err => {
              console.error(err);
            }
          );
      }
    );
  };
}
