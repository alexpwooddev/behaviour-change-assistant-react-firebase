function readGoalsFromLocal() {
    let localRead = JSON.parse(localStorage.getItem('goalsRecord'));
    if (localRead != null) {
        return localRead;
    } else {
        return [];
    }
}

function readStickersFromLocal() {
    let localRead = JSON.parse(localStorage.getItem('stickersAndDatesRecord'));
    if (localRead != null) {
        return localRead;
    } else {
        return [];
    }
}

function createToLocalStorage(storageObject, record) {
    localStorage.setItem(storageObject, JSON.stringify(record));
}

export {readGoalsFromLocal, readStickersFromLocal, createToLocalStorage};