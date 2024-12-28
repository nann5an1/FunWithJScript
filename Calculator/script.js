
const btns = document.querySelectorAll(".btn");

const click = () =>{
    alert("button clicked");
}

for (const btn of btns) {
    btn.addEventListener('click', click);
}
