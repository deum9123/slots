import {SDK_TYPES} from './constants';
import {locStore} from './locStore';

export const initSDK = {
    [SDK_TYPES.LOCAL]: () => {
        return locStore;
    },
};
