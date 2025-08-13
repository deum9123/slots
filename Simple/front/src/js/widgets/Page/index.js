import View from './view';
import {addListener} from '../../../../../../../gamesLib/helpers';
import {musicInit} from '../../lib/sound';

export const Page = () => {
    addListener(() => {
        const game = document.getElementById('game');
        game.addEventListener('click', startMusicByClick);

        function startMusicByClick() {
            musicInit();
            game.removeEventListener('click', startMusicByClick);
        }
    });

    return View();
};
