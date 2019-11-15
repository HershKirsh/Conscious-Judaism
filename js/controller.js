//var currentPage = /[^#]*$/.exec(window.location.href)[0];
var currentPage = "audio"
var pageArray = ["home", "about", "audio", "video", "contact"];
var renderPage = [
    function renderHome() {
        console.log("rendered Home");
    },
    function renderAbout() {
    },
    function renderAudio() {
        let url = "https://conscious-j.herokuapp.com/recording/";
        getData(url, "get");
    },
    function renderVideo() {
        console.log("rendered Video");
    },
    function renderContact() {
        console.log("rendered Contact");
    }
];

renderPage[pageArray.indexOf(currentPage)] ? renderPage[pageArray.indexOf(currentPage)]() : renderPage[0]();

appendHtml = (data) => {
    audioSections.create(data)
};

handleData = (data) => {
    prepareLists(data);
};

appendLists = (list, num) => {
    audioListItems.appendList(list, num);
};

function downloadRec(i) {
    let path = audioListItems.recordingList[i].audioLink;
    let url = "https://conscious-j.herokuapp.com/recording/download?" + path;
    getData(url, "get");
}