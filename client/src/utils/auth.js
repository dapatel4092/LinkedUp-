// Authentication funcitons for use with checking user state and validation
import decode from 'jwt-decode';

//Creating a new class
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // method that will check a user's logged in status
  loggedIn() {
    //Check to see if there is a vafid token
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  //Check to see if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }
  //function to retrieve token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  //function to save user token to local storage
  //Will also redirect the user to the homepage upon completion
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  //remove user data from local storage
  logout() {
    localStorage.removeItem('id_token');
    //once again redirect user to home page
    window.location.assign('/');
  }
}

export default new AuthService();
