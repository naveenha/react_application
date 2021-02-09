import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div>
                            {/* <a href="https://www.google.com/" className="navbar-brand">Todo's Management</a> */}
                            <span className="navbar-brand">Todo's Management</span>
                        </div>
                        <ul className="navbar-nav">
                            {isUserLoggedIn && <li className="nav-link"><Link to="/welcome/user">Home</Link></li>}
                            {isUserLoggedIn && <li className="nav-link"><Link to="/todos">Todos</Link></li>}
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            {!isUserLoggedIn && <li className="nav-link"><Link to="/login">Login</Link></li>}
                            {isUserLoggedIn && <li className="nav-link"><Link to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                        </ul>
                    </nav>
                </header>
            </div>
        )
    }
}

export default withRouter(HeaderComponent)