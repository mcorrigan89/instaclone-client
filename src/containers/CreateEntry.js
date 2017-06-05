import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import FileInput from 'react-file-input';
import axios from 'axios';

import {Container, Grid, Form, Dropdown,  Button, Header, Segment} from 'semantic-ui-react'

import {dispatch$} from '../actions/dispatch';
import {CREATE_ENTRY} from '../actions/board';

const options = [
    { key: 'choose', text: 'Is this the Best or the Worst?', value: 'CHOOSE' },
    { key: 'best', text: 'Best', value: 'BEST' },
    { key: 'worst', text: 'Worst', value: 'WORST' },
];

class CreateEntry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            file: {},
            submitted: false,
            uploaded: false
        };
    }

    create = (event) => {
        event.preventDefault();
        let newEntry = {description: this.state.description, file: this.state.file};
        dispatch$.next({type: CREATE_ENTRY, payload: newEntry});
        this.setState(Object.assign({}, this.state, {submitted: true}))
    };

    handleChange = (event) => {
        // console.log('Selected file:', event.target.files[0]);
        let file = event.target.files[0];
        console.log(file)
        this.setState(Object.assign({}, this.state, {file}), () => {
            this.setState(Object.assign({}, this.state, {uploaded: true}));
        });
    };

    render() {
        if (this.state.submitted) {
            return <Redirect to="/" />
        }
        return (
            <Container text>
                <Grid centered columns={1} className="app-login">
                    <Grid.Column>
                        <Segment.Group>
                            <Segment>
                                <Header>Upload Image</Header>
                            </Segment>
                            <Segment>
                                <Form onSubmit={(event) => {
                                    this.create(event)
                                }}>
                                    <Form.Field>
                                        <label>Description</label>
                                        <input type="text" onChange={(event) => {
                                            this.setState(Object.assign({}, this.state, {description: event.target.value}))
                                        }}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <FileInput name="image"
                                                   accept=".png,.gif,.jpg,.jpeg"
                                                   placeholder="My Image"
                                                   className="file"
                                                   onChange={this.handleChange} />
                                    </Form.Field>
                                    <Button type="submit" disabled={(!this.state.description)}>Create</Button>
                                </Form>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default CreateEntry;