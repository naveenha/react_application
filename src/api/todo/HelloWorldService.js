import axios from "axios"
import { API_URL } from "../../Constants"

class HelloWorldComponent {
    executeHello() {
        return axios.get(`${API_URL}/hello-world`)
    }

    executeHelloWorldBean() {
        return axios.get(`${API_URL}/hello-world-bean`)
    }

    executeHelloWorldPathVariable(name) {
        return axios.get(`${API_URL}/hello-world/path-variable/${name}`)
    }
}

export default new HelloWorldComponent()