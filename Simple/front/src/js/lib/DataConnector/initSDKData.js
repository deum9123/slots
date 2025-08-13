import {SDK_TYPES} from './constants';
import {locStore} from './locStore';

export const initSDKData = {
    [SDK_TYPES.YANDEX]: (player) => {
        return player.getData().then((data) => {
            return data;
        });
    },
    [SDK_TYPES.GAMEPUSH]: async (player) => {
        const data = player.toJSON();
        const res = transformData(data);
        return res;
    },
    [SDK_TYPES.LOCAL]: () => {
        return locStore.getAll();
    },
};

const transformData = (data) => {
    for (let key in data) {
        try {
            data[key] = JSON.parse(data[key]);
        } catch {
            /* empty */
        }
    }
    return data;
};
