import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Label, Image, Statistic, Button } from 'semantic-ui-react';
import moment from 'moment';
import { api } from '../actions/dispatch'

export const EntryCard = ({entry, vote}) => (
    <Card fluid centered={true}>
        <Card.Content>
            <Statistic floated='right' size='mini' label={(entry.votes !== 1) ? 'Votes' : 'Vote' } value={entry.votes} />
            <Card.Header>
                {entry.description}
            </Card.Header>
            {(entry.imageUrl) ? <Image src={(api + '/uploads/' + entry.imageUrl)} /> : null }
            <Card.Meta>
                <span className='date'>
                    {moment(entry.createdDate).format('LL')}
                </span>
            </Card.Meta>
            <Card.Description>
                <Label as={Link} to="/">{entry.owner.username}</Label>
                <Button
                    onClick={(event) => {event.preventDefault(); console.log(event.isDefaultPrevented()); vote(entry.id, entry.userVotes)}}
                    floated="right"
                    content={(entry.userVotes) ? 'Liked': 'Like'}
                    icon='heart'
                    color={(entry.userVotes) ? 'red': 'instagram'}
                    label={{ as: 'a', basic: true, pointing: 'right', content: entry.votes }}
                    labelPosition='left'
                />
            </Card.Description>
        </Card.Content>
    </Card>
);