import isEqual from 'lodash.isequal';

// let stickersAndDatesRecord = readFromLocal('stickersAndDatesRecord') || [];
// let goalsRecord = readFromLocal('goalsRecord') || [];

// const getGoalsRecord = () => goalsRecord;
// const getStickersAndDatesRecord = () => stickersAndDatesRecord;

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

// function deleteGoal(goalTitleToRemove){
//     goalsRecord = goalsRecord.filter(record => !isEqual(record[0].toLowerCase(), goalTitleToRemove.toLowerCase()));
//     createToLocalStorage('goalsRecord', goalsRecord);

//     stickersAndDatesRecord = stickersAndDatesRecord.filter(record => !isEqual(record['goal'].toLowerCase(), goalTitleToRemove.toLowerCase()));
//     createToLocalStorage('stickersAndDatesRecord', stickersAndDatesRecord);
// }

// function saveGoal(goalTitleText, checkedDays, colour) {
//     goalsRecord.push([goalTitleText, checkedDays, colour]);
//     createToLocalStorage('goalsRecord', goalsRecord);
// }

export {readGoalsFromLocal, readStickersFromLocal, createToLocalStorage};