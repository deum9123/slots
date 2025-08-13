import {store} from '../../../../../../gamesLib/store';

let loadingCounter = 0;

const createLink = (src, img) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);

    img.style.display = 'none';
    document.body.appendChild(img);
};

export const loadStartImage = () => {
    return new Promise((res) => {
        const imageList = [];
        const imagePromises = [];
        imageList.forEach((imgName) => {
            const img = new Image();
            imagePromises.push(
                import(
                    /* webpackPreload: true */
                    `../../img/${imgName}`
                )
                    .then((src) => {
                        img.onload = () => {
                            loadingCounter += 1;
                            const loadingProgress = Math.floor(
                                (loadingCounter / imageList.length) * 100,
                            );
                            store.set({
                                loadingProgress,
                            });
                            createLink(src.default, img);
                        };
                        img.src = src.default;
                    })
                    .catch((err) => {
                        console.error(err);
                    }),
            );
        });
        Promise.allSettled(imagePromises).then(() => {
            store.set({isGameReady: true});
            res();
        });
    });
};
