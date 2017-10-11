import React, { Component } from 'react';
import axios from 'axios';




class A_Register extends Component {

    constructor(props) {
        super(props);
        this.state = {

            username: '',
            email: '',
            password: '',
            rePassword: '',
            isAdmin: false,
            errors : []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({errors: []});

        axios.post('http://localhost:3003/api/auth/register',
            this.state
        )
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response.data);
                    this.setState({errors: error.response.data.error});

            });

        this.props.history.push('/admin/register');

        console.log(this.state);
    };

    render() {

         let lis = [];
        if(this.state.errors.length > 0) {
            console.log(this.state.errors);
            this.state.errors.map(err => lis.push(<li key={err}>{err}</li>) )
        }
        return (

            <div className='a_register'>

                <h1>Registration</h1>

                <form onSubmit={this.handleSubmit.bind(this)} >

                    Username: <input type="text" value={this.state.username} onChange={e => this.setState({ username: e.target.value})} />
                    Email:<input type="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value})} />
                    Password: <input type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value})} />
                    Repeat Password: <input type="password" value={this.state.rePassword} onChange={e => this.setState({ rePassword: e.target.value})} />
                    <input type="submit" />

                </form>


                <div className='Errors'>
                    {lis}
                    <br/>

                </div>


            </div>


        );
    }
}
export default A_Register;
