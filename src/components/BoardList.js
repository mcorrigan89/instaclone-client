import React from 'react';

import { EntryCard } from './EntryCard';

export const BoardList = ({filter, entries, vote}) => (
  <ul>
      {entries.map(entry => {
          if (entry.type === filter) {
              return <EntryCard key={entry.id} entry={entry} vote={vote}/>
          }
          return null;
      })}
  </ul>
);