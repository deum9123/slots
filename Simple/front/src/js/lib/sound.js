import {store} from '.././../../../../../gamesLib/store';
import {STATES} from '../constants';

const musicPath = 'music.mp3';
const clickPath = 'click.mp3';

const AUDIO_TYPES = {
    SOUND: 'sound',
    MUSIC: 'music',
};

export const SOUNDS = {
    CLICK: 'click',
    WIN: 'win',
    LOOSE: 'loose',
};

let musicItem, clickItem;

export const playSound = (soundType) => {
    const {sound} = store.getState();
    if (sound === STATES.OFF) return false;
    soundsFns[soundType](AUDIO_TYPES.SOUND);
};

const soundsFns = {
    [SOUNDS.CLICK]: () => {
        const promise = clickItem.playSound({loop: false});
        promise.then(() => {}).catch(() => {});
    },
};

const playMusic = async () => {
    const {music} = store.getState();
    if (!musicItem) return false;
    if (music === 'on') {
        const promise = musicItem.playMusic({loop: true});
        promise.then(() => {}).catch(() => {});
    } else {
        musicItem.pause();
    }

    return '';
};

export const musicInit = async () => {
    if (musicItem) return false;
    musicItem = await new Sound(musicPath);
    await musicItem.loadAudio({gain: -0.85});
    const promise = musicItem.playMusic({loop: true});
    await promise.then(() => {}).catch(() => {});
    playMusic();

    const musicHTML = document.getElementById('music');
    const soundHTML = document.getElementById('sounds');

    musicHTML.classList.remove('d-none');
    soundHTML.classList.remove('d-none');
    return '';
};

export const soundInit = async () => {
    if (clickItem) return false;
    clickItem = await new Sound(clickPath);
    await clickItem.loadAudio({gain: 1});
    playSound(SOUNDS.CLICK);
    window.clickItem = clickItem;
    return '';
};

export class Sound {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioBuffer; // Для хранения загруженного аудиофайла
    sourceNode; // Для аудиопотока
    startTime; // Время начала воспроизведения
    pausedTime; // Время приостановки
    url;
    gainNode;
    constructor(url) {
        this.url = url;
    }
    loadAudio = async ({gain}) => {
        const src = await import(`../../audio/${this.url}`);
        const response = await fetch(src.default);
        const data = await response.arrayBuffer();
        this.audioBuffer = await this.audioContext.decodeAudioData(data);
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = gain;
    };
    playSound = async () => {
        if (this.audioBuffer) {
            this.sourceNode = this.audioContext.createBufferSource();
            this.sourceNode.buffer = this.audioBuffer;

            this.sourceNode.connect(this.gainNode);
            this.gainNode.connect(this.audioContext.destination);

            this.sourceNode.start();
            this.sourceNode.onended = () => {
                this.sourceNode = null;
            };
        }
    };
    playMusic = async ({loop}) => {
        if (this.pausedTime) {
            await this.audioContext.resume(); // Возобновляем контекст аудио
            return false;
        }
        if (this.audioBuffer) {
            // Создаем новый AudioBufferSourceNode для воспроизведения
            this.sourceNode = this.audioContext.createBufferSource();
            this.sourceNode.buffer = this.audioBuffer;

            // Подключаем sourceNode к gainNode, а затем gainNode к destination
            this.sourceNode.connect(this.gainNode);
            this.sourceNode.connect(this.audioContext.destination);
            this.gainNode.connect(this.audioContext.destination);

            // Устанавливаем время начала воспроизведения
            this.startTime = this.audioContext.currentTime;

            this.sourceNode.loop = loop;

            // Если было приостановлено, устанавливаем стартовое время
            if (this.pausedTime) {
                this.startTime += this.audioContext.currentTime - this.pausedTime;
            }
            this.sourceNode.start(0, this.startTime);
            this.sourceNode.onended = () => {
                this.pausedTime = null; // Сброс времени при окончании воспроизведения
            };
        }
    };
    pause = () => {
        if (this.audioContext.state === 'running') {
            this.audioContext.suspend(); // Приостанавливаем контекст аудио
            this.pausedTime = this.audioContext.currentTime; // Запоминаем время приостановки
        }
    };
    changeVolume = (volume) => {
        this.gainNode.gain.value = volume;
    };
}

store.addListener('music', playMusic);
