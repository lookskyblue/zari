const form = document.querySelector(".js-form"),
    input = form.querySelector("input");
const USER_VALUE = "D A T A"

function saveValue(text) {
    console.log("hi");
    localStorage.setItem(USER_VALUE, text);
}

function handleSubmit(event) {
    console.log("hi");
    event.preventDefault();
    const inputValue = input.value;
    saveValue(inputValue);
}

function init() {
    console.log("hi");
    form.addEventListener("submit", handleSubmit); 
}

init();