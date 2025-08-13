import {initSDK} from './initSDK';
import {initSDKData} from './initSDKData';
import {send} from './send';

class DataConnector {
    allowSendFlag = false;
    queueDelay = 10000;
    connects = {};

    constructor() {
        this.state = {};
    }

    setSDK = async ({sdk, options = {queueDelay: 10000}}) => {
        this.sdkType = sdk.sdkType;
        this.sdk = await initSDK[this.sdkType](sdk);
        this.state = await initSDKData[this.sdkType](this.sdk);
        this.options = options;
        this.queueDelay = options.queueDelay;
        this.initSendQueue();
    };

    get = (prop) => {
        if (!this.state[prop]) return;
        return JSON.parse(JSON.stringify(this.state[prop]));
    };

    set = (props, options = {force: false}) => {
        for (let prop in props) {
            this.state[prop] = props[prop];
        }

        if (options.force) {
            this.send(this.state);
        }

        this.setToSendQueue();
    };

    setToSendQueue = () => {
        this.allowSendFlag = true;
    };

    send = async (state) => {
        if (!this.sdk || !this.allowSendFlag) return;
        await send[this.sdkType](this.sdk, state);
        this.allowSendFlag = false;
    };

    initSendQueue = () => {
        if (this.allowSendFlag === 0) return;
        setInterval(() => {
            this.send(this.state);
        }, this.queueDelay);
    };
    connect = (store, prop, initVal) => {
        this.connects[prop] = (val) => {
            this.set({[prop]: val});
        };

        store.set({[prop]: this.state[prop] || initVal});
        store.addListener(prop, this.connects[prop]);
    };
}

export const dataConnector = new DataConnector();
