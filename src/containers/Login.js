import './login.css';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Container, Grid, Form, Button, Header, Segment} from 'semantic-ui-react'

import {dispatch$} from '../actions/dispatch';
import {USER_LOGIN} from '../actions/user'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.userCreds = {
            username: '',
            password: ''
        }
    }

    login(event) {
        event.preventDefault();
        dispatch$.next({
            type: USER_LOGIN,
            payload: {username: this.userCreds.username, password: this.userCreds.password}
        });
    }

    render() {
        return (
            <Container text >
                <Grid centered columns={1} className="app-login">
                    <Grid.Column>
                        <Segment.Group>
                            <Segment>
                                <Header>Login
                                    <Button
                                        as={Link}
                                        to="/register"
                                        floated={'right'}>Register
                                    </Button>
                                </Header>
                            </Segment>
                            <Segment>
                            <Form onSubmit={(event) => {
                                this.login(event)
                            }}>
                                <Form.Field>
                                    <label>Username</label>
                                    <input type="text" onChange={(event) => {
                                        this.userCreds.username = event.target.value
                                    }}/>
                                </Form.Field>
                                <Form.Field>
                                    <br />
                                    <label>Password</label>
                                    <input type="password" onChange={(event) => {
                                        this.userCreds.password = event.target.value
                                    }}/>
                                </Form.Field>
                                <Button type="submit">Login</Button>
                            </Form>
                            </Segment>
                        </Segment.Group>

                    </Grid.Column>
                </Grid>
            </Container>
        )
    }

}

export default Login;