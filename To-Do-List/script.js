const addBtn = document.getElementById("add-btn");
const delBtn = document.getElementById("del-btn");
const input = document.querySelector("#input-text");
const parent = document.getElementById("output-div");
let array = [];
let selectedChild = null;

function addToList(textVal){
    let child = document.createElement("li");
    child.style.color = "rgb(0, 19, 59)";
    child.style.fontSize = "1.7rem";
    child.style.fontVariant = "small-caps";
    child.textContent = textVal; //either .innerText or .textContent
    child.style.backgroundColor = "transparent";
    
    array.push(textVal);
    parent.appendChild(child);
    child.addEventListener('click', () => { //select on the task
        selectedChild = child;
        child.style.color = "red";
    });
}

function delFromList(){
    if(selectedChild){
        let arrayIndex = array.indexOf(selectedChild.textContent);
        let removedNode = parent.removeChild(selectedChild);
        array.splice(arrayIndex, 1);
        selectedChild = null;
    }
}

function handleKeyEnter(event){
    if(event.key == "Enter")
    {
        event.preventDefault();
        addToList(input.value);
    }
}
document.addEventListener('keydown', () => handleKeyEnter(event));
addBtn.addEventListener('click', () => addToList(input.value));
delBtn.addEventListener('click', () => delFromList());


