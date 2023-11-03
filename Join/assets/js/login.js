/**
 * this function is used to log in the person. it checks if the email and password exists.
 *  If the email and password are valid. the user gets logged in and redirected to the summary page
 */
function login() {
    let email = document.getElementById('input-email');
    let password = document.getElementById('input-password');
    let account = accounts.find(a => a.email == email.value && a.password == password.value);
    if (account) {
        setArray('name', account.name);
        setArray('firstLetter', account.firstLetter);
        redirectToSummary();
    } else {
        document.getElementById('input-password').classList.add('red-input');
        document.getElementById('wrong-password').classList.remove('d-none');
    }
    clearLoginInputs();
}

/**
 * this function logs the user in as a guest
 */
function guestLogin() {
    setArray('name', 'Guest');
    setArray('firstLetter', 'GU');
    redirectToSummary();
}

/**
 * this function is used to clear the Input fields from the login page
 */
function clearLoginInputs() {
    document.getElementById('input-email').value = '';
    document.getElementById('input-password').value = '';
}

/**
 * this function redirects the user to the summary page
 */
function redirectToSummary() {
    location.href = "summary.html";
}

/**
 * this function redirects the user to the sing up page
 */
function redirectToSignUp() {
    location.href = "signup.html";
}