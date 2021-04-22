// import qs from 'qs';
// import TokenService from './TokenService';
// import defaultErrorResp from '../defaultErrorResp'

const CONTENT_TYPE_JSON = 'application/json';

const {
    REACT_APP_AUTH_CLIENT_ID: CLIENT_ID,
    REACT_APP_AUTH_URL: AUTH_URL,
} = process.env;

function sleep(ms = 500) {
    return new Promise((resolve) => {
        return setTimeout(resolve, ms);
    });
}

export function prepareQueryString(params) {
    const updParams = Object.keys(params)
        .filter(key => params[key] !== null)
        .reduce((acc, cur) => ({...acc, [cur]: params[cur]}), {});

    return qs.stringify(updParams, {encode: false, arrayFormat: 'brackets'});
}

export function parseQueryString(queryString) {
    return qs.parse(queryString, {ignoreQueryPrefix: true});
}

const API_PREFIX = process.env.REACT_APP_API_PREFIX || '/api/bo';

class ApiService {
    constructor(apiPrefix, ts) {
        this.apiPrefix = apiPrefix;
        this.ts = ts;
        this.updateTokenFlag = false;
    }

    getApiLink(link, params) {
        return this.apiPrefix + link + (params ? '?' + prepareQueryString(params) : '');
    }

    async call(url, method = 'GET', options = {}, params = null) {
        let auth = '';

        try {
            auth = this.ts.getAuth();
        } catch (err) {
            if (err.code === 1) {
                return this.ts.removeToken();
            }

            if (err.code === 2) {
                this.updateTokenFlag = true;
                try {
                    const data = await this.updateTokens();
                    this.ts.setTokens(data);
                    auth = this.ts.getAuth();
                    this.updateTokenFlag = false;
                } catch (e) {
                    this.updateTokenFlag = false;
                    return this.ts.removeToken();
                }
            }
        }

        const headers = options.headers || {};
        headers['X-Requested-With'] = 'XMLHttpRequest';

        if (this.ts.hasToken()) {
            headers['Authorization'] = auth;
        }

        for (let headerKey in (options.headers || {})) {
            if (options.headers.hasOwnProperty(headerKey)) {
                headers[headerKey] = options.headers[headerKey];
            }
        }

        options.headers = headers;
        options.method = method;
        options.credentials = 'include';
        options.mode = 'cors';

        // return fetch(this.getApiLink(url, params)
        return fetch(url + (params ? '?' + prepareQueryString(params) : '')
            , options)
            .then(resp => {
                let result;
                const contentType = resp.headers.get('Content-Type');

                if (contentType && contentType.includes(CONTENT_TYPE_JSON)) {
                    result = resp.json();
                } else {
                    result = resp.text();
                }
                return Promise.all([result, resp.status]);
            })
            .then(([data, status]) => {
                // if (status === 401) {
                //   this.ts.removeToken();
                // }
                if (status >= 500 || [400, 401, 402, 403, 404].includes(status)) {
                    return Promise.reject(data.error || data || defaultErrorResp[`${status}`]);
                }

                if (data.error) {
                    return Promise.reject(data.error);
                }

                return (typeof data.data === 'undefined') ? data : data.data;
            });
    }

    async get(url, params = null, options = {}) {
        if (this.updateTokenFlag) {
            await sleep(500);
            return await this.get(url, params, options);
        }
        return this.call(url, 'GET', options, params);
    }

    async post(url, data = null, options = {}) {
        if (this.updateTokenFlag) {
            await sleep(500);
            return await this.post(url, data, options);
        }

        if (data) {
            options.body = JSON.stringify(data);
            options.headers = {
                'Content-Type': CONTENT_TYPE_JSON,
            };
        }

        return this.call(url, 'POST', options);
    }

    async put(url, data = null, options = {}) {
        if (this.updateTokenFlag) {
            await sleep(500);
            return await this.put(url, data, options);
        }

        if (data) {
            options.body = JSON.stringify(data);
            options.headers = {
                'Content-Type': CONTENT_TYPE_JSON,
            };
        }

        return this.call(url, 'PUT', options);
    }

    async upload(url, file, name) {
        if (this.updateTokenFlag) {
            await sleep(500);
            return await this.upload(url, file, name);
        }

        const formData = new FormData();
        formData.append(name, file);

        const options = {
            body: formData,
        };


        return this.call(url, 'POST', options);
    }

    async delete(url) {
        if (this.updateTokenFlag) {
            await sleep(500);
            return await this.delete(url);
        }

        return this.call(url, 'DELETE');
    }

    postToCognito(url, data = null) {
        const options = {};
        if (data) {
            options.body = qs.stringify(data);
        }

        options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': COGNITO_AUTH,
        };
        options.method = 'POST';

        return fetch(url, options)
            .then(async (resp) => {
                try {
                    const result = await resp.json();

                    if (resp.status === 200) {
                        return result;
                    }

                    return Promise.reject(result);
                } catch (e) {
                    return Promise.reject(e);
                }
            })
    }

    updateTokens() {
        return this.postToCognito(AUTH_URL + '/oauth2/token', {
            grant_type: 'refresh_token',
            client_id: CLIENT_ID,
            refresh_token: this.ts.getRefreshToken(),
        });
    }

    async sendFormData(url, data) {
        if (this.updateTokenFlag) {
            await sleep(500);
            return await this.sendFormData(url, data);
        }

        const options = {
            headers: {
                // 'Content-type': undefined,
            },
            body: data,
        }

        return this.call(url, 'POST', options);
    }

}

export default new ApiService(API_PREFIX, TokenService);