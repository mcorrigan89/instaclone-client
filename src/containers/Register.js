import './login.css';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Container, Grid, Form, Button, Header, Segment} from 'semantic-ui-react'

import { appState } from '../stores/index';
import {dispatch$} from '../actions/dispatch';
import { REGISTER } from '../actions/user';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null
        };
    }

    register(event) {
        event.preventDefault();
        dispatch$.next({
            type: REGISTER,
            payload: {username: this.state.username, password: this.state.password}
        });
    }

    componentDidMount() {
        this.error = appState.error$.subscribe(error => {
            this.setState(Object.assign({}, this.state, {error: error.error}))
        })
    }

    componentWillUnmount() {
        this.error.unsubscribe();
    }

    render() {
        return (
            <Container text >
                <Grid centered columns={1} className="app-login">
                    <Grid.Column>
                        <Segment.Group>
                            <Segment>
                                <Header>Register
                                    <Button
                                        basic
                                        as={Link}
                                        to="/login"
                                        floated={'right'}>Login
                                    </Button>
                                </Header>
                            </Segment>
                            <Segment>
                                <Form onSubmit={(event) => {
                                    this.register(event)
                                }}>
                                    <Form.Field>
                                        <label>Username</label>
                                        <input type="text" onChange={(event) => {
                                            this.setState(Object.assign({}, this.state, { username: event.target.value}));
                                        }}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <br />
                                        <label>Password</label>
                                        <input type="password" onChange={(event) => {
                                            this.setState(Object.assign({}, this.state, {password: event.target.value}));
                                        }}/>
                                    </Form.Field>
                                    <Button
                                        disabled={(this.state.username === '') || (this.state.password === '')}
                                        type="submit"
                                        color='teal'>Register</Button>
                                </Form>
                            </Segment>
                        </Segment.Group>
                        {(this.state.error) ? <Segment inverted color='red'>
                                {this.state.error}
                            </Segment> : null}

                    </Grid.Column>
                </Grid>
            </Container>
        )
    }

}

export default Register;