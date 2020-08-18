import axios from 'axios';

import * as actionTypes from './actionsTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = (error) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWjyfWNVe7Wvb8PcqAbepLGAa-71lu8Z0';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWjyfWNVe7Wvb8PcqAbepLGAa-71lu8Z0';
        }
        axios.post(url, authData)
            .then(success => {
                const expDate = new Date(new Date().getTime() + (success.data.expiresIn * 1000));
                localStorage.setItem('token', success.data.idToken);
                localStorage.setItem('expirationDate', expDate);
                localStorage.setItem('userId', success.data.localId)
                dispatch(authSuccess(success.data.idToken, success.data.localId));
                dispatch(checkAuthTimeout(success.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token)
            dispatch(logout());
        else {
            const expirationTime = new Date(localStorage.getItem('expirationDate'));
            if (expirationTime < new Date())
                dispatch(logout());

            else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime())/1000));
            }
        }
    }
}