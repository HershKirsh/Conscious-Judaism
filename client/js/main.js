const htmlElements = {
    audio: document.querySelectorAll('audio'),
    output: document.querySelectorAll('output')
};
console.log(htmlElements.output);

// var myAudio = document.querySelector('audio');
// myAudio.playbackRate = 2;

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
