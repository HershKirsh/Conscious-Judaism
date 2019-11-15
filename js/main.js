


var htmlElements = {
    section: document.querySelectorAll('section'),
};

function getRecordings() {
    var url = "https://conscious-j.herokuapp.com/recording/recordings";
    fetch(url, { method: 'get' })
        .then(res => {
            return res.json();
        })
        .then(data => {
            prepareLists(data);
        })
};


const pageBuilder = {
    listItemNum: 0,
    appendList: function (list, num) {
        list.forEach((item) => {
            const innerString = `<h3>${item.title}</h3>
            <div class="audio-wrapper">
                <audio type="audio/mpeg"
                    src="https://conscious-j.herokuapp.com/${item.audioLink}" controls>
                    Your browser does not support the audio element.
                </audio>
                <div id="speed-wrapper">
                    <label for="a">Playback speed</label><br>
                    <input type="range" id="a" max="4" value="2" oninput="adjustSpeed(this, ${this.listItemNum})">
                    <br>x<output name="x" for="a">1</output>
                </div>
                <a class="btn yt" href="${item.ytLink}"
                    title="Watch this recordind on YouTube" target="blank"><i class="fab fa-youtube"></i></a>
            </div>`;
            this.createHtml('div', 'list-item', '', innerString, htmlElements.section[num]);
            this.listItemNum++;
        });
        htmlElements.audio = document.querySelectorAll('audio');
        htmlElements.output = document.querySelectorAll('output');
    },
    createHtml: function (tagName, className, idName, innerContent, insertTo) {
        const htmlListItem = document.createElement(tagName);
        htmlListItem.classList.add(className);
        htmlListItem.id = idName;
        const textNode = (innerContent);
        htmlListItem.innerHTML = textNode;
        insertTo.insertAdjacentElement('beforeend', htmlListItem);
    }
}

function prepareLists(fullList) {
    pageBuilder.appendList(dtList = fullList.filter(item => item.series == 'dt'), 0);
    pageBuilder.appendList(dmeList = fullList.filter(item => item.series == 'dme'), 1);
    pageBuilder.appendList(cinList = fullList.filter(item => item.series == 'cin'), 2);
};

function toggleMini(miniBtn, num) {
    htmlElements.section[num].classList.toggle('mini');
    if (miniBtn.title == 'Minimize') {
        miniBtn.title = 'Maximize'
    } else {
        miniBtn.title = 'Minimize'
    }
};

function adjustSpeed(range, num) {
    let speed;
    if (range.value == 0) {
        speed = .25;
    } else {
        speed = range.value * .5
    }
    htmlElements.audio[num].playbackRate = speed;
    htmlElements.output[num].innerHTML = speed;
};

// const playbackPaceAdjust = {
//     rangeArray: [.5, .75, 1, 1.5, 2],
//     adjustSpeed: function (range, num) {
//         let speed = this.rangeArray[range];
//         htmlElements.audio[num].playbackRate = speed;
//         htmlElements.output[num].innerHTML = speed;
//     }
// };

//<a class="btn" href="https://conscious-j.herokuapp.com/${item.audioLink}" title="Download" download>&#8681;</a>

var audioList = [
    {
        title: "test1",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'dt',
        ytLink: "some-link"
    },
    {
        title: "test2",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'dme',
        ytLink: "some-link"
    },
    {
        title: "test3",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'cin',
        ytLink: "some-link"
    },
    {
        title: "test4",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'dt',
        ytLink: "some-link"
    },
    {
        title: "test5",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'dme',
        ytLink: "some-link"
    },
    {
        title: "test6",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'cin',
        ytLink: "some-link"
    },
    {
        title: "test7",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'dt',
        ytLink: "some-link"
    },
    {
        title: "test8",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'dme',
        ytLink: "some-link"
    },
    {
        title: "test9",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'cin',
        ytLink: "some-link"
    },
    {
        title: "test10",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'dt',
        ytLink: "some-link"
    },
    {
        title: "test11",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'dme',
        ytLink: "some-link"
    },
    {
        title: "test12",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'cin',
        ytLink: "some-link"
    },
    {
        title: "test13",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'dt',
        ytLink: "some-link"
    },
    {
        title: "test14",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'dme',
        ytLink: "some-link"
    },
    {
        title: "test15",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'cin',
        ytLink: "some-link"
    },
    {
        title: "test16",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'dt',
        ytLink: "some-link"
    },
    {
        title: "test17",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'dme',
        ytLink: "some-link"
    },
    {
        title: "test18",
        audioLink: 'https://drive.google.com/open?id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK',
        series: 'cin',
        ytLink: "some-link"
    },
];