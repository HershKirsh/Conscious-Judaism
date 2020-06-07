if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
};

const pageSettingElements = {
    pageArray: [],
    currentPage: [],
    setPage: function (event, newPage, noPushState) {
        if (event) event.preventDefault()
        if (newPage) this.currentPage = this.pageArray.filter(page => page.name === newPage);
        if (this.currentPage < 1) this.currentPage.push(homePage);
        htmlElements.container.innerHTML = "";
        this.currentPage[0].setPage(noPushState);
        return false
    }
}

class Page {
    constructor(_obj) {
        this.name = _obj.name;
        this.render = _obj.render;
        if (_obj.pushState) { this.pushState = _obj.pushState } else { this.pushState = _obj.name };
        if (_obj.stylesheet) this.stylesheet = _obj.stylesheet;
        if (_obj.title) this.title = _obj.title;
        pageSettingElements.pageArray.push(this);
    }
    setPage(noPushState) {
        this.stylesheet ? htmlElements.stylesheet.href = `css/${this.stylesheet}.css` : htmlElements.stylesheet.href = `css/${this.name}.css`;
        if  (this.title) htmlElements.pageTitle.innerText = this.title;
        if (!noPushState) history.pushState({ id: this.name }, null, '/' + this.pushState);
        this.render();
    }
}

const homePage = new Page({
    name: 'home',
    pushState: ' ',
    title: 'Conscious Judaism - Living Spiritual Torah Judaism',
    render: function () {
        homePageElement.createElement();
        observerElements.activate();
    }
});

const audioPage = new Page({
    name: 'audio',
    title: 'Conscious Judaism - Listen to complete lectures - stream or download mp3',
    render: async function () {
        playerElement.createElement();
        if (trackList.data) {
            await audioSections.createElement();
            Track.renderList();
        } else {
            let seriesDataUrl = "https://conscious-j.herokuapp.com/playlist/";
            let trackDataUrl = "https://conscious-j.herokuapp.com/recording/";
            const seriesData = await getData(seriesDataUrl, "GET");
            const trackData = await getData(trackDataUrl, "GET");
            seriesData.forEach(ser => ser.id = ser.series);
            await audioSections.createElement(seriesData.sort((a, b) => a.number > b.number ? 1 : -1));
            await storedAudioData.getData();
            const seriesObj = {};
            seriesData.forEach(playlist => {
                seriesObj[playlist.series] = playlist.number;
            });
            await trackList.createElement(trackData.sort((a, b) => a.number > b.number ? -1 : 1).sort((a, b) => seriesObj[a.series] > seriesObj[b.series] ? 1 : -1))
            storedAudioData.setNowPlaying();
        }
    }
});

const inspirationPage = new Page({
    name: 'inspiration',
    title: 'Conscious Judaism - Inspirational quotes to enhance your experience of life',
    render: function () {
        underConstPage.createElement();
        observerElements.activate();
    },
    stylesheet: 'under-const'
});

window.addEventListener("popstate", (e) => pageSettingElements.setPage(false, e.state.id, true))
pageSettingElements.setPage(false, location.pathname.replace("/", ""));