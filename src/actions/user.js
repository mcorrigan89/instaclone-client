import axios from 'axios';
import { dispatch$, api } from './dispatch';
import { appState } from '../stores/index';

export const CHECK_FOR_TOKEN = 'CHECK_FOR_TOKEN';
export const REGISTER = 'REGISTER';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const GET_ME = 'GET_ME';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const SUBSCRIBE = 'SUBSCRIBE';
export const UNSUBSCRIBE = 'UNSUBSCRIBE';

import { CLEAR_BOARD } from './board';

// const api = 'https://api.board.sourgrapes.io';
// const api = 'http://instaclone-env.us-west-2.elasticbeanstalk.com';


const login = (username, password) => {
    return axios.post(`${api}/api/identity/authorize`, {username, password})
};

const register = (username, password) => {
    return axios.post(`${api}/api/identity/register`, {username, password})
};

const getUsers = () => {
    return axios.get(`${api}/api/identity/user`);
};

const getMe = () => {
    let token = '';
    appState.currentUser$.subscribe(user => {
        token = user.token;
    });
    return axios.get(`${api}/api/identity/me`, {
        headers: {
            'x-access-token': token
        }
    });
};

const subscribe = (userId) => {
    let token = '';
    appState.currentUser$.subscribe(user => {
        token = user.token;
    });
    return axios.post(`${api}/api/identity/user/${userId}/subscribe`, null, {
        headers: {
            'x-access-token': token
        }
    });
};

const unsubscribe = (userId) => {
    let token = '';
    appState.currentUser$.subscribe(user => {
        token = user.token;
    });
    return axios.post(`${api}/api/identity/user/${userId}/unsubscribe`, null, {
        headers: {
            'x-access-token': token
        }
    });
};

dispatch$.subscribe(action => {
    switch (action.type) {
        case REGISTER:
            register(action.payload.username, action.payload.password)
                .then(res => {
                    localStorage.setItem('token', res.data.token);
                    appState.currentUser$.next(Object.assign({}, appState.currentUser$.value, {token: res.data.token}));
                    dispatch$.next({type: GET_ME});
                });
            break;
        case USER_LOGIN:
            login(action.payload.username, action.payload.password)
                .then(res => {
                    localStorage.setItem('token', res.data.token);
                    appState.currentUser$.next(Object.assign({}, appState.currentUser$.value, {token: res.data.token}));
                    dispatch$.next({type: GET_ME});
                });
            break;
        case USER_LOGOUT:
            localStorage.removeItem('token');
            appState.currentUser$.next(Object.assign({}, appState.currentUser$.value, {token: '', user: {}}));
            dispatch$.next({type: CLEAR_BOARD});
            break;
        case CHECK_FOR_TOKEN:
            let token = localStorage.getItem('token');
            appState.currentUser$.next(Object.assign({}, appState.currentUser$.value, {token}));
            if (token) {
                dispatch$.next({type: GET_ME});
            }
            break;
        case GET_ME:
            getMe()
                .then(res => {
                    appState.currentUser$.next(Object.assign({}, appState.currentUser$.value, {user: res.data.user}));
                })
                .catch((err) => {
                    dispatch$.next({type: USER_LOGOUT});
                });
            break;
        case GET_ALL_USERS:
            getUsers()
                .then(res => {
                    appState.users$.next(Object.assign({}, appState.users$.value, {users: res.data.users}));
                });
            break;
        case SUBSCRIBE:
            subscribe(action.payload)
                .then(message => {
                    console.log(message);
                    dispatch$.next({type: GET_ME});
                });
            break;
        case UNSUBSCRIBE:
            unsubscribe(action.payload)
                .then(message => {
                    console.log(message);
                    dispatch$.next({type: GET_ME});
                });
            break;
        default:
            break;
    }
});