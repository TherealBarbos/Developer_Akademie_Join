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
    }
}

