let contacts = [];

function redirectToContacts() {
    location.href = "contact.html";
}

async function init2() {
    loadAccounts();
    loadContacts();
}

/**
 * this function is used to log in the person. it checks if the email and password exists.
 *  If the email and password are valid. the user gets logged in!
 */
async function AddContact() {
    let email = document.getElementById('input-email');
    let name = document.getElementById('input-name');
    let account = accounts.find(a => a.email == email.value && a.name == name.value);
    if (account) {
        console.log('Account gefunden');
        let contact = {
            'name': name.value,
            'email': email.value,
        };
        contacts.push(contact)
        await setItem('contacts', JSON.stringify(contacts));
    }
    clearLoginInputs();
}

/**
 * this function is used to clear the Input fields from the Sign up page
 */
function clearLoginInputs() {
    document.getElementById('input-email').value = '';
    document.getElementById('input-name').value = '';
    document.getElementById('input-phone').value = '';
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