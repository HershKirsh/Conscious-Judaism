var htmlElements = {
    container: document.getElementById('container'),
    mainMenu: document.getElementById('main-menu')
};

const createHtml = (tagName, className, idName, innerContent, insertTo) => {
    const htmlListItem = document.createElement(tagName);
    if (className) { htmlListItem.classList.add(className) };
    if (idName) { htmlListItem.id = idName };
    const textNode = (innerContent);
    htmlListItem.innerHTML = textNode;
    insertTo.insertAdjacentElement('beforeend', htmlListItem);
};
const audioSections = {
    IDs: ['DT', 'DME', 'CIN'],
    headers: ['Conscious Judaism Series', 'Conscious Chassidus Series', 'Conscious In Nature'],
    descriptions: ['Recordings on Sefer Dover Tzedek from Reb Tzodok HaCohen of Lublin',
        'Recordings on Sefer Degel Machaneh Ephraim', 'Insights conveyed while surrounded by nature'],
    create: function (data) {
        this.IDs.forEach((item, i) => {
            let innerString = `<div class="subheader-wrapper">
    <h2>${this.headers[i]}</h2>
    <h4>${this.descriptions[i]}</h4>
</div>
<button class="minimize" title="Minimize" onclick="toggleMini(this, ${i})"></button>`;
            createHtml('section', 'series', item, innerString, htmlElements.container);
        });
        htmlElements.section = document.querySelectorAll('section');
        handleData(data);
    }
};

var audioListItems = {
    recordingList: [],
    listItemNum: 0,
    appendList: function (list, num) {
        list.forEach((item) => {
            const innerString = `<h3>${item.title}</h3>
            <div class="audio-wrapper">
                <audio onplay="nowPlaying.createElement(${this.listItemNum})" type="audio/mpeg"
                    src="https://conscious-j.herokuapp.com/${item.audioLink}" controls controlsList="nodownload">
                    Your browser does not support the audio element.
                </audio>
                <div id="speed-wrapper">
                    <label for="a">Playback speed</label><br>
                    <input type="range" id="a" max="2.5" min="0.5" step="0.25" value="1" oninput="adjustSpeed(this, ${this.listItemNum})">
                    <br>x<output name="x" for="a">1</output>
                </div>
                <a class="btn yt" href="${item.ytLink}"
                    title="Watch this recordind on YouTube" target="blank"><i class="fab fa-youtube"></i></a>
                <a class="btn" href="https://conscious-j.herokuapp.com/recording/download?path=${item.audioLink}" title="Download" download>&#8681;</a>
            </div>`;
            createHtml('div', 'list-item', '', innerString, htmlElements.section[num]);
            this.listItemNum++;
        });
        htmlElements.audio = document.querySelectorAll('audio');
        htmlElements.output = document.querySelectorAll('output');
    },
};

function toggleMini(miniBtn, num) {
    htmlElements.section[num].classList.toggle('mini');
    miniBtn.title === 'Minimize' ? miniBtn.title = 'Maximize' : miniBtn.title = 'Minimize';
};

function adjustSpeed(range, num) {
    htmlElements.audio[num].playbackRate = range.value;
    htmlElements.output[num].innerHTML = range.value;
};



// var nowPlaying = {
//     number: 0,
//     createElement: function (num) {
//         this.number = num;
//         let innerString = `<h3>${audioListItems.recordingList[this.number].title}</h3>
//         <div class="audio-wrapper">
//         <div id="speed-wrapper">
//             <label for="a">Playback speed</label><br>
//             <input type="range" id="a" max="2.5" min="0.5" step="0.25" value="1" oninput="adjustSpeed(this, ${this.number})">
//             <br>x<output name="x" for="a">1</output>
//         </div>
//         <button id="pause-btn" title="pause" onclick="nowPlaying.pausePlay(this, ${this.number})"><i class="far fa-pause-circle"></i></button>
//         <input type="range" id="a" max="1" min="0" step="0.1" value="${htmlElements.audio[this.number].volume}" oninput="nowPlaying.volumeChange(this, ${this.number})">
//         <a class="btn yt" href="${audioListItems.recordingList[this.number].ytLink}"
//             title="Watch this recordind on YouTube" target="blank"><i class="fab fa-youtube"></i></a>
//         </div>
//         </div>`;
//         createHtml('div', '', 'nowPlaying', innerString, htmlElements.container);
//     },
//     playing: true,
//     volumeChange: (range) => htmlElements.audio[this.number].volume = range.value,
//     pausePlay: function (btn, num) {
//         if (this.playing) {
//             btn.innerHTML = '&#x25B6;';
//             btn.title = 'play';
//             htmlElements.audio[num].pause();
//             this.playing = false
//         } else {
//             btn.innerHTML = '<i class="far fa-pause-circle"></i>';
//             btn.title = 'pause';
//             htmlElements.audio[num].play();
//             this.playing = true;
//         }
//     }
// };
