const screen = document.querySelector('.disp input');
const gen_btn = document.querySelector('#run');
const config_btn = document.querySelector('#config-area');
const config_menu = document.querySelector('.configs');
const container = document.querySelector('.container');
const copy = document.querySelector('#copy-btn');
const close_btn = document.querySelector('#close');
const save_btn = document.querySelector('#save');
const len = document.querySelector('.lenght input');
const checks = document.querySelectorAll('.options input');
const paswrd_container = document.querySelector('.passwords');
const showPassBTN = document.querySelector('.eye-area');
let savedPass = document.querySelectorAll('.pass-text');
const savePass_btn = document.querySelector('#ok');
const nameInput = document.querySelector('.passName');
const passCont = document.querySelector('.passwords');
let chars = {
    lower : 'abcdefghijklmnopqrstuvwxyz',
    upper : 'ABCDEFGHIJKLMNOPQRSTUVWQYZ',
    num : '1234567890',
    sym : '$%@#&/()?¡¿' 
};
let selectedChars = "";
let password = "";
let spassword = "";
let spaces = false;
let s = 0;
let passwords = JSON.parse(localStorage.getItem('passwords'));

displayPasswords();
generatePassword();

function generatePassword(){
    selectedChars = "";
    selectedChars += chars['lower'];
    checks.forEach(option => {
        if(option.checked){
            if(option.id != 'space'){
                selectedChars += chars[option.id];
                spaces=false;
            }
            else if(option.id == 'space'){
                spaces = true;
            }
        }
    });

    for(let i = 0; i < len.value; i++){
        let randomN = Math.floor(Math.random() * selectedChars.length);
        let maxSp = Math.floor(Math.random() * 3);
        if(spaces){
            if((randomN%2) == 0 & s < (maxSp + 1)){
                password+=" ";
                s++;
            }
            else{
                password+=selectedChars[randomN];
            }
        }else{
            password+=selectedChars[randomN];
        }
    }
    s = 0;
    spaces = false;
    screen.value = password;
    spassword = password;
    password = "";
}

function sliderChange(){
    document.querySelector('.lenght span').innerHTML = len.value;
}

let showing = false;
function showPassword(showId) {
    if(showing === false){
        savedPass[showId].type = 'text';
        showing = true;
    }else{
        savedPass[showId].type = 'password';
        showing = false;
    }
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'Backspace'){
        passwords.splice(0, passwords.length);
        localStorage.setItem('passwords',JSON.stringify(passwords));
        displayPasswords();
    }
});

function deletePassword(deleteId){
    let aux = deleteId == 0? deleteId+1: deleteId;
    passwords.splice(deleteId, aux)
    localStorage.setItem('passwords',JSON.stringify(passwords));
    displayPasswords();
    console.log(deleteId);
}

function displayPasswords(){
    let divTag ="";
    if(passwords){
        passwords.forEach(function(password, index){
            divTag += `
            <div class="password">
                <input type="password" class="pass-text" readonly value="${password.password}">
                <div>
                    <div class="eye-area" onclick="showPassword(${index})">
                        <i class="fa-solid fa-eye"></i>
                    </div>
                    <div class="trash-area" onclick="deletePassword(${index})">
                        <i class="fa-solid fa-trash-can" style="color: #c20000;"></i>
                    </div>
                </div>
                <h2 class="password-title">${password.name}</h2>
            </div>
        `
        })
    }
    passCont.innerHTML = divTag || `<span>There is nothing here yet!</span>`; 
    savedPass = document.querySelectorAll('.pass-text');
}

function savePassword(){
    //insert code for save password here
    let passL = {name:nameInput.value, password:spassword};
    passwords = !passwords ? [] : passwords;
    passwords.push(passL);
    localStorage.setItem('passwords',JSON.stringify(passwords));
    displayPasswords();
}

config_btn.addEventListener('click', ()=>{
    config_menu.style.display = 'flex';
    container.style.display = 'none';
    paswrd_container.style.display = 'none';
});
close_btn.addEventListener('click', ()=>{
    config_menu.style.display = 'none';
    container.style.display = 'block';
    paswrd_container.style.display = 'block';
});
save_btn.addEventListener('click', ()=>{
    const save_menu = document.querySelector('.saveMenu');
    container.style.display = 'none';
    paswrd_container.style.display = 'none';
    save_menu.style.display = 'block';
});
savePass_btn.addEventListener('click', () => {
    const save_menu = document.querySelector('.saveMenu');
    if(!!nameInput.value){
        document.querySelector('.saveMenu p').innerHTML = "";
        container.style.display = 'block';
        paswrd_container.style.display = 'block';
        save_menu.style.display = 'none';
        savePassword();
        nameInput.value = "";
    }
    else{
        document.querySelector('.saveMenu p').innerHTML = "Name can not be empty";
    }
});

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(screen.value);
    copy.className = 'fa-solid fa-check';
    copy.style.color = 'rgba(16, 244, 73)';
    setInterval(()=>{
        copy.className = 'fa-regular fa-clipboard';
        copy.style.color = 'rgba(0, 0, 0)';
    }, 2000)
});

len.addEventListener('input', sliderChange);
gen_btn.addEventListener('click', generatePassword);





