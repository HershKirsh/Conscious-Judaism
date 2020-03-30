if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
};

let currentPage = location.pathname.replace("/", "");
const pageArray = [];

class Page {
    constructor(_obj) {
        this.name = _obj.name;
        this.render = _obj.render;
        if (_obj.pushState) { this.pushState = _obj.pushState } else { this.pushState = _obj.name };
        if (_obj.stylesheet) this.stylesheet = _obj.stylesheet;
        const newObj = { name: _obj.name, page: this }
        pageArray.push(newObj)
    }
    setPage(noPushState) {
        this.stylesheet ? htmlElements.stylesheet.href = `css/${this.stylesheet}.css` : htmlElements.stylesheet.href = `css/${this.name}.css`;
        console.log('page set id to:' + this.name);
        if (!noPushState) history.pushState({id: this.name}, null, '/' + this.pushState);
        console.log(history.state);
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
        underConstPage.createElement();
        observerElements.activate();
    },
    stylesheet: 'under-const'
});

let currentPageObj = [];
currentPageObj = pageArray.filter(page => page.name === currentPage);
if (currentPageObj.length === 0) currentPageObj.push(pageArray[0])

function setPage(newPage) {
    if (newPage) currentPageObj = pageArray.filter(page => page.name === newPage);
    htmlElements.container.innerHTML = "";
    currentPageObj[0].page.setPage();
}

window.addEventListener("popstate", function (e) {
    //const currentPage = window.location.pathname.replace("/", "");
    currentPage = e.state.id;
    console.log(currentPage);
    currentPageObj = pageArray.filter(page => page.name === currentPage);
    htmlElements.container.innerHTML = "";
    currentPageObj[0].page.setPage(true);
})

currentPageObj[0].page.setPage();