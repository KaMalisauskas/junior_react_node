import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './home';
import A_Login from './a_login';
import A_Main from './a_main';
import A_Register from './a_register';
import Auth from './../modules/Auth';


class Main extends Component {


    render() {
        const token = localStorage.getItem('jwtToken');
        console.log(Auth.isAuth(token));

        return (

            <main>

                <Switch>

                    <Route exact path="/" component={Home} />

                    <Route exact path="/admin/login" component={A_Login} />

                    <Route exact path="/admin" render={() =>(
                        Auth.isAuth(token) ? ( <Route  component={A_Main} />)
                            : ( <Redirect to='/admin/login' push />)
                    )} />

                    <Route exact path="/admin/register" render={() =>(
                        Auth.isAuth(token) ? ( <Route  component={A_Register} />)
                            : ( <Redirect to='/admin/login' push />)
                    )} />


                </Switch>


            </main>

        );
    }
}

export default Main;
