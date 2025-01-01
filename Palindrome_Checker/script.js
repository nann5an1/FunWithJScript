const inputText = document.querySelector(".text-input");
const btn = document.getElementById("btn-click");
const outputText = document.getElementById("output-text");

function palindromeCheck(){
    let flag = 1;
    const textLength = inputText.value.length;
    let  midIndex = textLength / 2;
    midIndex = Math.floor(midIndex);
    for(let i = 0; i < midIndex; i++){  
        if(inputText.value[i] == inputText.value[textLength - 1 - i]) //d-a-d //hooh
            flag = 1;
        else
        {
            flag = 0;
            break;
        }
    }
    if(flag)
        outputText.innerHTML = "is palindrome";
    else
        outputText.innerHTML = "not palindrome";
}

btn.addEventListener('click', () => palindromeCheck());
document.addEventListener('keydown', (event) => {
    if(event.key === "Enter")
        palindromeCheck();
});
