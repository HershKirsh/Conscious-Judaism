var htmlElements = {
    container: document.getElementById('container'),
    mainMenu: document.getElementById('main-menu')
};

class HtmlElement {
    constructor(_tag, _class, _id, _innerContent, _insertTo, _attributes) {
        this.tag = _tag;
        this.class = _class;
        this.id = _id;
        this.innerContent = _innerContent;
        this.insertTo = _insertTo;
        this.attributes = _attributes
    };
    createElement() {
        const newElement = document.createElement(this.tag);
        if (this.class) { newElement.classList.add(this.class) };
        if (this.id) { newElement.id = this.id };
        if (this.attributes) { this.attributes.forEach(attribute => newElement.setAttribute(attribute.name, attribute.value)) }
        const textNode = (this.innerContent);
        newElement.innerHTML = textNode;
        this.insertTo.insertAdjacentElement('beforeend', newElement);
    };
}

const audioSections = {
    IDs: ['DT', 'DME', 'CIN', 'HEB'],
    headers: ['Conscious Judaism Series', 'Conscious Chassidus Series', 'Conscious In Nature', 'נשמת ישראל'],
    descriptions: ['Recordings on Sefer Dover Tzedek from Reb Tzodok HaCohen of Lublin',
        'Recordings on Sefer Degel Machaneh Ephraim', 'Insights conveyed while surrounded by nature', 'שיעורים בעברית'],
    create: function (data) {
        this.IDs.forEach((item, i) => {
            let innerString = `<div class="subheader-wrapper">
                <h2>${this.headers[i]}</h2>
                <h4>${this.descriptions[i]}</h4>
                </div>
                <button class="minimize" title="Minimize" onclick="audioSections.toggleMini(this, ${i})"></button>`;
            const newElement = new HtmlElement('section', 'series', item, innerString, htmlElements.container);
            newElement.createElement();
            // createHtml('section', 'series', item, innerString, htmlElements.container);
        });
        htmlElements.section = document.querySelectorAll('section');
        handleData(data);
    },
    toggleMini: function (miniBtn, num) {
        htmlElements.section[num].classList.toggle('mini');
        miniBtn.title === 'Minimize' ? miniBtn.title = 'Maximize' : miniBtn.title = 'Minimize';
    }
};

const audioListItems = {
    recordingList: [],
    listItemNum: 0,
    appendList: function (list, num) {
        list.forEach((item) => {
            const innerString = `<button class="btn play" onclick="audioPlayer.play(${this.listItemNum})">&#9654;</button><h3>${item.number + 1}. ${item.title}</h3>
            <div class="btns-wrapper">
                <a class="btn yt" href="https://www.youtube.com/watch?v=${item.ytId}"
                    title="Watch this recordind on YouTube" target="blank"><i class="fab fa-youtube"></i></a>
                <a class="btn" href="https://consciousj.s3.us-east-2.amazonaws.com/audio/${item.title}.mp3" title="Download" download>&#8681;</a>
            </div>`;
            const newElement = new HtmlElement('div', 'list-item', '', innerString, htmlElements.section[num], [{ name: "tabindex", value: this.listItemNum }]);
            newElement.createElement();
            this.listItemNum++;
        });
        htmlElements.listItem = document.querySelectorAll('.list-item');
    }
};

