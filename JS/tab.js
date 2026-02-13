const btn1 = document.querySelector(".yellow")
const btn2 = document.querySelector(".red")
const btn3 = document.querySelector(".pink")
const btn4 = document.querySelector(".green")


const body = document.querySelector("body")


btn1.addEventListener("click", () => {
    body.style.backgroundColor = "yellow";
});

btn2.addEventListener("click", () => {
    body.style.backgroundColor = "red";
});

btn3.addEventListener("click", () => {
    body.style.backgroundColor = "pink";
});

btn4.addEventListener("click", () => {
    body.style.backgroundColor = "green";
});


