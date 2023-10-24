let contacts = []
let letters = []
let buttonEditDelete = false;
let addcontactOverlay = document.getElementById("addcontact-overlay");
let editcontactOverlay = document.getElementById("editcontact-overlay");

editcontactOverlay.addEventListener("click", function (event) {
    if (event.target === editcontactOverlay) {
        redirectEditContactToContacts();
    }
});

addcontactOverlay.addEventListener("click", function (event) {
    if (event.target === addcontactOverlay) {
        redirectAddContactToContacts();
    }
});


function displayEditDeleteContact() {
    if (buttonEditDelete == false) {
        document.getElementById('btn-display-edit-delete').classList.remove('btn-mobile-d-none');
        buttonEditDelete = true;
    } else if (buttonEditDelete == true) {
        document.getElementById('btn-display-edit-delete').classList.add('btn-mobile-d-none');
        buttonEditDelete = false;
    }
}

function returnToContactList() {
    let details = document.getElementById('details');
    let contactlist = document.getElementById('contact-list');
    contactlist.classList.remove('disappear-after-query');
    details.classList.add('disappear-after-query');
    document.getElementById('details').innerHTML = '';
}

function redirectEditContactToContacts() {
    document.getElementById('editcontact').classList.add('d-none');
    document.getElementById('editcontact-overlay').classList.remove('bg-gray');
    loadContacts();
    displayContacts();
    document.getElementById('details').innerHTML = '';

    let details = document.getElementById('details');
    let contactlist = document.getElementById('contact-list');
    contactlist.classList.remove('disappear-after-query');
    details.classList.add('disappear-after-query');
}

function redirectAddContactToContacts() {
    document.getElementById('addcontact').classList.add('d-none');
    document.getElementById('addcontact-overlay').classList.remove('bg-gray');
    loadContacts();
    displayContacts();
    document.getElementById('details').innerHTML = '';
}

function openAddContact() {
    document.getElementById('addcontact').classList.remove('d-none');
    document.getElementById('addcontact-overlay').classList.add('bg-gray');
}

/**
 * this function is used to log in the person. it checks if the email and password exists.
 *  If the email and password are valid. the user gets logged in!
 */
async function addContact() {
    let email = document.getElementById('input-email-addcontact');
    let name = document.getElementById('input-name-addcontact');
    let phone = document.getElementById('input-phone-addcontact');

    let account = accounts.find(a => a.email == email.value && a.name == name.value);
    if (account) {
        console.log('Account gefunden');
        let contact = {
            'name': name.value,
            'email': email.value,
            'phone': '+' + phone.value,
            'firstLetter': firstLetters(name.value),
            'id': idLetter(name.value),
            'colorId': account['colorId'],
        };
        contacts.push(contact)
        await setItem('contacts', JSON.stringify(contacts));
    }
    clearLoginInputs();
    redirectAddContactToContacts();
}


/**
 * this function is used to clear the Input fields from the Sign up page
 */
function clearLoginInputs() {
    document.getElementById('input-email-addcontact').value = '';
    document.getElementById('input-name-addcontact').value = '';
    document.getElementById('input-phone-addcontact').value = '';
}

//
async function load() {
    await loadContacts();
    loadAccounts();
    collectLetters();
    displayContacts();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    setItem('contacts', contacts);

    let details = document.getElementById('details');
    let contactlist = document.getElementById('contact-list');
    contactlist.classList.remove('disappear-after-query');
    details.classList.add('disappear-after-query');

    load();
    document.getElementById('details').innerHTML = '';
}

function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function editContact(index) {
    document.getElementById('editcontact').classList.remove('d-none');
    document.getElementById('editcontact-overlay').classList.add('bg-gray');
    setContactValues(index);
    document.getElementById('EditContactFirstLettersColor').classList.add(`color${contacts[index]['colorId']}`);
    document.getElementById('EditContactFirstLettersColor').classList.add('editContactLetter');
    document.getElementById('EditContactFirstLettersColor').innerHTML = `${contacts[index]['firstLetter']}`;
}

function displayContactDetails(index) {
    let details = document.getElementById('details');
    let contactlist = document.getElementById('contact-list');
    contactlist.classList.add('disappear-after-query');
    details.classList.remove('disappear-after-query');

    details.innerHTML = '';
    details.innerHTML = /*html*/`
    
    <div class="details-upper-part">
      <div class="details-pfp color${contacts[index]['colorId']}">${contacts[index]['firstLetter']}  </div>
      <div class="gap">
        <div class="details-name">${contacts[index]['name']}</div>
        <div class="edit-delete disappear-after-smallest-query">
          <div onclick="editContact(${index})" class="flex">
            <img src="../img/edit.png" alt="edit">
            <div>Edit</div>
          </div>
          <div onclick="deleteContact(${index})" class="flex">
            <img src="../img/delete.png" alt="delete">
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

    <img onclick="returnToContactList()" class="disappear-until-mobile btn-mobile-backtocontactlist" src="../img/arrow-left-line.svg" alt="arrow">

    <div id="btn-display-edit-delete" class="disappear-until-mobile btn-mobile-edit-delete btn-mobile-d-none">

    <div class="mobile-edit-delete">
          <div onclick="editContact(${index})" class="flex">
            <img src="../img/edit.png" alt="edit">
            <div>Edit</div>
          </div>
          <div onclick="deleteContact(${index})" class="flex">
            <img src="../img/delete.png" alt="delete">
            <div>Delete</div>
          </div>
        </div>
    </div>

    <div onclick="displayEditDeleteContact()" class="btn-mobile-display-edit-delete disappear-until-mobile">
      <img src="../img/more_vert.png" alt="dots">
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
                                 <div onclick="displayContactDetails(${i})" class="contact">
                           <div class="pfp color${contact['colorId']}">${letter}</div>
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
          <div onclick="displayContactDetails(${i})" class="contact">
              <div class="pfp  color${contact['colorId']}">${letter}</div>
              <div class="contact-info column">
                <div class="name-text" >${contact['name']}</div>
                <div class="email-text">${contact['email']}</div>
              </div>
          </div>
        `;
        }
    }

    list.innerHTML += /*html*/`
     <div onclick="openAddContact()" class="btn-mobile-display-addcontact disappear-until-mobile">
        <img src="../img/person_add.png" alt="person-add">
    </div>
    `
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