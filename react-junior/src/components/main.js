import React, { Component } from 'react';
//import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import A_Login from './a_login';
import A_Main from './a_main';
import A_Register from './a_register';

class Main extends Component {

    render() {
        return (

            <main>

                <Router>
                    <Route exact path="/" component={Home} />
                </Router>

                <Router>
                    <Route exact path="/admin" component={A_Login} />
                </Router>

                <Router>
                    <Route exact path="/admin/main" component={A_Main} />
                </Router>

                <Router>
                    <Route exact path="/admin/register" component={A_Register} />
                </Router>



            </main>

        );
    }
}

export default Main;
