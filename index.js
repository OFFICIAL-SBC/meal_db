const API = "https://www.themealdb.com/api/json/v1/1";

const buttonSearch = document.querySelector(".main__submit-button");
const displayableList = document.querySelector("#searchOptions");
const inputTagFood = document.getElementById("meal");


//* Components of the pop-up card
const popUpBox = document.getElementById('popUp');
const imagePopUpCard = document.getElementById('img-pop-up');
const titlePopUpCard = document.getElementById('title-pop-up');
const tagListPopUpCard = document.querySelector('.pop-up-container__tag-list');
const ingredientsListPopUpCard = document.getElementById('ingredients-list');
const paraphPreparationPopUpCard = document.getElementById('preparation-p');


//Display POP-UP
function displayPopUp() {
  console.log("clicked");
  popUpBox.classList.add("display");
}

//Close POP-UP
function closePopUp() {
  popUpBox.classList.remove("display");
}

//Function fetch the data
async function fetchData(urlApi, params) {
  try {
    const response = await axios.get(urlApi, params); //* Wait for the HTTP request to resolve
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

//Function that handles the data for a name-meal based search
function resultSearchByName(data){
  titlePopUpCard.innerText = data.meals[0].strMeal;
  imagePopUpCard.src = data.meals[0].strMealThumb;
  paraphPreparationPopUpCard.innerText = data.meals[0].strInstructions;
  data.meals[0].strTags.split(',').forEach(element => {
    const newTag = document.createElement("li");
    const textTag = document.createTextNode(element);
    newTag.appendChild(textTag);
    tagListPopUpCard.appendChild(newTag); 
  });

  let listOFIngredients = Object.keys(data.meals[0]).filter(item => item.includes("strIngredient") && data.meals[0][item]);
  
  listOFIngredients.forEach(ingredient => {
    const newTag = document.createElement("li");
    const textTag = document.createTextNode(data.meals[0][ingredient]);
    newTag.appendChild(textTag);
    ingredientsListPopUpCard.appendChild(newTag); 
  });
  displayPopUp();
}


buttonSearch.addEventListener("click", (event) => {
  event.preventDefault(); // ! Prevent the button reloads the whole page
  let queryParams = {};
  if (!inputTagFood.value) {
    alert("You need to enter a petition");
  } else {
    if (displayableList.value === "option") {
      alert("Please select a search criteria");
    } else {
      queryParams[displayableList.value] = inputTagFood.value;
      console.log(queryParams);
      let url = displayableList.value === "s" ? `${API}/search.php`: `${API}/filter.php`;
      console.log(url);
      fetchData(url, { params: queryParams }).then(
        (data) => {
          if (data) {
            console.log("Data successfully fetched:", data);
            resultSearchByName(data);
          } else {
            console.log("Failed to fetch data.");
          }
        }
      );
    }
  }
});
