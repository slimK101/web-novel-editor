const users = [{
    username: "slim",
    email: "slimabdelkefi2@gmail.com",
    password: "abdelkefi",
    role: "apprenant"
}];

function validateUsername() {
    const usernameInput = document.getElementById('username');
    const usernameError = document.getElementById('usernameError');
    if (usernameInput.value.trim() === '') {
        usernameInput.style.borderColor = 'red';
        usernameError.hidden = false;
        usernameError.textContent = "Nom d'utilisateur est obligatoire";
    } else {
        usernameInput.style.borderColor = 'black';
        usernameError.hidden = true;
    }
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    if (emailInput && emailInput.value.trim() === '') {
        emailInput.style.borderColor = 'red';
        emailError.hidden = false;
        emailError.textContent = "Adresse e-mail est obligatoire";
    } else if (emailInput) {
        emailInput.style.borderColor = 'black';
        emailError.hidden = true;
    }
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwdError = document.getElementById('passwdError');
    if (passwordInput.value.trim().length < 6) {
        passwordInput.style.borderColor = 'red';
        passwdError.hidden = false;
        passwdError.textContent = "Le mot de passe doit contenir au moins 6 caractères";
    } else {
        passwordInput.style.borderColor = 'black';
        passwdError.hidden = true;
    }
}

function validateConfirmPassword() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const confirmPassError = document.getElementById('confirmPassError');
    if (confirmPasswordInput && passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.style.borderColor = 'red';
        confirmPassError.hidden = false;
        confirmPassError.textContent = "Les mots de passe ne correspondent pas";
    } else if (confirmPasswordInput) {
        confirmPasswordInput.style.borderColor = 'black';
        confirmPassError.hidden = true;
    }
}

function handleSignUp() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm_password').value.trim();
    const role = document.querySelector('input[name="role"]:checked')?.value;
    
    if (username === '' || email === '' || password.length < 6 || password !== confirmPassword || !role) {
        alert("Veuillez remplir correctement tous les champs");
        return false;
    }

    users.push({ username, email, password, role });
    alert(`Compte créé avec succès ! Bienvenue ${username}`);

    return true;
}

function handleSignIn() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorContainer = document.getElementById('SaisieError');

    const userFound = users.find(user => user.username === username && user.password === password);

    if (userFound) {
        alert(`Bienvenue ${username}`);
        location.href="index.html";
        return true;
    } else {
        errorContainer.hidden = false;
        errorContainer.textContent = "Nom d'utilisateur ou mot de passe incorrect";
        return false;
    }
}

document.getElementById('validButton')?.addEventListener('click', (event) => {
    event.preventDefault();
    handleSignIn();
});

document.getElementById('inscrit')?.addEventListener('click', (event) => {
    if (!handleSignUp()) {
        event.preventDefault();
    }
});


document.getElementById('username')?.addEventListener('input', validateUsername);
document.getElementById('email')?.addEventListener('input', validateEmail);
document.getElementById('password')?.addEventListener('input', validatePassword);
document.getElementById('confirm_password')?.addEventListener('input', validateConfirmPassword);
