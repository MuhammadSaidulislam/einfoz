import { API } from "../config";

export const post = (url, body) => {
    const token = JSON.parse(localStorage.getItem("company") || '{}');
    const { jwt } = token;
    return fetch(`${API}${url}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: (jwt) ? `Bearer ${jwt.toString()}` : "",
        },
        body: JSON.stringify(body),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};


// GET request
export const get = (url) => {
    const jwt = JSON.parse(localStorage.getItem("company") || '{}');
    const { token } = jwt;
    return fetch(`${API}${url}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: (token) ? `Bearer ${token.toString()}` : "",
        }
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};

// PUT request
export const put = (url, body = {}) => {
    const token = JSON.parse(localStorage.getItem("company") || '{}');
    const { jwt } = token;
    return fetch(`${API}${url}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: (jwt) ? `Bearer ${jwt.toString()}` : "",
        },
        body: JSON.stringify(body),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};



// PATCH request
export const patch = (url, body = {}) => {
    const token = JSON.parse(localStorage.getItem("company") || '{}');
    const { jwt } = token;
    return fetch(`${API}${url}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: (jwt) ? `Bearer ${jwt.toString()}` : "",
        },
        body: JSON.stringify(body),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};


// DELETE request
export const del = (url, body = {}) => {
    const token = JSON.parse(localStorage.getItem("company") || '{}');
    const { jwt } = token;
    return fetch(`${API}${url}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: (jwt) ? `Bearer ${jwt.toString()}` : "",
        },
        body: JSON.stringify(body),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};

// GET JWT request
export const getJwt = (url,token) => {

    return fetch(`${API}${url}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: (token) ? `Bearer ${token.toString()}` : "",
        }
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};