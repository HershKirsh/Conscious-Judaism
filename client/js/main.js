const htmlElements = {
    section: document.querySelectorAll('section'),
    audio: document.querySelectorAll('audio'),
    output: document.querySelectorAll('output'),
    list: document.querySelectorAll('.list')
};

function toggleMini(miniBtn, num) {
    htmlElements.section[num].classList.toggle('mini');
    if (miniBtn.title == 'Minimize') {
        miniBtn.title = 'Maximize'
    } else {
        miniBtn.title = 'Minimize'
    }
}

function adjustSpeed(range, num) {
    let speed;
    if (range.value == 0) {
        speed = .25;
    } else {
        speed = range.value * .5
    }
    htmlElements.audio[num].playbackRate = speed;
    htmlElements.output[num].innerHTML = speed;
}

const recordings = [
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dme",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "cin",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dme",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "cin",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dme",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "cin",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dme",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dme",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "cin",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dme",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "cin",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dme",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "cin",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dt",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
    {
        series: "dme",
        title: "EP 1: Introduction to Conscious Judaism",
        audioLink: "https://drive.google.com/uc?export=open&id=1-qPv7zv-gj-B75_GpzLdi8OMczyDu8uK",
        ytLink: "https://www.youtube.com/watch?v=X-ueBcX8sp8"
    },
];

appendList(dtList = recordings.filter(item => item.series == 'dt'), 0);
appendList(dtList = recordings.filter(item => item.series == 'dme'), 1);
appendList(dtList = recordings.filter(item => item.series == 'cin'), 2);

function appendList(list, num) {
    list.forEach(item => {
        const htmlListItem = document.createElement('div');
        htmlListItem.classList.add('list-item');
        const textNode = (`<h3>${item.title}</h3>
        <div class="audio-wrapper">
            <audio type="audio/mpeg"
                src="${item.audioLink}" controls>
                Your browser does not support the audio element.
            </audio>
            <div id="speed-wrapper">
                <label for="a">Playback speed</label><br>
                <input type="range" id="a" max="4" value="2" oninput="adjustSpeed(this, 1)">
                <br>x<output name="x" for="a">1</output>
            </div>
            <a class="btn yt" href="${item.ytLink}"
                title="Watch this recordind on YouTube" target="blank"><i class="fab fa-youtube"></i></a>
            <a class="btn" href="${item.audioLink}"
                title="Download" download>&#8681;</a>
        </div>`);
        htmlListItem.innerHTML = textNode;
        htmlElements.section[num].insertAdjacentElement('beforeend', htmlListItem);
    });
}