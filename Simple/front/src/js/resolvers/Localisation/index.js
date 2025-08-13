export const resolveLocalisations = async (lang) => {
    const res = await import(
        /* webpackPreload: true */
        `./${lang}`
    ).then((langObj) => {
        return langObj.default;
    });
    return res;
};
