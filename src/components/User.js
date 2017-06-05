import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

export const User =({user, subscribed, loggedIn, onClick}) => (
    <Segment>
        {user.username}
        {(loggedIn) ? <Button primary floated="right" onClick={onClick}>{(subscribed) ? 'Unsubscribe' : 'Subscribe'}</Button> : null }
    </Segment>
);