const playerElement = {
    create: function () {
        let newElement = new HtmlElement('input', '', 'open', '', htmlElements.container, [{name: 'type', value: 'checkbox'}]);
        newElement.createElement();
        htmlElements.open = document.getElementById('open');
        const innerString = `<label for="open" id="open-close-player"></label>
            <h3></h3>
            <div class="audio-wrapper">
                <button class="skip-track" id="prev" onclick="audioPlayer.prev()"  title="play previous track">&#171;</button>
                <button class="skip" id="back" onclick="audioPlayer.skipBack()" title="rewind 30 seconds">30</button>
                <audio type="audio/mpeg"
                    src="" controls controlsList="nodownload" onended="audioPlayer.next()">
                    Your browser does not support the audio element.
                </audio>
                <button class="skip" id="forward"  onclick="audioPlayer.skipForward()" title="forward 30 seconds">30</button>
                <button class="skip-track" id="next" onclick="audioPlayer.next()" title="play next track">&#187;</button>
                <div id="speed-wrapper">
                    <label for="a">Playback speed</label><br>
                    <input type="range" id="a" max="2.5" min="0.5" step="0.25" value="1" oninput="audioPlayer.adjustSpeed(this, ${this.listItemNum})">
                    <br>x<output name="x" for="a">1</output>
                </div>
                <a id="player-yt" class="btn yt" href="" onclick="audioPlayer.goToYt(this)"
                    title="Continue this recordind on YouTube" target="blank"><i class="fab fa-youtube"></i></a>
                <a id="player-dl" class="btn" href="" title="Download" download>&#8681;</a>
            </div>`;
        newElement = new HtmlElement('div', '', 'player', innerString, htmlElements.container, [{ name: "tabindex", value: 1 }]);
        newElement.createElement();
        this.listItemNum++;
        htmlElements.player = document.getElementById('player');
        htmlElements.playerYtLink = document.getElementById('player-yt');
        htmlElements.playerDlLink = document.getElementById('player-dl');
        htmlElements.playerTitle = document.querySelector('#player>h3');
        htmlElements.audio = document.querySelector('audio');
        htmlElements.output = document.querySelector('output');
    },
};

const audioPlayer = {
    number: 0,
    play: function (num) {
        htmlElements.listItem[this.number].classList.remove('now-playing')
        htmlElements.listItem[num].classList.add('now-playing')
        htmlElements.playerTitle.innerHTML = `${audioListItems.recordingList[num].number + 1}. ${audioListItems.recordingList[num].title}`;
        htmlElements.audio.src = `https://consciousj.s3.us-east-2.amazonaws.com/audio/${audioListItems.recordingList[num].title}.mp3`;
        htmlElements.playerDlLink.href = `https://consciousj.s3.us-east-2.amazonaws.com/audio/${audioListItems.recordingList[num].title}.mp3`;
        htmlElements.audio.play();
        htmlElements.open.checked = true;
        this.number = num;
    },
    skipBack: function () {
        htmlElements.audio.currentTime -= 30.0;
    },
    skipForward: function () {
        htmlElements.audio.currentTime += 30.0;
    },
    prev: function () {
        this.play(this.number - 1)
    },
    next: function () {
        this.play(this.number + 1)
    },
    adjustSpeed: function (range) {
        htmlElements.audio.playbackRate = range.value;
        htmlElements.output.innerHTML = range.value;
    },
    goToYt: function (link) {
        link.href = `https://youtu.be/${audioListItems.recordingList[this.number].ytId}?t=${parseInt(htmlElements.audio.currentTime)}`;
        link.click();
    }
};

// const viewH = window.innerHeight;

// var heros = document.querySelectorAll('.hero');
// const heroOffset = heros[0].offsetTop
// const offsetP = heroOffset / 100;
// console.log(heroOffset);
// window.addEventListener('scroll', function (e) {
//     let offsetTop = document.documentElement.scrollTop;
//         let percent = offsetTop / offsetP;
//         console.log(percent);
//         heros[0].style.transform = `translateX(${100 - percent + 5}%)`;
// });



// let scale = 100;
// var slide = 0;
// window.addEventListener('wheel', function (e) {
//     e.preventDefault;
//     console.log(e.wheelDelta);
//     e.wheelDelta <= 0 ? scale -= 5 : scale += 5;
//     if (scale >= 100) {
//         scale = 100;
//     } else if (scale <= -20) {
//         scale = 200;
//         heros[slide].style.transform = `translateY(${scale}%)`;
//         slide++;
//         scale = 100;
//     };
//     heros[slide].style.transform = `translateY(${scale}%)`;
// });
