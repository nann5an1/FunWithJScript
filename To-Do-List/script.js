const addBtn = document.getElementById("add-btn");
const delBtn = document.getElementById("del-btn");
const input = document.querySelector("#input-text");
const parent = document.getElementById("output-div");
let taskCount = 0;
let array = [];

function addToList(textVal){
    array.push(textVal);
    let child = document.createElement("p");
    child.textContent = textVal; //either .innerText or .textContent
    parent.appendChild(child);
}

function delFromList(){
    alert("select the item first");
}

addBtn.addEventListener('click', () => addToList(input.value));

delBtn.addEventListener('click', () => delFromList());


