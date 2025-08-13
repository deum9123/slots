const resizeWindow = (event) => {
    const width = 1920;
    const height = 1080;

    const ratio = width / height;
    const innerWidth = event.target.innerWidth;
    const innerHeight = event.target.innerHeight;
    const currentRatio = innerWidth / innerHeight;

    const newRatioWidth = innerWidth / width;
    const newRatioHeight = innerHeight / height;
    const newRatio = currentRatio > ratio ? newRatioHeight : newRatioWidth;

    const game = document.getElementById('game');

    game.style.zoom = `${newRatio}`;
};

export const resize = () => {
    resizeWindow({target: {innerWidth: window.innerWidth, innerHeight: window.innerHeight}});
    window.addEventListener('resize', resizeWindow);
};
