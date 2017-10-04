import React, { Component } from 'react';
import AddUser from './AddUser';


class A_Register extends Component {

    constructor(props) {
        super(props);
        this.state = {

            Username: '',
            Email: '',
            Password: '',
            rePassword: '',
            isAdmin: false
        };

        this.AddUser = new AddUser();
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
        this.AddUser.sendData(this.state.value);
        this.props.history.push('/admin/register');
    }


    render() {
        return (

            <div className='a_register'>

                <h1>Registration</h1>

                <form onSubmit={this.handleSubmit.bind(this)} >
                    Username: <input type="text" value={this.state.username} onChange={e => this.setState({ Username: e.target.value})} />
                    Email:<input type="email" value={this.state.email} onChange={e => this.setState({ Email: e.target.value})} />
                    Password: <input type="password" value={this.state.password} onChange={e => this.setState({ Password: e.target.value})} />
                    Repeat Password: <input type="password" value={this.state.rePassword} onChange={e => this.setState({ rePassword: e.target.value})} />
                    <input type="submit" />

                </form>

            </div>

        );
    }
}

export default A_Register;
