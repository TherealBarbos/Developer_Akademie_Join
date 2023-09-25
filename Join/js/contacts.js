//--local storage / sign up // 
const STORAGE_TOKEN = '4AVD74O6ONTUSWYBIKRAF3SC5B2U9YW3OCE1JRVE';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let contacts = []
let letters = []

async function load() {
    await loadContacts();
    collectLetters();
    displayContacts();
}

function addContact() {
    location.href = "addcontact.html";
}

function deleteContact(index) {
    contacts.splice(index, 1);
    setItem('contacts', contacts);
    load();
}

function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function editContact(index) {
    setArray('index', index);
    location.href = 'editcontact.html';
}

function displayContactDetails(index) {
    let details = document.getElementById('details');
    details.innerHTML = '';
    details.innerHTML = /*html*/`
    
    <div class="details-upper-part">
      <div class="details-pfp">pfp</div>
      <div class="gap">
        <div class="details-name">${contacts[index]['name']}</div>
        <div class="edit-delete">
          <div onclick="editContact(${index})" class="flex">
            <img src="assets/img/edit.png" alt="edit">
            <div>Edit</div>
          </div>
          <div onclick="deleteContact(${index})" class="flex">
            <img src="assets/img/delete.png" alt="delete">
            <div>Delete</div>
          </div>
        </div>
      </div>
    </div>

    <span class="details-info-text">Contact Information</span>

    <div class="details-email-phone">
        <div class="details-mini-headline">Email</div>
        <div class="details-email">${contacts[index]['email']}</div>
        <div class="details-mini-headline">Phone</div>
        <div>${contacts[index]['phone']}</div>
    </div>
`
}

function displayContacts() {
    let list = document.getElementById('contact-list');
    list.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        const letter = contact['name'].charAt(0).toUpperCase();
        list.innerHTML += /*html*/`
          <div onclick="displayContactDetails(${i})" class="contact" id='${letter}'>
              <div class="pfp">${letter}</div>
              <div class="contact-info column">
                <div class="name-text" >${contact['name']}</div>
                <div class="email-text">${contact['email']}</div>
              </div>
          </div>
        `;
    }
}

function collectLetters() {
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        const FirstLetter = contact['name'].charAt(0).toUpperCase();

        if (!letters.includes(FirstLetter)) {
            letters.push(FirstLetter);
        }
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