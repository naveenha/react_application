import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import LoginComponent from './LoginComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import TodoComponent from './TodoComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'

class TodoApp extends Component {
    render() {
        return (
            <div>
                <Router>
                    <HeaderComponent />
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                        <AuthenticatedRoute path="/todos" component={ListTodosComponent} />
                        <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                    <FooterComponent />
                </Router>
            </div>
        )
    }
}

// function ShowSuccess(props) {
//     if (props.loginSuccess) {
//         return <div>Login Success</div>
//     }
//     return null;
// }
// function ShowFailure(props) {
//     if (props.loginFailed) {
//         return <div>Invalid Credentials</div>
//     }
//     return null;
// }

export default TodoApp