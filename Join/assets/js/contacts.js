let contacts = []
let letters = []
let buttonEditDelete = false;
let guestcontacts = []

/**
 * this evenlistener checks if the DOM is loaded, if yes -> it checks if the background on the edit-/add contact overlay is being clicked and closes the overlay
 */
document.addEventListener("DOMContentLoaded", function () {
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
});

/**
 * this function toggles the edit-/delete contact window on the mobile view
 */
function displayEditDeleteContact() {
    if (!buttonEditDelete) {
        document.getElementById('btn-display-edit-delete').classList.remove('btn-mobile-d-none');
        buttonEditDelete = true;
    } else if (buttonEditDelete) {
        document.getElementById('btn-display-edit-delete').classList.add('btn-mobile-d-none');
        buttonEditDelete = false;
    }
}

/**
 * this function closes the contact details and displays the contact list on the mobile view
 */
function returnToContactList() {
    let details = document.getElementById('details');
    let contactlist = document.getElementById('contact-list');
    contactlist.classList.remove('disappear-after-query');
    details.classList.add('disappear-after-query');
    document.getElementById('details').innerHTML = '';
}

/**
 * this function closes the edit contact overlay
 */
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

/**
 * this fuction closes the add contact overlay
 */
function redirectAddContactToContacts() {
    document.getElementById('addcontact').classList.add('d-none');
    document.getElementById('addcontact-overlay').classList.remove('bg-gray');
    loadContacts();
    displayContacts();
    document.getElementById('details').innerHTML = '';
}

/**
 * this function opens the add contact overlay
 */
function openAddContact() {
    document.getElementById('addcontact').classList.remove('d-none');
    document.getElementById('addcontact-overlay').classList.add('bg-gray');
}

/**
 * this function sets the values from the input fields and puts them into a Json
 * @returns the contact
 */
function createNewContact() {
    let email = document.getElementById('input-email-addcontact');
    let name = document.getElementById('input-name-addcontact');
    let phone = document.getElementById('input-phone-addcontact');

    return contact = {
        'name': name.value,
        'email': email.value,
        'phone': '+' + phone.value,
        'firstLetter': firstLetters(name.value),
        'id': idLetter(name.value),
        'colorId': randomColor(),
    };
}

/**
 * this function adds a new contact to the contacts array and saves it
 */
async function addContact() {
    let contact = createNewContact();
    let username = getArray('name');

    if (username == 'Guest') {
        guestcontacts.push(contact);
    } else {
        contacts.push(contact);
        await setItem('contacts', JSON.stringify(contacts));
    }

    clearLoginInputs();
    displayContacts();
    redirectAddContactToContacts();
}

/**
 * this function is used to clear the Input fields of the add contact overlay
 */
function clearLoginInputs() {
    document.getElementById('input-email-addcontact').value = '';
    document.getElementById('input-name-addcontact').value = '';
    document.getElementById('input-phone-addcontact').value = '';
}

/**
 * this function is initialized when the DOM has loaded
 */
async function load() {
    await loadContacts();
    loadAccounts();
    collectLetters();
    displayContacts();
    checkGuestGiveAlert();
}

/**
 * this function checks if a guest has logged in and gives them the information that they can't add or edit their own contacts unless they're signed in
 */
function checkGuestGiveAlert() {
    let username = getArray('name');
    if (username == 'Guest') {
        document.getElementById('alert-message').classList.remove('d-none');
    }
}

/**
 * this function closes the informations window for the guest
 */
function alertButtonOk() {
    document.getElementById('alert-message').classList.add('d-none');
}

/**
 * this function deletes the contact out of the contacts array
 * @param {index} index 
 */
function deleteContact(index) {
    contacts.splice(index, 1);
    setItem('contacts', contacts);
    let details = document.getElementById('details');
    let contactlist = document.getElementById('contact-list');
    contactlist.classList.remove('disappear-after-query');
    details.classList.add('disappear-after-query');
    loadContacts();
    displayContacts();
    document.getElementById('details').innerHTML = '';
}

/**
 * this function sets an array in the local storage
 * @param {string} key - name of the array 
 * @param {array} array 
 */
function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

/**
 * this function edits the key values of the contact and saves them
 * @param {index} index 
 */
