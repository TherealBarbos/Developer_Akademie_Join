let index = [];

async function init() {
    await loadContacts();
    getIndexArray();
    setContactValues();
}

//async function deleteContact() {
//    contacts.splice(index, 1);
//    await setItem('contacts', contacts);
//    redirectToContacts();
//}

async function saveContactValues() {
    let email = document.getElementById('input-email');
    let name = document.getElementById('input-name');
    let phone = document.getElementById('input-phone');
    let contact = {
        'name': name.value,
        'email': email.value,
        'phone': phone.value,
    };
    contacts.splice(index, 1);
    contacts.splice(index, 0, contact);
    await setItem('contacts', contacts);
    redirectToContacts();
}

function setContactValues() {
    document.getElementById('input-name').value = `${contacts[index]['name']}`;
    document.getElementById('input-email').value = `${contacts[index]['email']}`;
    document.getElementById('input-phone').value = `${contacts[index]['phone']}`;
}

function redirectToContacts() {
    location.href = "contact.html";
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getIndexArray() {
    index = getArray('index');
}

async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
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