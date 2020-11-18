/*
    HTML form 에서 로그인 버튼 클릭 시 입력한 id값을 콘솔에 출력함.
    실제 구현은 입력 값들을 Firebase로 넘겨줄 것. 
*/

const form = document.querySelector(".js-form"),
    input = form.querySelector("input");
const USER_VALUE = "D A T A"

function saveValue(text) {
    localStorage.setItem(USER_VALUE, text);
    console.log(text + " is storaged successfully")
}

function handleSubmit(event) {
    event.preventDefault();
    const inputValue = input.value;
    saveValue(inputValue);
}

function init() {
    form.addEventListener("submit", handleSubmit); 
}

init();