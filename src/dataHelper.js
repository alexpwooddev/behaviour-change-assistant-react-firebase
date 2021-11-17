function readGoalsFromLocal() {
  let localRead = JSON.parse(localStorage.getItem("goalsRecord"));
  if (localRead != null) {
    return localRead;
  } else {
    return [];
  }
}

function readStickersFromLocal() {
  let localRead = JSON.parse(localStorage.getItem("stickersAndDatesRecord"));
  if (localRead != null) {
    return localRead;
  } else {
    return [];
  }
}

function createToLocalStorage(storageObject, record, addSingleElement = false) {
  if (addSingleElement === false) {
    localStorage.setItem(storageObject, JSON.stringify(record));
    return JSON.parse(localStorage.getItem(storageObject)) || [];
  } else {
    const existingLocal = JSON.parse(localStorage.getItem(storageObject)) || [];
    existingLocal.push(record);
    localStorage.setItem(storageObject, JSON.stringify(existingLocal));
    return JSON.parse(localStorage.getItem(storageObject)) || [];
  }
}

export { readGoalsFromLocal, readStickersFromLocal, createToLocalStorage };
