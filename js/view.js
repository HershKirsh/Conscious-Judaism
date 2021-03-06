const htmlElements = {
    stylesheet: document.getElementById('page-styles'),
    container: document.getElementById('container'),
    mainMenu: document.getElementById('main-menu'),
    pageTitle: document.querySelector('title')
};

class HtmlElement {
    constructor(_obj) {
        this.tag = _obj.tag;
        this.class = _obj.class;
        this.id = _obj.id;
        this.innerContent = _obj.getString;
        this.insertTo = _obj.insertTo;
        this.attributes = _obj.attributes;
        this.selectors = _obj.selectors;
        this.data = _obj.data;
    };
    createElement(data) {
        return new Promise(resolve => {
            if (data || this.data) {
                if (data) this.data = data;
                this.data.forEach((item, i) => {
                    const newElement = document.createElement(this.tag);
                    if (this.class) { newElement.classList.add(this.class) };
                    if (this.id) { newElement.id = this.id } else if (item.id) { newElement.id = item.id };
                    if (this.attributes) { this.attributes.forEach(attribute => newElement.setAttribute(attribute.name, attribute.value)) }
                    if (this.data[i].innerStrings) {
                        const textNode = this.data[i].innerStrings;
                        newElement.innerHTML = textNode;
                    } else {
                        const textNode = this.innerContent(item, i);
                        newElement.innerHTML = textNode;
                    };
                    if (typeof this.insertTo === "function") {
                        const insertToElem = this.insertTo(item);
                        insertToElem.insertAdjacentElement('beforeend', newElement);
                    } else {
                        this.insertTo.insertAdjacentElement('beforeend', newElement);
                    };
                    item.element = newElement;
                });
            } else {
                const newElement = document.createElement(this.tag);
                if (this.class) { newElement.classList.add(this.class) };
                if (this.id) { newElement.id = this.id };
                if (this.attributes) { this.attributes.forEach(attribute => newElement.setAttribute(attribute.name, attribute.value)) }
                const textNode = this.innerContent();
                newElement.innerHTML = textNode;
                if (typeof this.insertTo === "function") {
                    const insertToElem = this.insertTo();
                    insertToElem.insertAdjacentElement('beforeend', newElement);
                } else {
                    this.insertTo.insertAdjacentElement('beforeend', newElement);
                };
            }
            if (this.selectors) this.selectors();
            resolve()
        })
    }
};

const homePageElement = new HtmlElement({
    data: [
        {
            id: 'hero',
            innerStrings: `<h4>Get in touch with who you are</h4>
            <h4>Awaken your soul</h4>
            <h4>Rejuvinate your spirit</h4>`},
        {
            id: 'audio-section',
            innerStrings: `<h2 class="fade-in">Get a Spiritual Upgrade</h2>
            <h4  class="fade-in">Stream and Download full lectures</h4>
            <a class="fade-in" href="/audio" onclick="pageSettingElements.setPage(event, 'audio')">Go To Audio</a>`},
        {
            id: 'inspiration-section',
            innerStrings: `<h2 class="fade-in">Food for the spirit</h2>
            <a class="fade-in" href="/inspiration"  onclick="pageSettingElements.setPage(event, 'inspiration')">Get Inspiration</a>
            <h4 class="fade-in">Short Quotes and Video Clips</h4>`},
        {
            id: 'about-section',
            innerStrings: `<div id="book" tabindex="0">
            <div class="page" id="second-page">
                <p>After acquiring a strong foundation and structure from these writings,
                    he continued to involve himself with additional works that aim to unravel the mystery of our experience.
                    Included are, Sefer Yetzira and its commentaries, Sefer HaBohir, Sefer HaKuna, Sefer HaTmuna,
                    The Zohar, as well as the writings of The Arizal. Drawing from the reliable wellsprings of wisdom from these great
                    masters, he attained a deeper perspective on the nature of our existence and reality as a whole.</p>
                <p> He is also blessed with an uncanny ability to transmit of his wisdom to others in a distinctly coherent and unambiguous fashion.</p>
                <p>In Yakov's teachings, he places an emphasis on turning one's perspective inwards to recognize
                    that the answers to all important questions are hiding in plain sight to one who properly analyzes the true nature of their existence.</p>
            </div>
            <div class="page" id="first-page">
                <img src="./assets/yakov.png" alt="Yakov Kirsh">
                <p>With the premise that the wisdom of the Torah can solve the mystery of the human existence in this
                    elusive reality, Yakov Kirsh has dedicated himself to decipher the code. Using the Chasidic wisdom,
                    revealed by the Baal Shem Tov, Yakov started gathering the fragments of the puzzle.</p>
                <p>Yakov found a particular lucidity in the writings of the 19th century Chasidic master Reb Tzadok
                    HaKohen of Lublin (1823-1900).
                    Yakov immersed himself in the writings of Reb Tzadok, reviewing all the available writings
                    numerous times. He also collected excerpts from his writings, which he found were aiming to explain the core meaning and purpose of life.</p>
            </div>
            <div class="page" id="backside"><p>About Yokov Kirsh</p>
            </div>
            <div id="cover">
                <h3>About Yakov Kirsh</h3>
            </div>
            </div>`}
    ],
    tag: 'section',
    insertTo: htmlElements.container,
    selectors: function () {
        htmlElements.fadeIn = document.querySelectorAll('.fade-in');
    }
})

