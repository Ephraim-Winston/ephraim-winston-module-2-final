
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const formBtn = document.querySelector('button');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const prioritySelect = document.getElementById('prioritySelect');
let selectedPriority = document.getElementById('prioritySelect').value;
//Bringing my prioritization drop down into DOM
//let setPrior = false;
let isEditMode = false 
//Displays items from local storage upon page load.
function updateSelectedPriority(){
    selectedPriority = document.getElementById('prioritySelect').value;
}

//When I initialize selectedPriority inside the function my function works. But when initialized globally the alert
//runs regardless of whether or not a priority is selected I DON'T WANT THIS 
function validateForm(){
    updateSelectedPriority()
    //const selectedPriority = document.getElementById('prioritySelect').value;
    //this doesnt work because prioritySelect is "high" by default which is not an empty string 
    if(selectedPriority===''){
        
        
        alert('Please select a priority before submitting');
        return false;
    } else{
        return true;
    }
    
}
//function that when differet options are clicked the value of the select 
//is set to the content of the option that was clicked 


function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));

    checkUI();
}
function hidePriorities(){
    //when not setting priorities 
    
    //do not display the prority dropdown
    if (setPrior === false){
    const priorDrop = document.getElementById('priority');
    priorDrop.style.display = 'none';
    }

    
}
/*function displayPrior(){
    let setPrior = true;

    if (setPrior===true){
        const priorDrop = document.getElementById('priority');
        priorDrop.style.display = 'block';
    }

}*/


function onAddItemSubmit(e){

    e.preventDefault();
    //show the priority drop down 
    
    //displayPrior();

    console.log(validateForm ? 'returned true': 'returned false');

    if(!validateForm()){
        return;
    };

    
   
    
    //displayPrior();
    const newItem = itemInput.value;

    

    //validate input 
    if (newItem === ''){
        alert('No task added. Just Do it already!');
        return; 
    }
//check for edit mode 
    if (isEditMode){
        //getting item to edit

        //this is the list element
        const itemToEdit = itemList.querySelector('.edit-mode');

        //the text is removed but the element persists 
        removeItemFromStorage(itemToEdit.textContent);

        // removes class of edit mode previously added. 
        //reference onClickItem and setItemToEdit 
        //functions to see how
        itemToEdit.classList.remove('edit-mode');

        // removes 
        itemToEdit.remove();
        isEditMode = false;
    }
    //need if statement in add item to dom that changes 
    //styling depending on what priority value is selected
    //create item DOM element and adding it to itemList 
    addItemToDOM(newItem);

    //prioritySelect.selectedIndex = 0;

    //add item to local storage 
    addItemToStorage(newItem);
    
     checkUI();

    //this clears the input field for next input
    itemInput.value = '';
}

function addItemToDOM(item){
    //create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button);

    //this is where it's added to DOM
    itemList.appendChild(li);
};

function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();


    //Adding new item to array 
    itemsFromStorage.push(item);

    //convert to JSON string and set to local storage

    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function createButton (classes){
    const button = document.createElement('button');

    button.className = classes;

    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');

    icon.className = classes;

    return icon
}

function getItemsFromStorage(){
    let itemsFromStorage;

    if (localStorage.getItem('items')=== null){
        itemsFromStorage = [];
    } else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemsFromStorage
}

//If the classList contains remove-item the function will remove the parent of parent of icon which is 'li'.
//else (if we click anywhere inside li but not x button) run setItemToEdit.
//setItemToEdit runs changing isEditMode to true
//WHICH IS WHY isEditMode IS TRUE INSIDE OF OUR IF STATEMENT IN OUR onAddItemSubmit FUNCTION

function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    } else {
        
        setItemToEdit(e.target);
    }
}

function setItemToEdit (item){
    isEditMode = true;
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent
}

//THIS MIGHT BE MY FIRST SEMI ORIGINAL IDEA/ LINE OF CODE 



//function targets the "x"icon on click and then removes the parent of its parent (the item)
function removeItem(item){
    if (confirm('Did you complete this task?')){
        //remove item from DOM
        item.remove();
        //remove item from storage 
        removeItemFromStorage(item.textContent);

        checkUI();
        //Celebratory Shia video clip
    } //else{playEncouragingVideo(3,4)}
};

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();

    //filterout item to be removed 
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//function for clearing all items from item list 
function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList, firstChild);
        //clear from local storage 
        localStorage.removeItem('items');

        checkUI();
    };
}

function checkUI(){
    itemInput.value = '';
        const items = itemList.querySelectorAll('li');
        if (items.length === 0){
           clearBtn.style.display= 'none';
           
        } else {
            clearBtn.style.display= 'block';
            
        }

        formBtn.innerHTML = '<i class = "fa-solid fa-plus"></i> Add Item';
        formBtn.style.backgroundColor = '#333'

        isEditMode = false
}

/*function submitTest(){
    console.log(1);
}*/
function init(){
    //itemForm.addEventListener('submit', validateForm)
    itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
document.addEventListener('DOMContentLoaded', displayItems);
//document.addEventListener('DOMContentLoaded',hidePriorities);
}

checkUI();
init();

//document.getElementById("prioritySelect").addEventListener('click', selectedPriority)


//event listener to display priorties on submit before adding to DOM





//event listener that changes the update item back to add item after submitting in edit mode
//If i am in edit mode and then I submit the button should change 




//need event listener to add item list to DOM on submit 













 


