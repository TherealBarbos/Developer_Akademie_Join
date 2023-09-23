//--local storage / sign up // 
const STORAGE_TOKEN = '4AVD74O6ONTUSWYBIKRAF3SC5B2U9YW3OCE1JRVE';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let contacts = [{
    'name': 'ersan',
    'email': 'ersan@gmail',
},
{
    'name': 'manuel',
    'email': 'manuel@gmail',
},
{
    'name': 'oliver',
    'email': 'oliver@gmail',
},
{
    'name': 'oliver',
    'email': 'oliver@gmail',
},
{
    'name': 'oliver',
    'email': 'oliver@gmail',
},
{
    'name': 'oliver',
    'email': 'oliver@gmail',
},
{
    'name': 'oliver',
    'email': 'oliver@gmail',
},
{
    'name': 'oliver',
    'email': 'oliver@gmail',
},
{
    'name': 'oliver',
    'email': 'oliver@gmail',
},
{
    'name': 'oliver',
    'email': 'oliver@gmail',
},
]

function load() {
    loadContacts();
    displayContacts();
}

function displayContacts() {
    let list = document.getElementById('contact-list');
    list.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let letter = contact['name'].charAt(0).toUpperCase();
        list.innerHTML += /*html*/`
    <div class="contact">
        <div class="pfp">${letter}</div>
        <div class="contact-info column">
          <div class="name-text" >${contact['name']}</div>
          <div class="email-text">${contact['email']}</div>
        </div>
    </div>
        `;
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