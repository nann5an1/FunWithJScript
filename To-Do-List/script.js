const addBtn = document.getElementById("add-btn");
const delBtn = document.getElementById("del-btn");
const input = document.querySelector("#input-text");
const parent = document.getElementById("output-div");
let taskCount = 0;
let array = [];


// function testFunc(){
//     alert("clicked");
// }
function addToList(textVal){
    array.push(textVal);
    let child = document.createElement("li");
    child.style.color = "rgb(0, 19, 59)";
    child.style.fontSize = "1.7rem";
    child.style.fontVariant = "small-caps";
    child.textContent = textVal; //either .innerText or .textContent
    child.style.backgroundColor = "transparent";
    parent.appendChild(child);
}

function delFromList(){
    alert("select the item first");
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


