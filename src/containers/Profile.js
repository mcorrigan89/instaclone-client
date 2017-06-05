import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { CurrentUser } from '../components/CurrentUser';

import { appState } from '../stores/index'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.currentUser = appState.currentUser$.subscribe(user => {
            this.setState(Object.assign({}, this.state, user));
        });
    }

    componentWillUnmount() {
        this.currentUser.unsubscribe();
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
                                {(this.state.user) ? <CurrentUser user={this.state.user}/> : null }
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

export default Profile;