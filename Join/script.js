//--local storage / sign up // 
let accounts = [];
const STORAGE_TOKEN = '4AVD74O6ONTUSWYBIKRAF3SC5B2U9YW3OCE1JRVE';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function init() {
    load();
}

async function load() {
    try {
        accounts = JSON.parse(await getItem('accounts'));
    } catch (e) {
        //console.error('Loading error:', e);
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

/**
 * this function is used to save the account information on the signup page
 */
async function signUp() {
    let name = document.getElementById('input-name').value
    let email = document.getElementById('input-email').value
    let password = document.getElementById('input-password').value
    let confirmPassword = document.getElementById('input-confirm-password').value
    let createdAt = new Date().getTime();

    if (confirmPassword == password && password > 0) {
        let account = {
            'name': name,
            'email': email,
            'password': password,
            'createdAt': createdAt,
        };
        accounts.push(account);
        console.log(accounts);
        await setItem('accounts', JSON.stringify(accounts))
    }
    else {
        alert('your Confirmed password is not equal to your password, or your forgot to type in your name');
    }
    clearSignupInputs();
}

/**
 * this function is used to clear the Input fields from the Sign up page
 */
function clearSignupInputs() {
    document.getElementById('input-name').value = '';
    document.getElementById('input-email').value = '';
    document.getElementById('input-password').value = '';
    document.getElementById('input-confirm-password').value = '';
}