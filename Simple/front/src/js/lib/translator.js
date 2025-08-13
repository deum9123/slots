import {store} from './../../../../../../gamesLib/store';
import {resolveLocalisations} from '../resolvers/Localisation';

let lang = 'ru';
let transDictionary = {};
/**
 * Returns a translation of the given word.
 *
 * @param {string} word the word to translate
 * @return {string} the translation of the word
 */
export const trans = (word) => {
    console.log('transDictionary =', transDictionary);
    return transDictionary[lang][word];
};

export const setSDKLang = async (lang = 'ru') => {
    console.log('setSDKLang lang =', lang);

    store.set({lang});
    transDictionary[lang] = await resolveLocalisations(lang);
};
