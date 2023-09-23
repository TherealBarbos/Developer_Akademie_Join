let accounts = [];
/**
 * this function is used to save the account information on the signup page
 */
async function signUp() {
    let name = document.getElementById('input-name').value
    let email = document.getElementById('input-email').value
    let password = document.getElementById('input-password').value
    let confirmPassword = document.getElementById('input-confirm-password').value
    let createdAt = new Date().getTime();

    if (confirmPassword == password && password > 0) {
        let account = {
            'name': name,
            'email': email,
            'password': password,
            'createdAt': createdAt,
        };
        accounts.push(account);
        console.log(accounts);
        await setItem('accounts', JSON.stringify(accounts));
    }
    else {
        alert('your Confirmed password is not equal to your password, or your forgot to type in your name');
    }
    clearSignupInputs();
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