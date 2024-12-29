
const btns = document.querySelectorAll(".btn");
const digitsReg = /^\d+$/;
const inoutPanel = document.querySelector("#in-out-panel");
let digitString = "";


inoutPanel.innerHTML = "0";
function checkValue(value){
    if(value == "AC"){
        inoutPanel.innerHTML = "0";
        digitString = "";
    }
    else if(value != "="){
        digitString += value;
        inoutPanel.innerHTML = digitString;
    }
    else if(value == "="){
        digitString = eval(digitString);
        inoutPanel.innerHTML = digitString;
        if(digitString != ""){
            digitString = "";
        }
    }
}

for (const btn of btns) {
    btn.addEventListener('click', () => checkValue(btn.value));
}

// let digitsArray = [];
// let optArray = [];
// let total = 0;

//    if(digitsReg.test(value)){
//         digitString += value;
//    }
//    else if(value == "+" || value == "-" || value == "x" || value == "/")
//    {
//         digitsArray.push(digitString);
//         if(value == "+")
//             optArray.push("+");
//         else if(value == "-")
//             optArray.push("-");
//         else if(value == "x")
//             optArray.push("x");
//         else if(value == "/")
//             optArray.push("/");
//         alert(digitsArray);
//         alert(optArray);
//         digitString = "";
//    }
//    else if(value == "=")
//    {
//     if(total === 0){
//         first = digitsArray.shift();
        
//     }
//     alert("will be totaled up");
//    }