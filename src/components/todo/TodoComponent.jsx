import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";
import TodoDataService from "./TodoDataService";

class TodoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD'),
            isDone: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUser()
        if (this.state.id === "-1") {
            return
        }
        TodoDataService.retrieveTodo(username, this.state.id).then(response => {
            this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
                isDone: response.data.isDone
            })
        })
    }

    render() {
        let { description, targetDate, isDone } = this.state
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{ description, targetDate, isDone }} onSubmit={this.onSubmit} validate={this.validate}
                        validateOnChange={false} validateOnBlur={false} enableReinitialize={true}>
                        {(props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                <ErrorMessage name="isDone" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Is it Done?</label>
                                    <Field className="form-control" type="boolean" name="isDone"></Field>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                        }
                    </Formik>
                </div>
            </div>
        )
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUser()
        let isDoneTemp = false
        if(values.isDone === "true") {
            isDoneTemp = 1
        }
        let todo = { id: this.state.id, description: values.description, targetDate: values.targetDate, username: username,
            isDone: isDoneTemp }
        if (this.state.id === "-1") {
            TodoDataService.addTodo(username, todo).then(() => this.props.history.push('/todos'))
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo).then(
                () => this.props.history.push('/todos'))
        }
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = "Enter Description"
        } else if (values.description.length < 5) {
            errors.description = "Description should be minimum of 5 characters"
        } else if (!(values.isDone === true || values.isDone === "true" || values.isDone === false || values.isDone === "false")) {
            errors.isDone = "Enter true or false in IsDone field"
        }
        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = "Enter a Valid target date"
        }
        if (moment(values.targetDate.toString()).isBefore((moment(new Date().toString())).format('YYYY-MM-DD'))) {
            errors.targetDate = "Please enter present or future date"
        }
        return errors
    }
}

export default TodoComponent