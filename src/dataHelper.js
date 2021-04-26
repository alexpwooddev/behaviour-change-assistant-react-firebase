function readGoalsFromLocal(target) {
    let localRead = JSON.parse(localStorage.getItem(target));
    if (localRead != null) {
        return localRead;
    } else {
        return [];
    }
}

function readStickersFromLocal(target) {
    let localRead = JSON.parse(localStorage.getItem(target));
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