const storedAudioData = {
    data: {
        trackData: []
    },
    getData: function () {
        return new Promise(resolve => {
            const storedData = localStorage.getItem('audioData');
            if (storedData) {
                this.data = JSON.parse(storedData)
                htmlElements.speedRange.value = this.data.playbackSpeed;
                audioPlayer.adjustSpeed(this.data.playbackSpeed);
            }
            resolve();
        })
    },
    setNowPlaying: function () {
        const nowPlaying = Track.instanceArray.filter(track => track.nowPlaying);
        nowPlaying.length > 0 ? nowPlaying[0].play(true) : Track.instanceArray[0].play(true)
    }
}

const audioSections = new HtmlElement({
    tag: 'section',
    class: 'series',
    insertTo: htmlElements.container,
    getString: function (item, i) {
        const innerString = `<label for="minimize${item.series}" class="minimize" title="Minimize"></label><div class="subheader-wrapper">
                <h2>${item.title}</h2>
                <h4>${item.description}</h4>
                </div>`
        return innerString;
    },
    selectors: function () {
        htmlElements.sections = document.querySelectorAll('section');
        htmlElements.sections.forEach((item, i) => {
            const newElement = document.createElement('input');
            newElement.classList.add('invisible', 'mini');
            newElement.id = 'minimize' + this.data[i].series;
            newElement.type = 'checkbox';
            item.insertAdjacentElement('beforeBegin', newElement);
        })
    }
});

