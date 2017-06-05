import React, { Component } from 'react';
import Board from './containers/Board';
import CreateEntry from './containers/CreateEntry';
import Users from './containers/Users';
import Profile from './containers/Profile';
import Login from './containers/Login';
import Register from './containers/Register';
import NavBar from './containers/NavBar';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import { appState } from './stores/index';
import { dispatch$ } from './actions/dispatch'
import { CHECK_FOR_TOKEN} from './actions/user';

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory();

import { Header, Container, Icon } from 'semantic-ui-react';

class Root extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        dispatch$.next({type: CHECK_FOR_TOKEN});
        this.currentUser = appState.currentUser$.subscribe(user => {
            this.setState(Object.assign({}, this.state, {token: user.token}))
        })
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Header
                        className="app-header title"
                        textAlign={'center'}>
                        <Icon name='instagram' size='massive' />
                        Instaclone
                    </Header>
                    <Container>
                        <NavBar/>
                    </Container>
                    {(this.state.token) ? <Route exact path="/" component={Board}/> : <Redirect to="/login"/> }
                    {(this.state.token) ? <Route path="/users" component={Users} /> : <Redirect to="/login"/> }
                    {(this.state.token) ? <Route path="/create" component={CreateEntry} /> : <Redirect to="/login"/> }
                    {(this.state.token) ? <Route path="/profile" component={Profile} /> : <Redirect to="/login"/> }
                    {(!this.state.token) ? <Route path="/login" component={Login} /> : <Redirect to="/"/> }
                    {(!this.state.token) ? <Route path="/register" component={Register} /> : <Redirect to="/"/> }
                </div>
            </Router>
        )
    }
}

export default Root;