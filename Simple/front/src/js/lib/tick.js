import {store} from './../../../../../../gamesLib/store';

let isPause = false;

export const tick = {
    start: () => {
        setInterval(() => {
            if (!isPause) store.set({tick});
        }, 1000);
    },
    pause: () => {
        isPause = true;
    },
    unPause: () => {
        isPause = false;
    },
};
