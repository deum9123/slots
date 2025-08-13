import {store} from '../../../../../../gamesLib/store';
import {resolveTouchFlag} from '../resolvers';

let gameSDK = {};

export const changeWindowVisibilityWatcher = () => {
    addEventListener('visibilitychange', () => {
        store.set({windowVisible: document.visibilityState === 'visible'});
    });
};

export const resolveCurrentTime = () => {
    return gameSDK.serverTime ? gameSDK.serverTime() : Date.now();
};

export const setLibSDK = (gameSDKData) => {
    gameSDK = gameSDKData;
};

export const setMobile = () => {
    const root = document.getElementById('root');
    if (resolveTouchFlag()) {
        root.classList.add('mobileMode');
    }
};

export const doubleClickIOSFixer = () => {
    function createHandler(func, timeout) {
        let timer = null;
        let pressed = false;

        return function () {
            if (timer) {
                clearTimeout(timer);
            }

            if (pressed) {
                if (func) {
                    func.apply(this, arguments);
                }
                clear();
            } else {
                pressed = true;
                setTimeout(clear, timeout || 500);
            }
        };

        function clear() {
            timeout = null;
            pressed = false;
        }
    }

    const ignore = createHandler((e) => e.preventDefault(), 520);
    document.body.addEventListener('touchstart', ignore, {passive: false});
};

const imgBuffer = {};

export const base64ToImg = async (base64String, name) => {
    if (name && imgBuffer[name]) return imgBuffer[name];
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = `data:image/png;base64,${base64String}`;
        img.onload = () => {
            if (name) imgBuffer[name] = img;
            resolve(img);
        };
        img.onerror = (error) => {
            reject(new Error('Не удалось загрузить изображение', error));
        };
    });
};

export const floorNumber = (number, digit) => {
    return Math.floor(number * digit) / digit;
};

export function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func.apply(this, args);
    };
}