const trackList = new HtmlElement({
    tag: 'div',
    class: 'list-item',
    getString: function (item) {
        const innerString = `<button class="btn play">&#9654;</button><h3 title="Uploaded: ${new Date(item.date).toLocaleString(undefined, { year: "numeric", month: "long", day: "numeric" })}">${item.number + 1}. ${item.title}</h3>
            <div class="btns-wrapper">
                <a class="btn yt" href="https://www.youtube.com/watch?v=${item.ytId}"
                    title="Watch this recordind on YouTube" target="blank"><i class="fab fa-youtube"></i></a>
                <a class="btn" href="https://consciousj.s3.us-east-2.amazonaws.com/audio/${item.title.replace(/"/g, '&quot;')}.mp3" title="Download" download>&#8681;</a>
            </div>`;
        return innerString;
    },
    insertTo: function (track) {
        return document.getElementById(track.series);
    },
    attributes: [{ name: "tabindex", value: 0 }],
    selectors: function () {
        htmlElements.trackList = document.querySelectorAll('.list-item');
        htmlElements.trackListPlay = document.querySelectorAll('.list-item .play');
        if (storedAudioData.data.trackData.length > 0) {
            const savedData = storedAudioData.data.trackData;
            if (savedData.length > 0) savedData.forEach(track => {
                // const updatedTrack = { ...this.data[track.number], ...track };
                // this.data.splice(track.number, 1, updatedTrack);
                const indexOfSaved = this.data.findIndex(item => item.series === track.series && item.number === track.number)
                if (track.listened) this.data[indexOfSaved].listened = true;
                if (track.completed) this.data[indexOfSaved].completed = true;
                if (track.position > 0) this.data[indexOfSaved].position = track.position;
                if (track.nowPlaying) this.data[indexOfSaved].nowPlaying = true;
            });
        }
        this.data.forEach((item, i) => {
            track = new Track(item, i);
            if (track.started) track.element.classList.add('started');
            if (track.completed) track.element.classList.add('completed');
            track.addInstance();
            htmlElements.trackListPlay[i].addEventListener('click', () => Track.instanceArray[i].play());
        })
    }
});

const playerElement = new HtmlElement({
    tag: 'div',
    id: 'player',
    getString: function () {
        const innerString = `<label for="open" id="open-close-player"></label>
            <button id="toggle-driving-mode" onclick="this.parentElement.classList.toggle('driving-mode')"></button>
            <h3></h3>
            <button id="play-pause" onclick="audioPlayer.togglePlay(this)">&#9654</button>
            <div class="audio-wrapper">
                <button class="skip-track" id="prev" onclick="Track.prev()" title="play previous track">&#171;</button>
                <button class="skip" id="back" onclick="audioPlayer.skipBack()" title="rewind 30 seconds">30</button>
                <audio type="audio/mpeg"
                    src="" controls controlsList="nodownload" ontimeupdate="Track.updatePlay(this)" onended="Track.next(true)">
                    Your browser does not support the audio element.
                </audio>
                <button class="skip" id="forward"  onclick="audioPlayer.skipForward()" title="forward 30 seconds">30</button>
                <button class="skip-track" id="next" onclick="Track.next()" title="play next track">&#187;</button>
                <div id="speed-wrapper">
                    <button class="playback-speed-btn" id="slower" onclick="audioPlayer.adjustSpeed(this.nextElementSibling.children[2].value - 0.25, true)">-</button>
                    <div>
                    <label for="speed-range">Playback speed</label><br>
                    <input type="range" id="speed-range" max="2.5" min="0.5" step="0.25" value="1" onchange="audioPlayer.adjustSpeed(this.value)">
                    <br>x<output for="speed-range">1</output>
                    </div>
                    <button class="playback-speed-btn" id="faster" onclick="audioPlayer.adjustSpeed(Number(document.querySelector('#speed-range').value) + 0.25, true)">+</button>
                </div>
                <a id="player-yt" class="btn yt" href="" onclick="Track.goToYt(this)"
                    title="Continue this recordind on YouTube" target="blank"><i class="fab fa-youtube"></i></a>
                <a id="player-dl" class="btn" href="" title="Download" download>&#8681;</a>
            </div>`;
        return innerString;
    },
    insertTo: htmlElements.container,
    attributes: [{ name: "tabindex", value: 1 }],
    selectors: function () {
        htmlElements.playPause = document.getElementById('play-pause');
        htmlElements.playerYtLink = document.getElementById('player-yt');
        htmlElements.player = document.getElementById('player');
        htmlElements.playerDlLink = document.getElementById('player-dl');
        htmlElements.playerTitle = document.querySelector('#player>h3');
        htmlElements.audio = document.querySelector('audio');
        htmlElements.speedRange = document.querySelector('#speed-range');
        htmlElements.output = document.querySelector('output');
        const newElement = document.createElement('input');
        newElement.classList.add('invisible');
        newElement.id = 'open';
        newElement.type = 'checkbox';
        htmlElements.player.insertAdjacentElement('beforeBegin', newElement);
        htmlElements.open = newElement;
    }
});

