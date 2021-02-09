import axios from "axios"
import { API_URL, JPA_API_URL } from "../../Constants"

class TodoDataService {
    retireveAllTodos(username) {
        return axios.get(`${JPA_API_URL}/users/${username}/todos`)
    }

    deleteTodo(username, id) {
        return axios.delete(`${JPA_API_URL}/users/${username}/todos/${id}`)
    }

    retrieveTodo(username, id) {
        return axios.get(`${JPA_API_URL}/users/${username}/todos/${id}`)
    }

    updateTodo(username, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${username}/todos/${id}`, todo)
    }

    addTodo(username, todo) {
        return axios.post(`${JPA_API_URL}/users/${username}/todos`, todo)
    }
}

export default new TodoDataService()