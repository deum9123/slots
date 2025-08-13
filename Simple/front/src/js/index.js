import '../css/index.css';
import {resize} from './lib/resize';
import {trans} from './lib/translator';
import {loadStartImage} from './lib/imageLoader';
import {dataConnector} from './lib/DataConnector';
import {initSDK} from './lib/initSDK';
import {setMobile} from './lib';
import {Page} from './widgets/Page/';

const initApp = async () => {
    resize();
    setMobile();
    setLoadinText();

    await loadStartImage();
};
function setLoadinText() {
    const text = document.getElementById('startloading-text');
    text.innerHTML = trans('startLoading');
}

const start = async () => {
    const sdk = await initSDK();
    setLoadinText();
    await dataConnector.setSDK({sdk, options: {queueDelay: 5000}});
    const root = document.getElementById('root');
    root.innerHTML = Page();
    setTimeout(() => {
        initApp();
    }, 0);
};

start();
