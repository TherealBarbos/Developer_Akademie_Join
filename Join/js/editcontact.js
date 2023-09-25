let index = [];

async function init() {
    await loadContacts();
    await loadIndex();
    displayContactInfo();
}

function displayContactInfo() {
    document.getElementById('input-name').value = `${contacts[`${index[0]}`]['name']}`;
}

function redirectToContacts() {
    location.href = "contact.html";
}

async function loadIndex() {
    try {
        index = JSON.parse(await getItem('index'));
    } catch (e) {
        console.error('Loading error:', e);
    }
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