function editContact(index) {
    document.getElementById('editcontact').classList.remove('d-none');
    document.getElementById('editcontact-overlay').classList.add('bg-gray');
    setContactValues(index);
    document.getElementById('EditContactFirstLettersColor').classList.add(`color${contacts[index]['colorId']}`);
    document.getElementById('EditContactFirstLettersColor').classList.add('editContactLetter');
    document.getElementById('EditContactFirstLettersColor').innerHTML = `${contacts[index]['firstLetter']}`;
}

/**
 * this function displays the details of the contact next to the contact list
 * @param {index} index - index of the contact
 */
function displayContactDetails(index) {
    contacts.sort(compareNames);
    let details = document.getElementById('details');
    let contactlist = document.getElementById('contact-list');
    contactlist.classList.add('disappear-after-query');
    details.classList.remove('disappear-after-query');
    details.innerHTML = contactDetailsTemplate(index);
    details.style.animation = 'none'; // Animation deaktivieren
    void details.offsetWidth; // Repaint erzwingen
    details.style.animation = null; // Animation aktivieren
}

/**
 * this function displays the contacts in the contact list
 */
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
                            <div onclick="displayContactDetails(${i})" tabindex="${i}" class="contact">
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
            <div onclick="displayContactDetails(${i})" tabindex="${i}" class="contact">
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

/**
 * this function cheks if there is already a section in the contact list for the specific first letter of the name
 */
function collectLetters() {
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        const FirstLetter = contact['name'].charAt(0).toUpperCase();

        if (!letters.includes(FirstLetter)) {
            letters.push(FirstLetter);
        }
    }
}

/**
 * this function is used to load the contacts array out of the remote storage
 */
async function loadContacts() {
    let username = getArray('name');
    if (username == 'Guest') {
        try {
            contacts = JSON.parse(await getItem('guestcontacts'));
        } catch (e) {
            console.error('Loading error:', e);
        }
    } else {
        try {
            contacts = JSON.parse(await getItem('contacts'));
        } catch (e) {
            console.error('Loading error:', e);
        }
    }
}

/**
 * this function is a template for the contact details
 * @param {index} index - index of the contact 
 * @returns - the template
 */
function contactDetailsTemplate(index) {
    return /*html*/`
    
    <div class="details-upper-part">
      <div class="details-pfp color${contacts[index]['colorId']}">${contacts[index]['firstLetter']}  </div>
      <div class="gap">
        <div class="details-name">${contacts[index]['name']}</div>
        <div class="edit-delete disappear-after-smallest-query">
          <div onclick="editContact(${index})" class="flex">
          <div id="edit-btn-hover" >
            <div id="edit-btn-hover-normal" class="flex">
              <img src="../img/edit.png" alt="edit">
              <div>Edit</div>
            </div>
            <div id="edit-btn-hover-blue" class="flex onhover-cursor-pointer">
              <img src="../img/edit-blue.png" alt="edit">
              <div>Edit</div>
            </div>
          </div>
          </div>
          <div onclick="deleteContact(${index})" class="flex">
          <div id="delete-btn-hover" >
            <div id="delete-btn-hover-normal" class="flex">
              <img src="../img/delete.png" alt="delete">
              <div>Delete</div>
            </div>
            <div id="delete-btn-hover-blue" class="flex onhover-cursor-pointer">
              <img src="../img/delete-blue.png" alt="delete">
              <div>Delete</div>
            </div>
          </div>
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
          <div id="edit-btn-hover" >
            <div id="edit-btn-hover-normal" class="flex">
              <img src="../img/edit.png" alt="edit">
              <div>Edit</div>
            </div>
            <div id="edit-btn-hover-blue" class="flex onhover-cursor-pointer">
              <img src="../img/edit-blue.png" alt="edit">
              <div>Edit</div>
            </div>
          </div>
          </div>
          
          <div onclick="deleteContact(${index})" class="flex">
          <div id="delete-btn-hover" >
            <div id="delete-btn-hover-normal" class="flex">
              <img src="../img/delete.png" alt="delete">
              <div>Delete</div>
            </div>
            <div id="delete-btn-hover-blue" class="flex onhover-cursor-pointer">
              <img src="../img/delete-blue.png" alt="delete">
              <div>Delete</div>
            </div>
          </div>
          </div>
        </div>
    </div>

    <div onclick="displayEditDeleteContact()" class="btn-mobile-display-edit-delete disappear-until-mobile">
      <img src="../img/more_vert.png" alt="dots">
    </div>
`
}

/**
 * this function sets an item in the remote storage
 * @param {string} key - name of the key
 * @param {array} value 
 * @returns 
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

/**
 * this function takes the array out of the remote storage
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