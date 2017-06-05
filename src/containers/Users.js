import React, { Component } from 'react';
import { Container, Grid, Segment, Input } from 'semantic-ui-react';

import { User } from '../components/User';
import { appState } from '../stores/index';
import { dispatch$ } from '../actions/dispatch';
import { GET_ALL_USERS, SUBSCRIBE, UNSUBSCRIBE } from '../actions/user';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.users = appState.users$.subscribe(users => {
            this.setState(Object.assign({}, this.state, users));
        });
        this.currentUser = appState.currentUser$.subscribe(user => {
            this.setState(Object.assign({}, this.state, user));
        });
        dispatch$.next({type: GET_ALL_USERS});
    }

    componentWillUnmount() {
        this.users.unsubscribe();
        this.currentUser.unsubscribe();
    }

    stringMatch(str1, str2) {
        let arr1 = str1.split('');
        let arr2 = str2.split('');
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    subscribe(user, subscribed) {
        if (subscribed) {
            dispatch$.next({type: UNSUBSCRIBE, payload: user.id});
        } else {
            dispatch$.next({type: SUBSCRIBE, payload: user.id});
        }
    }

    userList() {
        return this.state.users.map(user => {
            let subscribed = false;
            if (user.id !== this.state.user.id) {
                if (this.state.user.subscribed) {
                    subscribed = (this.state.user.subscribed.indexOf(user.id) > -1);
                }
                if (!this.state.search) {
                    return <User key={user.id} user={user} loggedIn={(this.state.user.subscribed)}
                                 subscribed={subscribed} onClick={() => {
                        this.subscribe(user, subscribed)
                    }}/>
                } else if (this.stringMatch(this.state.search, user.username)) {
                    return <User key={user.id} user={user} loggedIn={(this.state.user.subscribed)}
                                 subscribed={subscribed} onClick={() => {
                        this.subscribe(user, subscribed)
                    }}/>
                }
            }
            return null;
        });
    }

    userSearch(event) {
        this.setState(Object.assign({}, this.state, {search: event.target.value}));
    }

    render() {
        return (
            <div>
                <Container>
                    <Grid centered>
                        <Grid.Row stretched>
                            <Grid.Column width={3}>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Segment>
                                    <Input placeholder='Search...' onChange={(event) => {this.userSearch(event)}} />
                                </Segment>
                                { (this.state.users) ? this.userList() : null }
                            </Grid.Column>
                            <Grid.Column width={3}>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default Users;