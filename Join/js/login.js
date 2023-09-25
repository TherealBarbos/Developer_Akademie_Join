/**
 * this function is used to log in the person. it checks if the email and password exists.
 *  If the email and password are valid. the user gets logged in!
 */
function login() {
    let email = document.getElementById('input-email');
    let password = document.getElementById('input-password');
    let account = accounts.find(a => a.email == email.value && a.password == password.value);
    console.log(account);
    if (account) {
        console.log('Account gefunden');
        redirectToSummary();
    }
    clearLoginInputs();
}

/**
 * this function is used to clear the Input fields from the Sign up page
 */
function clearLoginInputs() {
    document.getElementById('input-email').value = '';
    document.getElementById('input-password').value = '';
}

function redirectToSummary() {
    location.href = "summary.html";
}

function redirectToSignUp() {
    location.href = "signup.html";
}