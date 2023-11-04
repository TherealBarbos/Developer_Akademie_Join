/**
 * this function saves the contact values in the remote storage and redirects the user to the contacts page
 * @param {index} i -index 
 */
async function saveContactValues(i) {
    let username = getArray('name');
    let contact = contactValue(i);

    contacts.splice(i, 1);
    contacts.splice(i, 0, contact);
    if (username == 'Guest') {
    } else {
        await setItem('contacts', contacts);
    }
    redirectEditContactToContacts();
}

/**
 * this function creates the contact based on the input fields
 * @returns -the contact value
 */
function contactValue(i) {
    let email = document.getElementById('edit-input-email');
    let name = document.getElementById('edit-input-name');
    let phone = document.getElementById('edit-input-phone');
    let colorId = contacts[i]['colorId'];
    let firstLetter = contacts[i]['firstLetter'];
    let id = contacts[i]['id'];

    return contact = {
        'name': name.value,
        'email': email.value,
        'phone': phone.value,
        'firstLetter': firstLetter,
        'colorId': colorId,
        'id': id,
    };
}

/**
 * this function sets the contact values into the input field of the edit overlay 
 * @param {index} index 
 */
function setContactValues(index) {
    document.getElementById('edit-input-name').value = `${contacts[index]['name']}`;
    document.getElementById('edit-input-email').value = `${contacts[index]['email']}`;
    document.getElementById('edit-input-phone').value = `${contacts[index]['phone']}`;
    document.getElementById('submit-edited-contact').setAttribute('onsubmit', `saveContactValues(${index}); return false`);
}
