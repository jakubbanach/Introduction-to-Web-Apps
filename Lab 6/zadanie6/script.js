const repeat = document.getElementById('repeat');
const newPassword = document.getElementById('new');
const passwordLength = document.getElementById('charEight');
const passwordCapital = document.getElementById('charSpecial');
const passwordSpecial = document.getElementById('charCapital');
const passwordDigit = document.getElementById('charDigit');
const similar = document.getElementById('checkSimilarity');

function togglePassword(inputId, img) {
    var x = document.getElementById(inputId);
    if (x.type === "password") {
      x.type = "text";
      img.src = "img/eye_open.png";
      img.style.width = "25px";
    } else {
        x.type = "password";
        img.src = "img/eye_not_visible.png";
        img.style.width = "30px";
    }
}

repeat.addEventListener('keydown', (event) => {
    console.log("KLIK");
    if (event.key === 'Enter') {
        similar.style.display = 'block';
        if (checkSimilarities()){
            similar.innerText = "Hasła poprawne";
            similar.style.color = 'green';
        }else{
            similar.innerText = "Hasła niepoprawne";
            similar.style.color = 'red';
        }   
    }
});

function checkOK(text){
    const parts = text.split('/');
    return parts.pop();
}

function checkSimilarities(){
    return repeat.value === newPassword.value &&
    checkOK(passwordCapital.src) === "ok.png" &&
    checkOK(passwordLength.src) === "ok.png" &&
    checkOK(passwordSpecial.src) === "ok.png" &&
    checkOK(passwordDigit.src) === "ok.png"
}

function checkPassword(inputId){
    similar.style.display = 'none';
    checkPasswordLength(inputId);
    checkIfSpecialChar(inputId);
    checkIfCapitalLetter(inputId);
    checkIfDigit(inputId);
}

function checkPasswordLength(inputId) {
    const inputField = document.getElementById(inputId);
    const Length = document.getElementById("charEight");
    if (inputField.value.length >= 8) {
        Length.src = "img/ok.png";
    } else {
        Length.src = "img/wrong.png";
    }
}

function checkIfSpecialChar(inputId) {
    const inputField = document.getElementById(inputId);
    const Length = document.getElementById("charSpecial");
    if (inputField.value.match(/[^a-zA-Z\d]/)) {
        Length.src = "img/ok.png";
    } else {
        Length.src = "img/wrong.png";
    }
}

function checkIfCapitalLetter(inputId) {
    const inputField = document.getElementById(inputId);
    const Length = document.getElementById("charCapital");
    if (inputField.value.match(/[A-Z]/)) {
        Length.src = "img/ok.png";
    } else {
        Length.src = "img/wrong.png";
    }
}

function checkIfDigit(inputId) {
    const inputField = document.getElementById(inputId);
    const Length = document.getElementById("charDigit");
    if (inputField.value.match(/\d/)) {
        Length.src = "img/ok.png";
    } else {
        Length.src = "img/wrong.png";
    }
}