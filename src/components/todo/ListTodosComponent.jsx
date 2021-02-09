import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService'
import TodoDataService from './TodoDataService'
import moment from 'moment'

class ListTodosComponent extends Component {
    constructor(props) {
        // console.log('constructor')
        super(props)
        this.state = {
            todos: [],
            // { id: 1, description: 'Learn React', done: false, targetDate: new Date() },
            // { id: 2, description: 'Learn Spring Boot', done: false, targetDate: new Date() },
            // { id: 3, description: 'Learn Angular', done: false, targetDate: new Date() }
            message: null
        }
        this.deleteClicked = this.deleteClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateClicked = this.updateClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    componentDidMount() {
        this.refreshTodos()
    }

    refreshTodos() {
        TodoDataService.retireveAllTodos(AuthenticationService.getLoggedInUser())
            .then(response => { this.setState({ todos: response.data }) })
    }

    componentWillUnmount() {
        // console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('shouldComponentUpdated')
        // console.log('nextProps')
        // console.log('nextState')
        return true
    }

    render() {
        // console.log('render')
        return (
            <div className="container">
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Completed?</th>
                            <th>Target Date</th>
                            <th>Update Action</th>
                            <th>Delete Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(todo =>
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td><button className="btn btn-success" onClick={() => this.updateClicked(todo.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={() => this.deleteClicked(todo.id)}>Delete</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                </div>
            </div>
        )
    }

    deleteClicked(id) {
        let username = AuthenticationService.getLoggedInUser()
        TodoDataService.deleteTodo(username, id).then(response => { this.setState({ message: `Deletion of ${id} id successful` })
        this.refreshTodos()
     })  
    }

    updateClicked(id) {
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked() {
        this.props.history.push(`/todos/-1`)
    }
}

export default ListTodosComponent