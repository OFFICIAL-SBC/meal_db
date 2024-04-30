const response = JSON.parse(localStorage.getItem('listResponse'));
const API = 'https://www.themealdb.com/api/json/v1/1';

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

function resultSearchByName(data){
    titlePopUpCard.innerText = data.meals[0].strMeal;
    imagePopUpCard.src = data.meals[0].strMealThumb;
    paraphPreparationPopUpCard.innerText = data.meals[0].strInstructions;
    if(data.meals[0].strTags){
        data.meals[0].strTags.split(',').forEach(element => {
            const newTag = document.createElement("li");
            const textTag = document.createTextNode(element);
            newTag.appendChild(textTag);
            tagListPopUpCard.appendChild(newTag); 
        });   
    }

    let listOFIngredients = Object.keys(data.meals[0]).filter(item => item.includes("strIngredient") && data.meals[0][item]);
    
    listOFIngredients.forEach(ingredient => {
        const newTag = document.createElement("li");
        const textTag = document.createTextNode(data.meals[0][ingredient]);
        newTag.appendChild(textTag);
        ingredientsListPopUpCard.appendChild(newTag); 
    });
    displayPopUp();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createsFigureTag(item){

    // Create the figure element
    let figure = document.createElement('figure');
    figure.classList.add("main--gallery-item-general");

    switch(getRandomInt(3)){
    case 0:
        figure.classList.add("main--gallery-item-small");
    break;
    case 1:
        figure.classList.add("main--gallery-item-medium");
    break;
    default:
        figure.classList.add("main--gallery-item-large");
    }

    // Create the img element
    let img = document.createElement('img');
    img.src = item.strMealThumb; // Set the source of the image

    // Create the figcaption element
    let figcaption = document.createElement('figcaption');

    // Create the h3 element
    let h3 = document.createElement('h3');
    h3.textContent = item.strMeal; // Set the text content of h3

    figcaption.appendChild(h3);
    figure.appendChild(img);
    figure.appendChild(figcaption);

    figure.addEventListener(
        "click", 
        (event)=>{
            event.preventDefault();
            let queryParams ={
                's': h3.textContent
            } 
            fetchData(`${API}/search.php`, { params: queryParams}).then(
                (data) => {
                    console.log("Data successfully fetched:", data);
                    resultSearchByName(data);
                }
            );
        }
    )

    return figure;
}

function resultSearchByOtherCriteria(data){
    console.log(typeof data);
    const galleryContainer = document.querySelector('.main--gallery-container');
    data.forEach((item,index) =>{
        if(index <= 17){
        galleryContainer.appendChild(createsFigureTag(item));
        }
    });
}


resultSearchByOtherCriteria(response);




