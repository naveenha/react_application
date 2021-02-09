import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService'

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            welcomeMessage: ''
        }
        this.retrieveMessage = this.retrieveMessage.bind(this)
        this.handleSuccessResponse = this.handleSuccessResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }
    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <br /><br />
                <div className="container">
                    Welcome to React page <span className="thick">{this.props.match.params.name}</span>. You can manage your Todos <Link to="/todos">here</Link>
                </div>
                <br />
                <div>
                    Get Welcome message from Spring boot API <span><button onClick={this.retrieveMessage} className="btn btn-success">Get Welcome</button></span>
                </div>
                <br />
                <div className="container">
                    <span className="thick">{this.state.welcomeMessage}</span>
                </div>
            </div>
        )
    }

    retrieveMessage() {
        // HelloWorldService.executeHello().then(response => this.handleSuccessResponse(response))
        // HelloWorldService.executeHelloWorldBean().then(response => this.handleSuccessResponse(response))
        HelloWorldService.executeHelloWorldPathVariable(this.props.match.params.name)
            .then(response => this.handleSuccessResponse(response)).catch(error => this.handleError(error))
    }

    handleSuccessResponse(response) {
        // this.setState({welcomeMessage: response.data})
        this.setState({ welcomeMessage: response.data.message })
    }

    handleError(error) {
        let errorMessage = ''
        if(error.message) {
            errorMessage += error.message
        }
        if(error.response && error.response.data) {
            errorMessage += error.response.data.message
        }
        this.setState({ welcomeMessage: errorMessage })
    }
}

export default WelcomeComponent