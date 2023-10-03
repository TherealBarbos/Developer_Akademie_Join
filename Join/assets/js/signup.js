let accounts = [];

function firstLetters(str) {
    let name = str;
    let words = name.split(" ");
    let firstWord = words[0];
    let secondWord = words[1];

    let firstLetter = firstWord.substring(0, 1).toUpperCase();
    let secondLetter = secondWord.substring(0, 1).toUpperCase();

    return firstLetter + secondLetter;
}

/**
 * this function is used to save the account information on the signup page
 */
async function signUp() {
    let name = document.getElementById('input-name').value;
    let email = document.getElementById('input-email').value;
    let password = document.getElementById('input-password').value;
    let confirmPassword = document.getElementById('input-confirm-password').value;
    let createdAt = new Date().getTime();

    if (confirmPassword == password && password > 0) {
        let account = {
            'name': name,
            'email': email,
            'password': password,
            'createdAt': createdAt,
            'firstLetter': firstLetters(name),
        };
        accounts.push(account);
        await setItem('accounts', JSON.stringify(accounts));
        redirectToLogin();
    }
    else {
        alert('your Confirmed password is not equal to your password, or your forgot to type in your name');
    }
    clearSignupInputs();
}

async function redirectToLogin() {
    location.href = "login.html";
}

/**
 * this function is used to clear the Input fields from the Sign up page
 */
function clearSignupInputs() {
    document.getElementById('input-name').value = '';
    document.getElementById('input-email').value = '';
    document.getElementById('input-password').value = '';
    document.getElementById('input-confirm-password').value = '';
}