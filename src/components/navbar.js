import React, { Component } from 'react';
import Auth from './../modules/Auth';



class Navbar extends Component {

    render() {
        return (

            <div className='navbar'>
                <h1>Welcome to Admin Main mister: </h1>
                <a href=''>Registration</a>
                <a href="/" onClick={ () => Auth.deAuthenticate()}>Logout</a>
            </div>
        );
    }
}

export default Navbar;
