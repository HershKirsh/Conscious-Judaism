function getData(url, method) {
    fetch(url, { method: method })
        .then(res => {
            return res.json();
        })
        .then(data => {
            appendHtml(data);
        })
};

function prepareLists(fullList) {
    appendLists(dtList = fullList.filter(item => item.series == 'dt').sort((a, b) => a.number > b.number ? 1 : -1), 0);
    appendLists(dmeList = fullList.filter(item => item.series == 'dme').sort((a, b) => a.number > b.number ? 1 : -1), 1);
    appendLists(cinList = fullList.filter(item => item.series == 'cin').sort((a, b) => a.number > b.number ? 1 : -1), 2);
    audioListItems.recordingList = dtList.concat(dmeList, cinList);
};