//--local storage / sign up // 
const STORAGE_TOKEN = '4AVD74O6ONTUSWYBIKRAF3SC5B2U9YW3OCE1JRVE';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function init() {
    loadAccounts();
}

function idLetter(str) {
    let name = str;
    let words = name.split(" ");
    let firstWord = words[0];
    let firstLetter = firstWord.substring(0, 1).toUpperCase();
    return firstLetter;
}

function firstLetters(str) {
    let name = str;
    let words = name.split(" ");
    let firstWord = words[0];
    let secondWord = words[1];
    if (words.lenth > 0) {
        let secondLetter = secondWord.substring(0, 1).toUpperCase();
        let firstLetter = firstWord.substring(0, 1).toUpperCase();
        return firstLetter + secondLetter;
    } else {
        let firstLetter = firstWord.substring(0, 1).toUpperCase();
        return firstLetter;
    }

}

function compareNames(a, b) {
    let nameA = a.name.toUpperCase(); // Großbuchstaben für den Vergleich
    let nameB = b.name.toUpperCase(); // Großbuchstaben für den Vergleich

    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}

//     accounts.sort(compareNames);

async function loadAccounts() {
    try {
        accounts = JSON.parse(await getItem('accounts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}