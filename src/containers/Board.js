import React, {Component} from 'react';
import {Menu, Container, Grid, Header, Segment} from 'semantic-ui-react';

import {appState} from '../stores/index';

import {dispatch$} from '../actions/dispatch';
import {GET_SUBSCRIBED, VOTE, UNVOTE} from '../actions/board';
import {BoardList} from '../components/BoardList';

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.board = appState.board$.subscribe(entries => {
            this.setState(Object.assign({}, this.state, entries));
        });

        this.setState(Object.assign({}, this.state, {sorted: 'newest'}));

        this.currentUser = appState.currentUser$.subscribe(user => {
            this.setState(Object.assign({}, this.state, user));
            if (user.token) {
                this.getSubscribed();
            }
        });
    }

    componentWillUnmount() {
        this.board.unsubscribe();
        this.currentUser.unsubscribe()
    }

    getSubscribed() {
        dispatch$.next({type: GET_SUBSCRIBED});
    }

    sortTop() {
        this.state.entries.sort((a, b) => {
            return b.votes - a.votes;
        });
        this.setState(Object.assign({}, this.state, {entries: this.state.entries, sorted: 'top'}));
    }

    sortOldest() {
        this.state.entries.sort((a, b) => {
            return new Date(a.createdDate) - new Date(b.createdDate);
        });
        this.setState(Object.assign({}, this.state, {entries: this.state.entries, sorted: 'oldest'}));
    }

    sortNewset() {
        this.state.entries.sort((a, b) => {
            return new Date(b.createdDate) - new Date(a.createdDate);
        });
        this.setState(Object.assign({}, this.state, {entries: this.state.entries, sorted: 'newest'}));
    }

    vote(entryId, voted) {
        if (voted) {
            dispatch$.next({type: UNVOTE, payload: entryId});
        } else {
            dispatch$.next({type: VOTE, payload: entryId});
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Grid centered className="app-login">
                        <Menu secondary>
                            <Menu.Item
                                name='top'
                                active={this.state.sorted === 'top'}
                                onClick={() => {this.sortTop();}}/>
                            <Menu.Item
                                name='newest'
                                active={this.state.sorted === 'newest'}
                                onClick={() => {this.sortNewset();}}/>
                            <Menu.Item
                                name='oldest'
                                active={this.state.sorted === 'oldest'}
                                onClick={() => {this.sortOldest();}}/>
                        </Menu>
                    </Grid>
                    <Grid centered columns={1}></Grid>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Segment.Group>
                                <Header as='h2' attached='top' textAlign="center">Sweet pics!</Header>
                                <Segment>
                                    {(this.state.entries) ?
                                        <BoardList entries={this.state.entries} vote={this.vote} /> : null }
                                    {(this.state.error) ? <p>{this.state.error}</p> : null }
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>
                    </Grid>
                    <Grid centered columns={1}></Grid>
                </Container>
            </div>
        )
    }
}

export default Board;