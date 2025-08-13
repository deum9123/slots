/**
 * Интерфейс для работы с localStorage
 */
export const locStore = {
    getData(item) {
        return JSON.parse(localStorage.getItem(item));
    },
    setData(state) {
        for (let key in state) {
            if (state[key] != undefined) {
                localStorage.setItem(key, JSON.stringify(state[key]));
            }
        }
    },
    getAll() {
        const res = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            res[key] = locStore.getData(key);
        }

        return res;
    },
};
