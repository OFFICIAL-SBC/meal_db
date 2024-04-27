const API = ' www.themealdb.com/api/json/v1/1';
let popUpBox = document.getElementById('popUp');
const button = document.querySelector('.main__submit-button');

//Display POP-UP
function displayPopUp() {
    console.log('clicked');
  popUpBox.classList.add("display");
}

//Close POP-UP
function closePopUp() {
  popUpBox.classList.remove("display");
}

button.addEventListener("click",displayPopUp);