var currentPage = /[^#]*$/.exec(window.location.href)[0];
//const currentPage = "home"
const pageArray = ["home", "about", "audio", "video", "connect"];
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
        homePage.createElement();
    },
    function about() {
        console.log("rendered About");
    },
    async function audio() {
        htmlElements.stylesheet.href = "css/audio.css"
        if (dtList.data) {
            await audioSections.createElement();
            dtList.createElement()
            dmeList.createElement()
            cinList.createElement()
            hebList.createElement()
        } else {
            let url = "https://conscious-j.herokuapp.com/recording/";
            const data = await getData(url, "GET")
            await audioSections.createElement();
            dtList.createElement(data.filter(item => item.series == 'dt').sort((a, b) => a.number > b.number ? 1 : -1));
            dmeList.createElement(data.filter(item => item.series == 'dme').sort((a, b) => a.number > b.number ? 1 : -1));
            cinList.createElement(data.filter(item => item.series == 'cin').sort((a, b) => a.number > b.number ? 1 : -1));
            hebList.createElement(data.filter(item => item.series == 'heb').sort((a, b) => a.number > b.number ? 1 : -1));
        }
        playerElement.createElement();
    },
    function video() {
        console.log("rendered Video");
    },
    function connect() {
        console.log("rendered Connect");
    }
];

renderPage[pageNum]();

const appendLists = (list, num) => {
    audioListItems.createElement(list, num);
};