const audioPlayer = {
    skipBack: function () {
        htmlElements.audio.currentTime -= 30.0;
    },
    skipForward: function () {
        htmlElements.audio.currentTime += 30.0;
    },
    adjustSpeed: function (range, outsideTrigger) {
        if (outsideTrigger) htmlElements.speedRange.value = range;
        htmlElements.audio.playbackRate = range;
        htmlElements.output.innerHTML = range;
        Track.speed = range;
    },
    togglePlay: function (button) {
        if (htmlElements.audio.paused) {
            htmlElements.audio.play();
            button.innerHTML = '&#10074;&#10074;';
        } else {
            htmlElements.audio.pause();
            button.innerHTML = '&#9654';
        }
    }
};

class Track {
    constructor(_trackObj, _i) {
        this.series = _trackObj.series;
        this.title = _trackObj.title;
        this.ytId = _trackObj.ytId;
        this.number = _trackObj.number;
        this.index = _i;
        this.element = _trackObj.element;
        _trackObj.position ? this.position = _trackObj.position : this.position = 0;
        if (_trackObj.nowPlaying) this.nowPlaying = true;
        if (_trackObj.completed) this.completed = true;
        if (_trackObj.started) this.started = true;
    };
    //static instanceArray = [];
    //static currentTrack = null;
    addInstance() {
        this.constructor.instanceArray.push(this);
    };
    play(paused) {
        if (this.constructor.currentTrack) {
            this.constructor.currentTrack.nowPlaying = false;
            this.constructor.currentTrack.element.classList.remove('now-playing');
        };
        this.constructor.currentTrack = this;
        this.nowPlaying = true;
        this.started = true;
        this.element.classList.add('started');
        this.element.classList.add('now-playing');
        htmlElements.playerTitle.innerHTML = `${this.number + 1}. ${this.title}`;
        htmlElements.audio.src = `https://consciousj.s3.us-east-2.amazonaws.com/audio/${this.title}.mp3`;
        htmlElements.playerDlLink.href = `https://consciousj.s3.us-east-2.amazonaws.com/audio/${this.title}.mp3`;
        htmlElements.audio.currentTime = this.position;
        htmlElements.audio.playbackRate = this.constructor.speed;
        if (!paused) htmlElements.audio.play();
        htmlElements.open.checked = true;
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: `${this.number + 1}. ${this.title}`,
                artist: 'Yakov Kirsh',
                album: 'Conscious Judaism',
                artwork: [
                    { src: '../assets/logo.png', type: 'image/png' },
                ]
            });
            navigator.mediaSession.setActionHandler('seekbackward', () => audioPlayer.skipBack());
            navigator.mediaSession.setActionHandler('seekforward', () => audioPlayer.skipForward());
            navigator.mediaSession.setActionHandler('previoustrack', () => this.constructor.prev());
            navigator.mediaSession.setActionHandler('nexttrack', () => this.constructor.next());
        }
    };
    static renderList() {
        this.instanceArray.forEach(item => {
            document.querySelector('#' + item.series).appendChild(item.element);
        });
        this.currentTrack.play(true);
    };
    static updatePlay(e) {
        const currentPosition = e.currentTime;
        const positionPercent = currentPosition / (e.duration / 100);
        this.currentTrack.position = currentPosition;
        htmlElements.playPause.style.setProperty('--audio-position', (positionPercent).toFixed(1) + '%');
    };
    static next(completed) {
        if (completed) { this.currentTrack.completed = true; this.currentTrack.position = 0; this.currentTrack.element.classList.add('completed') }
        if (this.currentTrack.index < this.instanceArray.length - 1) this.instanceArray[this.currentTrack.index + 1].play();
    };
    static prev() {
        if (this.currentTrack.index > 0) this.instanceArray[this.currentTrack.index - 1].play();
    };
    static goToYt(link) {
        htmlElements.audio.pause();
        link.href = `https://youtu.be/${this.currentTrack.ytId}?t=${parseInt(htmlElements.audio.currentTime)}`;
        link.click();
    };
    static saveData() {
        const tracks = [];
        this.instanceArray.forEach(track => {
            if (track.started && track.position > 29 || track.completed || track.nowPlaying) {
                const tempTrack = { series: track.series, number: track.number, position: track.position, started: track.started }
                if (track.completed) tempTrack.completed = true;
                if (track.nowPlaying) tempTrack.nowPlaying = true;
                tracks.push(tempTrack);
            }
        });
        const audioData = { playbackSpeed: Track.speed, trackData: tracks };
        localStorage.setItem("audioData", JSON.stringify(audioData));
    }
};

