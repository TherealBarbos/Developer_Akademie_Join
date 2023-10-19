let UserFirstLetter = []

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    pasteFirstLetter();
}

function pasteFirstLetter() {
    let box = document.getElementById('firstletterbox');
    firstletter = getArray('firstLetter');
    UserFirstLetter.push(firstletter);

    box.innerHTML = '';
    box.innerHTML = `${UserFirstLetter}`;
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key));
}