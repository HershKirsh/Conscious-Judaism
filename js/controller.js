//var currentPage = /[^#]*$/.exec(window.location.href)[0];
const currentPage = "audio"
const pageArray = ["home", "about", "audio", "video", "connect"];
let pageNum = pageArray.indexOf(currentPage);
if (pageNum === -1) pageNum = 0;

function setPage(page) {
    if (page) pageNum = pageArray.indexOf(page);
    htmlElements.container.innerHTML = "";
    getPageData[pageNum]();
}

const getPageData = [
    function home() {
        console.log("rendered Home");
    },
    function about() {
        console.log("rendered About");
    },
    function audio() {
        let url = "https://conscious-j.herokuapp.com/recording/";
        getData(url, "GET")
    },
    function video() {
        console.log("rendered Video");
    },
    function connect() {
        console.log("rendered Connect");
    }
];


const renderPage = [
    function renderHome() {
        console.log("rendered Home");
    },
    function renderAbout() {
        console.log("rendered About");
    },
    function renderAudio(data) {
        appendHtml(data);
    },
    function renderVideo() {
        console.log("rendered Video");
    },
    function renderConnect() {
        console.log("rendered Contact");
    }
];

getPageData[pageNum]();

const appendHtml = (data) => {
    audioSections.create(data)
    playerElement.create();
};

const handleData = (data) => {
    prepareLists(data);
};

const appendLists = (list, num) => {
    audioListItems.appendList(list, num);
};

// function downloadRec(i) {
//     let path = audioListItems.recordingList[i].audioLink;
//     let url = "https://conscious-j.herokuapp.com/recording/download?" + path;
//     getData(url, "get");
// }