Track.instanceArray = [];
Track.currentTrack = null;
Track.speed = 1;

const meditationsList = new HtmlElement({
    tag: 'div',
    class: 'list-item',
    getString: function (item) {
        const innerString = `<div class="thumbnail-wrapper">
            <img src="${item.thumbnail}" alt="${item.title}-thumbnail" onclick="youtubeElements.playVideo(${item.number})">
            <div class="btns-wrapper">
                <a class="btn yt" href="https://www.youtube.com/watch?v=${item.ytId}"
                    title="Watch this recordind on YouTube" target="blank"><i class="fab fa-youtube"></i></a>
                <a class="btn" href="https://consciousj.s3.us-east-2.amazonaws.com/audio/meditations/${item.title}.mp3" title="Download" download>&#8681;</a>
            </div>
        </div>
        <h3 title="Uploaded: ${new Date(item.date).toLocaleString(undefined, { year: "numeric", month: "long", day: "numeric" })}">${item.number + 1}. ${item.title}</h3>`;
        return innerString;
    },
    insertTo: htmlElements.container,
    selectors: function () {
        htmlElements.trackList = document.querySelectorAll('.list-item');
        htmlElements.trackListPlay = document.querySelectorAll('.list-item .play');
        // if (storedAudioData.data.trackData.length > 0) {
        //     const savedData = storedAudioData.data.trackData;
        //     if (savedData.length > 0) savedData.forEach(track => {
        //         // const updatedTrack = { ...this.data[track.number], ...track };
        //         // this.data.splice(track.number, 1, updatedTrack);
        //         const indexOfSaved = this.data.findIndex(item => item.series === track.series && item.number === track.number)
        //         if (track.listened) this.data[indexOfSaved].listened = true;
        //         if (track.completed) this.data[indexOfSaved].completed = true;
        //         if (track.position > 0) this.data[indexOfSaved].position = track.position;
        //         if (track.nowPlaying) this.data[indexOfSaved].nowPlaying = true;
        //     });
        // }
        // this.data.forEach((item, i) => {
        //     track = new Track(item, i);
        //     if (track.started) track.element.classList.add('started');
        //     if (track.completed) track.element.classList.add('completed');
        //     track.addInstance();
        //     htmlElements.trackListPlay[i].addEventListener('click', () => Track.instanceArray[i].play());
        // })
    }
});

