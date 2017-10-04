import React, { Component } from 'react';
import AdminLogin from './AdminLogin';


class A_Login extends Component {

    constructor(props) {
        super(props);
        this.state = {

            Username: '',
            Password: ''

        };

        this.AdminLogin = new AdminLogin();
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
        this.AdminLogin.sendData(this.state.value);
        this.props.history.push('/admin');
    }


    render() {
        return (

            <div className='a_login'>

                <h1>Registration</h1>

                <form onSubmit={this.handleSubmit.bind(this)} >
                    Username: <input type="text" value={this.state.username} onChange={e => this.setState({ Username: e.target.value})} />
                    Password: <input type="password" value={this.state.password} onChange={e => this.setState({ Password: e.target.value})} />
                    <input type="submit" />

                </form>

            </div>

        );
    }
}

export default A_Login;
