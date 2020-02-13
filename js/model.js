function getData(url, method) {
    return new Promise((resolve) => {
        fetch(url, { method: method })
            .then(res => {
                return res.json();
            })
            .then(data => {
                resolve(data);
            })
    })
};