let contacts = []
let letters = []

function redirectEditContactToContacts() {
    document.getElementById('editcontact').classList.add('d-none');
    document.getElementById('editcontact').classList.remove('bg-gray');
    loadContacts();
    displayContacts();
    document.getElementById('details').innerHTML = '';
}

function redirectAddContactToContacts() {
    document.getElementById('addcontact').classList.add('d-none');
    document.getElementById('addcontact').classList.remove('bg-gray');
    loadContacts();
    displayContacts();
    document.getElementById('details').innerHTML = '';
}


/**
 * this function is used to log in the person. it checks if the email and password exists.
 *  If the email and password are valid. the user gets logged in!
 */
async function AddContact() {
    let email = document.getElementById('input-email');
    let name = document.getElementById('input-name');
    let phone = document.getElementById('input-phone');

    let account = accounts.find(a => a.email == email.value && a.name == name.value);
    if (account) {
        console.log('Account gefunden');
        let contact = {
            'name': name.value,
            'email': email.value,
            'phone': '+' + phone.value,
            'firstLetter': firstLetters(name.value),
            'id': idLetter(name.value),
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

//
async function load() {
    await loadContacts();
    loadAccounts();
    collectLetters();
    displayContacts();
}

function openAddContact() {
    document.getElementById('addcontact').classList.remove('d-none');
    document.getElementById('addcontact').classList.add('bg-gray');
}

function deleteContact(index) {
    contacts.splice(index, 1);
    setItem('contacts', contacts);
    load();
    document.getElementById('details').innerHTML = '';
}

function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function editContact(index) {
    document.getElementById('editcontact').classList.remove('d-none');
    document.getElementById('editcontact').classList.add('bg-gray');
    setContactValues(index);
}

function displayContactDetails(index) {
    let details = document.getElementById('details');
    details.innerHTML = '';
    details.innerHTML = /*html*/`
    
    <div class="details-upper-part">
      <div class="details-pfp">${contacts[index]['firstLetter']}  </div>
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
    contacts.sort(compareNames);

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let letter = contact['firstLetter'];
        let contact_id = contact['id'];
        let id = document.getElementById(`${contact_id}`);

        if (document.getElementById(contact_id) == undefined) {
            list.innerHTML += /*html*/`
                <div>
                    <span class="list-letter">${contact_id}</span>
                    <div class="line"> </div>
                    <div id="${contact_id}">
                                 <div onclick="displayContactDetails(${i})" class="contact" id='${contact_id}'>
                           <div class="pfp">${letter}</div>
                           <div class="contact-info column">
                             <div class="name-text" >${contact['name']}</div>
                             <div class="email-text">${contact['email']}</div>
                           </div>
                       </div>
                    </div>
        </div>
            `;
        } else {
            id.innerHTML += /*html*/`
          <div onclick="displayContactDetails(${i})" class="contact" id='${contact_id}'>
              <div class="pfp">${letter}</div>
              <div class="contact-info column">
                <div class="name-text" >${contact['name']}</div>
                <div class="email-text">${contact['email']}</div>
              </div>
          </div>
        `;
        }
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