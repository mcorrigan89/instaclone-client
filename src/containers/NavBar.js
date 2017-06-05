import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

import {appState} from '../stores/index';
import {dispatch$} from '../actions/dispatch'
import {USER_LOGOUT} from '../actions/user';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.currentUser = appState.currentUser$.subscribe(user => {
            this.setState(Object.assign({}, this.state, {token: user.token}))
        })
    }

    render() {
        return (
            <Menu>
                {(this.state.token) ?
                <Menu.Item
                    as={NavLink}
                    exact to="/"
                    name='board'
                    content='Board'
                />: null }
                {(this.state.token) ?
                <Menu.Item
                    as={NavLink}
                    exact to="/users"
                    name='users'
                    content='Users'
                /> : null }
                {(this.state.token) ?
                    <Menu.Item
                        as={NavLink}
                        exact to="/create"
                        name='create'
                        content='Upload Image'
                    /> : null }
                <Menu.Menu position={'right'}>
                    {(this.state.token) ?
                        <Menu.Item
                            as={NavLink}
                            to="/profile"
                            name="profile"
                            content="Profile"
                        /> : null}
                    {(!this.state.token) ?
                        <Menu.Item
                            as={NavLink}
                            to="/login"
                            name='login'
                            content='Login'
                        /> :
                        <Menu.Item
                            onClick={() => {
                                dispatch$.next({type: USER_LOGOUT})
                            }}
                            name='logout'
                            content='Logout'
                        />}
                </Menu.Menu>
            </Menu>
        )
    }
}

export default NavBar;
