const STORAGE_TOKEN = '4AVD74O6ONTUSWYBIKRAF3SC5B2U9YW3OCE1JRVE';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
let name = []
let firstLetter = []
let passwordVisible = false;
let confirmPasswordVisible = false;

/**
 * this function is used to check in which state the password input field is and change it to either visible or invisible
 */
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

/**
 * this function is used to check in which state the confirm password input field is and change it to either visible or invisible
 */
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

/**
 * this function enables the eye icon on the input field that you can click on to display the password
 */
function enableVisibilityConfirmPassword() {
    document.getElementById('btn-visibility-confirm-password').classList.remove('d-none');
    document.getElementById('input-confirm-password').classList.remove('password');
}

/**
 * this function disables the eye icon on the input field that you can click on to display the password
 */
function disableVisibilityConfirmPassword() {
    document.getElementById('btn-visibility-confirm-password').classList.add('d-none');
    document.getElementById('input-confirm-password').classList.add('password');
}

/**
 * this function enables the eye icon on the input field that you can click on to display the password
 */
function enableVisibilityPassword() {
    document.getElementById('btn-visibility-password').classList.remove('d-none');
    document.getElementById('input-password').classList.remove('password');
}

/**
 * this function enables the eye icon on the input field that you can click on to display the password
 */
function disableVisibilityPassword() {
    document.getElementById('btn-visibility-password').classList.add('d-none');
    document.getElementById('input-password').classList.add('password');
}

/**
 * this function saves the array in the local storage as a key
 * @param {string} key - the name of the key, that you want the array to be saved as 
 * @param {value} array - the array
 */
function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

/**
 * this array takes the array out of the local storage
 * @param {string} key - name of the key
 * @returns 
 */
function getArray(key) {
    return JSON.parse(localStorage.getItem(key));
}

/**
 * this function gets initialized when the page is loaded
 */
async function init() {
    loadAccounts();
}

/**
 * this function creates a random number between 0-15 as an id, which is used to give the contacts a random number
 * @returns - returns the id for the random color
 */
function randomColor() {
    let id = parseInt(Math.random() * 15);
    return id
}
/**
 * this function is used to create a single first letter which is later on used to sort the names in the contact list alphabetically
 * @param {string} str - the name
 * @returns - returns the first letter of the string
 */
function idLetter(str) {
    let name = str;
    let words = name.split(" ");
    let firstWord = words[0];
    let firstLetter = firstWord.substring(0, 1).toUpperCase();
    return firstLetter;
}

/**
 * this function is used to create the First two letters of a name (if available), and return it
 * @param {string} str - the full name 
 * @returns the first letter(s) of the name
 */
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

/**
 * this function is compares names and compares them and returns which name is longer
 * @param {string} a - name 1 
 * @param {string} b - name 2
 * @returns 
 */
function compareNames(a, b) {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}

/**
 * this function loads the accounts key out of the local storage
 */
async function loadAccounts() {
    try {
        accounts = JSON.parse(await getItem('accounts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * this function sets an array into the remote storage
 * @param {string} key - name of the key
 * @param {*} value - the array
 * @returns 
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

/**
 * this function takes the key out of the remote storage
 * @param {string} key - name of the key 
 * @returns 
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}