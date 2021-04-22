import TokenService from './TokenService'

class ApiService {
    constructor(TokenService) {
        this.TokenService = TokenService
    }

    call = (url, method = '', customConfig = {}) => {
        const auth = this.TokenService.getToken();
        const config = {
            method,
            headers: customConfig.headers || {},
            body: customConfig.body,
        }

        if (auth) {
            config.headers.Authorization = auth
        }

        return fetch(url, config)
            .then(response => {
                let result
                const contentType = response.headers.get('Content-Type')

                if (contentType && contentType.includes('application/json')) {
                    result = response.json()
                } else {
                    result = response.text()
                }
                return Promise.all([result, response.status, response.ok]);
            })
            .then(([data, status, ok]) => {
                if (ok) {
                    return data
                }
                if (status >= 500 || [400, 401, 402, 404].includes(status)) {
                    return Promise.reject(data || status)
                }
                if (status === 403) {
                    this.TokenService.removeToken()
                    return Promise.reject(data)
                } else {
                    return Promise.reject(data)
                }
            })

    }

    get = (url, customConfig = {}) => {
        customConfig.headers = {'Content-Type': 'application/json'}
        return this.call(url, 'GET', customConfig);
    }

    post = (url, data = null, customConfig = {}) => {
        if (data) {
            customConfig.body = JSON.stringify(data)
            customConfig.headers = {'Content-Type': 'application/json'}
        }
        return this.call(url, 'POST', customConfig)
    }

    put = (url, data = null, customConfig = {}) => {
        if (data) {
            customConfig.body = JSON.stringify(data)
            customConfig.headers = {'Content-Type': 'application/json'}
        }
        return this.call(url, 'PUT', customConfig)
    }

    delete = (url) => {
        return this.call(url, 'DELETE')
    }
}

export default new ApiService(TokenService)