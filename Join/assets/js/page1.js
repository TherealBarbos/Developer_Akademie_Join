/**
 * this function creates the animation of the app
 */
function transition() {
    setTimeout(() => {
        document.getElementById('logo-white').classList.add('page1-img1-transition')
    }, 1000);
    setTimeout(() => {
        document.getElementById('logo-dark').classList.add('page1-img2-transition')
    }, 1000);
    setTimeout(() => {
        location.assign('login.html');
    }, 3000);
}