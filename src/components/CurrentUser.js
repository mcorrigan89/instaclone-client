import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

export const CurrentUser = ({user}) => (
    <Segment>
        <Header>{user.username}</Header>
    </Segment>
);

