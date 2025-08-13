import {SDK_TYPES} from './constants';

export const send = {
    [SDK_TYPES.YANDEX]: async (sdk, state) => {
        await sdk.setData(state).then(() => {});
    },
    [SDK_TYPES.GAMEPUSH]: async (player, state) => {
        let res = {};
        for (let key in state) {
            res[key] = typeof state[key] === 'object' ? JSON.stringify(state[key]) : state[key];
        }
        player.fromJSON(res);
        await player.sync({override: true, storage: 'cloud'});
    },
    [SDK_TYPES.LOCAL]: (sdk, state) => {
        return sdk.setData(state);
    },
};
