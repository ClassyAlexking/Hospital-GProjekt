var enterName = document.querySelector("#enterName");
var enterEmail = document.querySelector("#enterEmail");
var enterPassword = document.querySelector("#enterPassword");
var enterAge = document.querySelector("#enterAge");

var findID = document.querySelector("#findID");
var findName = document.querySelector("#findName");
var findAge = document.querySelector("#findAge");

var signupBtn = document.querySelector("#signup");
var insertBtn = document.querySelector("#insert");
var updateBtn = document.querySelector("#update");
var removeBtn = document.querySelector("#remove");
var findBtn = document.querySelector("#find");

export function SignUp() {
  if (enterPassword.value == '' || enterPassword .value == '' || enterName.value == '') {
      alert('Please fill in all fields.');
      return;
  }
}

signupBtn.addEventListener('click', SignUp);
