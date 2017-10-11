import React, { Component } from 'react';
import axios from 'axios';
import Auth from './../modules/Auth';


class A_Login extends Component {

    constructor(props) {
        super(props);
        this.state = {

            username: '',
            password: ''

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();

        axios.post('http://localhost:3003/api/auth/login',
           this.state
        )
            .then(response => {
                console.log(response);
                Auth.Authenticate(response.data.token);
                this.props.history.push('/admin');
            })
            .catch(error => {
               console.log(error.response);
                //this.setState({errors: error.response.data.error});
            });
        this.props.history.push('/admin/login');
    }



    render() {
        return (

            <div className='a_login'>

                <h1>Login</h1>

                <form onSubmit={this.handleSubmit.bind(this)} >
                    Username: <input type="text" value={this.state.username} onChange={e => this.setState({ username: e.target.value})} />
                    Password: <input type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value})} />
                    <input type="submit" />

                </form>

            </div>

        );
    }
}

export default A_Login;
