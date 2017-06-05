import { dispatch$ } from './dispatch';
import { appState } from '../stores/index';

export const ERROR = 'ERROR';

dispatch$.subscribe(action => {
    switch (action.type) {
        case ERROR:
            appState.error$.next(Object.assign({}, appState.error$.value, {error: action.payload.error}));
            break;
        default:
            appState.error$.next(Object.assign({}, appState.error$.value, {error: null}));
            break;
    }
});