const videoPlayerElement = new HtmlElement({
    tag: 'div',
    id: 'player',
    getString: function () {
        const innerString = `<label for="open-video" id="open-video-player"></label>
            <h3></h3>
            <div class="video-wrapper">
                <img src="" alt="">
                <div id="youtube-player-wrapper"><div id="youtube-player"></div></div>
                <button class="skip-track" id="prev" onclick="youtubeElements.prev()" title="play previous track">&#171;</button>
                <button class="skip" id="back" onclick="youtubeElements.skipBack()" title="rewind 30 seconds">30</button>
                <button class="skip" id="forward"  onclick="youtubeElements.skipForward()" title="forward 30 seconds">30</button>
                <button class="skip-track" id="next" onclick="youtubeElements.next()" title="play next track">&#187;</button>
                <a id="player-yt" class="btn yt" href="" onclick="youtubeElements.goToYt(this)"
                    title="Continue this recordind on YouTube" target="blank"><i class="fab fa-youtube"></i></a>
                <a id="player-dl" class="btn" href="" title="Download" download>&#8681;</a>
            </div>`;
        return innerString;
    },
    insertTo: htmlElements.container,
    attributes: [{ name: "tabindex", value: 1 }],
    selectors: function () {
        htmlElements.playPause = document.getElementById('play-pause');
        htmlElements.playerYtLink = document.getElementById('player-yt');
        htmlElements.player = document.getElementById('player');
        htmlElements.playerDlLink = document.getElementById('player-dl');
        htmlElements.playerTitle = document.querySelector('#player>h3');
        htmlElements.youtubePlayer = document.querySelector('#youtube-player');
        htmlElements.speedRange = document.querySelector('#speed-range');
        htmlElements.output = document.querySelector('output');
        const newElement = document.createElement('input');
        newElement.classList.add('invisible');
        newElement.id = 'open-video';
        newElement.type = 'checkbox';
        htmlElements.player.insertAdjacentElement('beforeBegin', newElement);
        htmlElements.openVideo = newElement;
    }
});



const youtubeElements = {
    player: {},
    currentVideo: {},
    done: false,
    initYoutubePlyer: function () {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },
    onYtAPIReady: function () {
        this.player = new YT.Player(htmlElements.youtubePlayer, {
            height: '360',
            width: '640',
            videoId: meditationsList.data[0].ytId,
            events: {
                'onReady': this.onPlayerReady,
                'onStateChange': this.onPlayerStateChange
            }
        });
    },
    onPlayerReady: function () {
        this.player.addEventListener('onStateChange', function (e) {
        });
    },
    // onPlayerStateChange: function (event) {
    //         console.log(event.data);
    // },
    playVideo: function (index) {
        this.stopVideo()
        this.currentVideo = meditationsList.data[index];
        this.player.loadVideoById(this.currentVideo.ytId)
        this.player.playVideo(this.currentVideo.ytId)
        htmlElements.openVideo.checked = true;
    },
    stopVideo: function () {
        this.player.stopVideo();
    },
    skipForward: function () {
        this.player.seekTo(this.player.getCurrentTime() + 30)
    },
    skipBack: function () {
        this.player.seekTo(this.player.getCurrentTime() - 30)
    },
    next: function () {
        this.playVideo(this.currentVideo.number + 1)
    },
    prev: function () {
        this.playVideo(this.currentVideo.number - 1)
    }
};

function onYouTubeIframeAPIReady() {
    return youtubeElements.onYtAPIReady();
};

const underConstPage = new HtmlElement({
    tag: 'section',
    getString: function () {
        const innerString = `<h2 class="fade-in">This Page Is Under Construction</h2><h3 class="fade-in">Check back soon</h3>`
        return innerString;
    },
    insertTo: htmlElements.container,
    selectors: function () {
        htmlElements.fadeIn = document.querySelectorAll('.fade-in');
    }
});

const observerElements = {
    observer: new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('observed');
            } else {
                entry.target.classList.remove('observed');
            }
        })
    }, this.options),
    options: {
        threshhold: 1,
        rootMargin: '0px',
    },
    activate: function () {
        htmlElements.fadeIn.forEach(element => {
            this.observer.observe(element)
        })
    }
}

const mutationObserverElements = {
    observer: new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === "childList" && mutation.removedNodes.length > 0) {
                mutation.removedNodes.forEach(element => {
                    if (element.nodeType === 1) {
                        if (element.querySelector('audio')) {
                            Track.saveData();
                        }
                    }
                });
            }
        })
    }),
    options: {
        childList: true
    },
    activate: function (element) {
        this.observer.observe(element, this.options);
    }
}

mutationObserverElements.activate(htmlElements.container);
window.addEventListener('beforeunload', () => Track.saveData());