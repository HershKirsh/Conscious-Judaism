if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
};

const currentPage = window.location.href.split(/(consciousjudaism.com\/)/).pop();
const pageArray = ["home", "about", "audio", "inspiration", "connect"];
let pageNum = pageArray.indexOf(currentPage);
if (pageNum === -1) pageNum = 0;

function setPage(page) {
    if (page) pageNum = pageArray.indexOf(page);
    htmlElements.container.innerHTML = "";
    renderPage[pageNum]();
}

const renderPage = [
    function home() {
        htmlElements.stylesheet.href = "css/home.css";
        history.pushState(null, null, '/');
        homePage.createElement();
        observerElements.activate();
    },
    function about() {
    },
    async function audio() {
        htmlElements.stylesheet.href = "css/audio.css";
        history.pushState(null, null, 'audio');
        if (dtList.data) {
            Track.instanceArray = [];
            await audioSections.createElement();
            dtList.createElement()
            dmeList.createElement()
            cinList.createElement()
            hebList.createElement()
        } else {
            let url = "https://conscious-j.herokuapp.com/recording/";
            const data = await getData(url, "GET")
            await audioSections.createElement();
            dtList.createElement(data.filter(item => item.series === 'dt').sort((a, b) => a.number > b.number ? 1 : -1));
            dmeList.createElement(data.filter(item => item.series === 'dme').sort((a, b) => a.number > b.number ? 1 : -1));
            cinList.createElement(data.filter(item => item.series === 'cin').sort((a, b) => a.number > b.number ? 1 : -1));
            hebList.createElement(data.filter(item => item.series === 'heb').sort((a, b) => a.number > b.number ? 1 : -1));
        }
        playerElement.createElement();
    },
    function inspiration() {
        htmlElements.stylesheet.href = "css/under-const.css";
        history.pushState(null, null, 'inspiration');
        underConstPage.createElement();
        observerElements.activate();
    },
    function connect() {
        htmlElements.stylesheet.href = "css/under-const.css";
        history.pushState(null, null, 'connect');
        underConstPage.createElement();
        observerElements.activate();
    }
];

renderPage[pageNum]();