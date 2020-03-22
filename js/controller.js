if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
};

const currentPage = window.location.href.split(/(consciousjudaism.com\/)/).pop();
const pageArray = [];

class Page {
    constructor(_obj) {
        this.name = _obj.name;
        this.render = _obj.render;
        if (_obj.pushState) { this.pushState = _obj.pushState } else { this.pushState = _obj.name };
        const newObj = { name: _obj.name, page: this }
        pageArray.push(newObj)
    }
    setPage() {
        htmlElements.stylesheet.href = `css/${this.name}.css`;
        history.pushState(null, null, '/' + this.pushState);
        this.render();
    }
}

const homePage = new Page({
    name: 'home',
    pushState: ' ',
    render: function () {
        homePageElement.createElement();
        observerElements.activate();
    }
});

const audioPage = new Page({
    name: 'audio',
    render: async function () {
        htmlElements.stylesheet.href = "css/audio.css";
        history.pushState(null, null, 'audio');
        playerElement.createElement();
        if (dtList.data) {
            await audioSections.createElement();
            Track.renderList();
        } else {
            let url = "https://conscious-j.herokuapp.com/recording/";
            const data = await getData(url, "GET")
            await audioSections.createElement();
            await storedAudioData.getData();
            dtList.createElement(data.filter(item => item.series === 'dt').sort((a, b) => a.number > b.number ? 1 : -1));
            dmeList.createElement(data.filter(item => item.series === 'dme').sort((a, b) => a.number > b.number ? 1 : -1));
            cinList.createElement(data.filter(item => item.series === 'cin').sort((a, b) => a.number > b.number ? 1 : -1));
            await hebList.createElement(data.filter(item => item.series === 'heb').sort((a, b) => a.number > b.number ? 1 : -1));
            storedAudioData.setNowPlaying();
        }
    }
});

const inspirationPage = new Page({
    name: 'inspiration',
    render: function () {
        htmlElements.stylesheet.href = "css/under-const.css";
        history.pushState(null, null, 'inspiration');
        underConstPage.createElement();
        observerElements.activate();
    },
});

let currentPageObj = [];
currentPageObj = pageArray.filter(page => page.name === currentPage);
if (currentPageObj.length === 0) currentPageObj.push(pageArray[0])

function setPage(newPage) {
    if (newPage) currentPageObj = pageArray.filter(page => page.name === newPage)
    htmlElements.container.innerHTML = "";
    currentPageObj[0].page.setPage();
}
currentPageObj[0].page.setPage();