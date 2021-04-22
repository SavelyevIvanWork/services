class TokenService {
    constructor() {
        this.token = null
        this.observers = []
    }
    subscribe(callback) {
        this.observers.push(callback);
    }
    setToken(token) {
        localStorage.setItem("Token", token);
        this.token = token;
        this.observers.forEach(item => item(this.token))
    }

    getToken() {
        return this.token
    }

    removeToken() {
        this.token = localStorage.removeItem("Token")
        this.observers.forEach(item => item(this.token));
    }
}

export default new TokenService;
