import Rx from 'rxjs/Rx';

let board = {
    entries: [],
    error: ''
};

let users = {
    users: []
};

let currentUser = {
    token: '',
    user: {}
};

let error = {
    error: null
};

export const board$ = new Rx.BehaviorSubject(board);
export const users$ = new Rx.BehaviorSubject(users);
export const currentUser$ = new Rx.BehaviorSubject(currentUser);
export const error$ = new Rx.BehaviorSubject(error);