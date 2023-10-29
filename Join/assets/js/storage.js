//--local storage / sign up // 
const STORAGE_TOKEN = '4AVD74O6ONTUSWYBIKRAF3SC5B2U9YW3OCE1JRVE';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
let name = []
let firstLetter = []
let passwordVisible = false;
let confirmPasswordVisible = false;

function togglePassword() {
    if (!passwordVisible) {
        document.getElementById('input-password').type = 'text';
        document.getElementById('btn-visibility-password').src = '../img/visibility_off.png';
        passwordVisible = true;
    } else {
        document.getElementById('input-password').type = 'password';
        document.getElementById('btn-visibility-password').src = '../img/visibility.png';
        passwordVisible = false;
    }
}

function toggleConfirmPassword() {
    if (!confirmPasswordVisible) {
        document.getElementById('input-confirm-password').type = 'text';
        document.getElementById('btn-visibility-confirm-password').src = '../img/visibility_off.png';
        confirmPasswordVisible = true;
    } else {
        document.getElementById('input-confirm-password').type = 'password';
        document.getElementById('btn-visibility-confirm-password').src = '../img/visibility.png';
        confirmPasswordVisible = false;
    }
}

function enableVisibilityConfirmPassword() {
    document.getElementById('btn-visibility-confirm-password').classList.remove('d-none');
    document.getElementById('input-confirm-password').classList.remove('password');
}

function disableVisibilityConfirmPassword() {
    document.getElementById('btn-visibility-confirm-password').classList.add('d-none');
    document.getElementById('input-confirm-password').classList.add('password');
}

function enableVisibilityPassword() {
    document.getElementById('btn-visibility-password').classList.remove('d-none');
    document.getElementById('input-password').classList.remove('password');
}

function disableVisibilityPassword() {
    document.getElementById('btn-visibility-password').classList.add('d-none');
    document.getElementById('input-password').classList.add('password');
}

function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key));
}

async function init() {
    loadAccounts();
}

function randomColor() {
    let id = parseInt(Math.random() * 15);
    return id
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
    if (words.length > 1) {
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