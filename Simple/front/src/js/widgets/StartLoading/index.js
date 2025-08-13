import View from './view';
import {store} from '../../../../../../../gamesLib/store';

const progressBar = document.getElementById('startloading-background');

const setProgress = (loadingProgress) => {
    progressBar.style.left = -(100 - loadingProgress) + '%';
};

const setGameReady = () => {
    const wrapper = document.getElementById('startloading-wrapper');
    wrapper.style.display = 'none';
};

store.addListener('loadingProgress', setProgress);
store.addListener('isGameReady', setGameReady);

export const StartLoading = View;
