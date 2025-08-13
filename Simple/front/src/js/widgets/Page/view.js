import './index.css';
import {StartLoading} from '../StartLoading';
import {SOUNDS, playSound} from '../../lib/sound';

document.addEventListener('click', () => {
    playSound(SOUNDS.CLICK);
});

const View = () => {
    return `
    <!-- Виджет Page -->
        <div id="game" class="game">
            ${StartLoading()}
        </div>
    <!-- End Виджет Menu -->
    `;
};

export default View;
