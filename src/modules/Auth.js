class Auth {


    static isAuth(token) {

        if (token) {
            return true
        } else {
            return false;
        }

    }

    static Authenticate(token) {
        localStorage.setItem('jwtToken', token);
    }

    static deAuthenticate() {
        localStorage.clear();
    }
}
export default Auth;