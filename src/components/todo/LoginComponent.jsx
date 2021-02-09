import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loginSuccess: false,
            loginFailed: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }
    render() {
        return (
            <div>
                <h1>Login!</h1>
                <div className="container">
                    {/* <ShowSuccess loginSuccess={this.state.loginSuccess} /> */}
                    {/* <ShowFailure loginFailed={this.state.loginFailed} /> */}
                    {this.state.loginSuccess && <div>Login Success!</div>}
                    {this.state.loginFailed && <div className="alert alert-warning">Login Failed!</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} /> <br /> <br />
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /> <br /> <br />
                    <button onClick={this.loginClicked} className="btn btn-success">Login</button>
                </div>
            </div>
        )
    }
    handleChange(event) {
        // console.log(this.state)
        this.setState(
            { [event.target.name]: event.target.value }
        )
    }
    loginClicked() {
        let username = this.state.username
        let password = this.state.password
        // AuthenticationService.executeBasicAuthService(username, password).then(
        //     () => {
        //         AuthenticationService.successLogin(username, password)
        //         this.props.history.push(`/welcome/${username}`);
        //     }
        // ).catch(
        //     () => {
        //         this.setState({ loginSuccess: false })
        //         this.setState({ loginFailed: true })
        //     }
        // )

        AuthenticationService.executeJwtAuthService(username, password).then(
            (response) => {
                AuthenticationService.successLoginForJwt(username, response.data.token)
                this.props.history.push(`/welcome/${username}`);
            }
        ).catch(
            () => {
                this.setState({ loginSuccess: false })
                this.setState({ loginFailed: true })
            }
        )
    }
}

export default LoginComponent