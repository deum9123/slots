import {setSDKLang} from '../lib/translator';
import {store} from '../../../../../../gamesLib/store';
import {STATES} from '../constants/index';
import {SDK_TYPES} from './DataConnector/constants';

const SDK = SDK_TYPES.LOCAL;

let isMusic;
let isSound;

export const initSDK = async () => {
    return await SDKLoader[SDK]();
};

const SDKLoader = {
    [SDK_TYPES.LOCAL]: async () => {
        await setSDKLang('ru');

        return {
            sdkType: SDK_TYPES.LOCAL,
        };
    },
};

export const setSDKPause = () => {
    isMusic = store.get('music');
    isSound = store.get('sound');

    store.set({music: STATES.OFF, sound: STATES.OFF, isGamePause: true});
};

export const setSDKResume = () => {
    store.set({music: isMusic, sound: isSound, isGamePause: false});
};
