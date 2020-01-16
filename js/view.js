var htmlElements = {
    container: document.getElementById('container'),
    mainMenu: document.getElementById('main-menu')
};

const createHtml = (tagName, className, idName, innerContent, insertTo, attribute) => {
    const htmlListItem = document.createElement(tagName);
    if (className) { htmlListItem.classList.add(className) };
    if (idName) { htmlListItem.id = idName };
    if (attribute) { htmlListItem.setAttribute(attribute.name, attribute.value) }
    const textNode = (innerContent);
    htmlListItem.innerHTML = textNode;
    insertTo.insertAdjacentElement('beforeend', htmlListItem);
};
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
            const innerString = `<h3>${item.number + 1}. ${item.title}</h3><span onclick="nowPlaying.stop(${this.listItemNum})" title="stop playing">X</span>
            <div class="audio-wrapper">
                <audio onplay="nowPlaying.setPlay(${this.listItemNum})" onpause="nowPlaying.pause()" type="audio/mpeg"
                    src="https://consciousj.s3.us-east-2.amazonaws.com/audio/${item.title}.mp3" controls controlsList="nodownload">
                    Your browser does not support the audio element.
                </audio>
                <div id="speed-wrapper">
                    <label for="a">Playback speed</label><br>
                    <input type="range" id="a" max="2.5" min="0.5" step="0.25" value="1" oninput="adjustSpeed(this, ${this.listItemNum})">
                    <br>x<output name="x" for="a">1</output>
                </div>
                <a class="btn yt" href="https://www.youtube.com/watch?v=${item.ytId}"
                    title="Watch this recordind on YouTube" target="blank"><i class="fab fa-youtube"></i></a>
                <a class="btn" href="https://consciousj.s3.us-east-2.amazonaws.com/audio/${item.title}.mp3" title="Download" download>&#8681;</a>
            </div>`;
            createHtml('div', 'list-item', '', innerString, htmlElements.section[num], { name: "tabindex", value: this.listItemNum });
            this.listItemNum++;
        });
        htmlElements.audio = document.querySelectorAll('audio');
        htmlElements.output = document.querySelectorAll('output');
        htmlElements.listItem = document.querySelectorAll('.list-item');
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



const nowPlaying = {
    number: 0,
    open: false,
    setPlay: function (num) {
        if (num !== this.number) {
            if (this.open) {
                this.stop(this.number);
            }
            this.number = num;
            this.open = true;
            htmlElements.listItem[num].classList.add('now-playing');
        }
    },
    stop: function (num) {
        htmlElements.audio[num].pause();
        htmlElements.listItem[num].classList.remove('now-playing');
        this.open = false;
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
