import axios from 'axios';

import { dispatch$ } from './dispatch';
import { appState } from '../stores/index';

export const CLEAR_BOARD = 'CLEAR_BOARD';
export const GET_BOARD = 'GET_BOARD';
export const GET_SUBSCRIBED = 'GET_SUBSCRIBED';
export const CREATE_ENTRY = 'CREATE_ENTRY';
export const VOTE = 'VOTE';
export const UNVOTE = 'UNVOTE';

// const api = 'https://api.board.sourgrapes.io';
export const api = 'instaclone-env.us-west-2.elasticbeanstalk.com';

let getEntires = () => {
    return axios.get(`${api}/api/board/entry`)
};

let getSubscribed = () => {
    let token = '';
    appState.currentUser$.subscribe(user => {
        token = user.token;
    });
    return axios.get(`${api}/api/board/subscribed`, {
        headers: {
            'x-access-token': token
        }
    })

};


let imageUpload = (token ,description, file) => {
    let formData = new FormData();
    formData.append('description', description);
    formData.append('image', file);
    const config = {
        headers: { 'content-type': 'multipart/form-data', 'x-access-token': token }
    };
    const url = `${api}/api/board/entry/`;
    return axios.post(url, formData, config);
};

let createEntry = (description, file) => {
    let token = '';
    appState.currentUser$.subscribe(user => {
        token = user.token;
    });
    return imageUpload(token, description, file);
};


let voteEntry = (entryId) => {
    let token = '';
    appState.currentUser$.subscribe(user => {
        token = user.token;
    });
    return axios.post(`${api}/api/board/entry/vote/${entryId}`, null, {
        headers: {
            'x-access-token': token
        }
    })
};

let unVoteEntry = (entryId) => {
    let token = '';
    appState.currentUser$.subscribe(user => {
        token = user.token;
    });
    return axios.delete(`${api}/api/board/entry/vote/${entryId}`, {
        headers: {
            'x-access-token': token
        }
    })
};

dispatch$.subscribe(action => {
    switch (action.type) {
        case CLEAR_BOARD:
            appState.board$.next(Object.assign({}, appState.board$.value, {entries: [], error: ''}));
            break;
        case GET_BOARD:
            getEntires()
                .then(res => {
                    let data = {};
                    if (res.data.error) {
                        data = {entries: [], error: res.data.error}
                    } else {
                        data = {entries: res.data.entries, error: ''}
                    }
                    appState.board$.next(Object.assign({}, appState.board$.value, data));
                })
                .catch(err => {
                    appState.board$.next(Object.assign({}, appState.board$.value, {entries: [], error: err}));
                });
            break;
        case GET_SUBSCRIBED:
            getSubscribed()
                .then(res => {
                    let data = {};
                    if (res.data.error) {
                        data = {entries: [], error: res.data.error}
                    } else {
                        data = {entries: res.data.entries, error: ''}
                    }
                    appState.board$.next(Object.assign({}, appState.board$.value, data));
                })
                .catch(err => {
                    appState.board$.next(Object.assign({}, appState.board$.value, {entries: [], error: err}));
                });
            break;
        case CREATE_ENTRY:
            createEntry(action.payload.description, action.payload.file)
                .then(res => {
                    dispatch$.next({type: GET_SUBSCRIBED});
                });
            break;
        case VOTE:
            voteEntry(action.payload)
                .then(res => {
                    dispatch$.next({type: GET_SUBSCRIBED});
                });
            break;
        case UNVOTE:
            unVoteEntry(action.payload)
                .then(res => {
                    dispatch$.next({type: GET_SUBSCRIBED});
                });
            break;
        default:
            break;
    }
});