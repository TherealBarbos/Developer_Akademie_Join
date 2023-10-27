async function saveContactValues(i) {
    let email = document.getElementById('edit-input-email');
    let name = document.getElementById('edit-input-name');
    let phone = document.getElementById('edit-input-phone');
    let colorId = contacts[i]['colorId'];
    let firstLetter = contacts[i]['firstLetter'];
    let id = contacts[i]['id'];

    let contact = {
        'name': name.value,
        'email': email.value,
        'phone': phone.value,
        'firstLetter': firstLetter,
        'colorId': colorId,
        'id': id,
    };
    
    contacts.splice(i, 1);
    contacts.splice(i, 0, contact);
    await setItem('contacts', contacts);
    loadContacts();
    displayContacts()
    redirectEditContactToContacts();
}

function setContactValues(index) {
    document.getElementById('edit-input-name').value = `${contacts[index]['name']}`;
    document.getElementById('edit-input-email').value = `${contacts[index]['email']}`;
    document.getElementById('edit-input-phone').value = `${contacts[index]['phone']}`;
    document.getElementById('saveContactValue').innerHTML = /*html*/`
    <span onclick="saveContactValues(${index})">Save <img src="../img/check.svg" alt="check"></span>
    `
}

async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}
