import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyAd2ugMbf5y8Xyp_yOHusRUFwB0e_sCynQ",
    authDomain: "hospital-gprojekt.firebaseapp.com",
    databaseURL: "https://hospital-gprojekt-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hospital-gprojekt",
    storageBucket: "hospital-gprojekt.appspot.com",
    messagingSenderId: "195852882182",
    appId: "1:195852882182:web:803d496230956b3dab4e87"
  };

const app = initializeApp(firebaseConfig);

import {getDatabase, ref, get, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import {User} from "./class.js";



const db = getDatabase();


var loginEmail = document.getElementById("login-Email");
var loginName = document.getElementById("login-Name");
var loginPassword = document.getElementById("login-Password");

var registerEmail = document.getElementById("register-Email");
var registerName = document.getElementById("register-Name");
var registerPassword = document.getElementById("register-Password");
var selectRole = document.getElementById('enterRole');
var selectedRole;


var findID = document.querySelector("#findID");
var findName = document.querySelector("#findName");
var findAge = document.querySelector("#findAge");


var errorLogin = document.querySelector('.error-notify.login');
var errorRegister = document.querySelector('.error-notify.register');

var loginBtn = document.querySelector("#login");
var registerBtn = document.querySelector("#register");
var insertBtn = document.querySelector("#insert");
var updateBtn = document.querySelector("#update");
var removeBtn = document.querySelector("#remove");
var findBtn = document.querySelector("#find");

selectRole.addEventListener('change', function() {
    selectedRole = selectRole.value;
});

loginBtn.addEventListener('click',()=> {
    if (loginPassword.value == '' || loginEmail.value == '') {
        errorLogin.classList.add('active');
        return;
    }
    var Index = loginEmail.value.indexOf('@');
    if (Index == -1) {
        alert('Please enter your email.');
        return;
    }
    //this thing cant handle '.'
    Index = loginEmail.value.indexOf('.');
    if (Index !== -1) {
        loginEmail.value = loginEmail.value.substring(0, Index);
    }

    const dbref = ref(db);

    get(child(dbref, "Users/" + loginEmail.value))
    .then((snapshot)=>{
        if(snapshot.exists()){
            // alert(snapshot.exists());
            // alert(enterPassword.value);
            // alert(snapshot.val().Password);
            if(loginPassword.value == snapshot.val().Password){
                let currentUser = new User(snapshot.val().Email,snapshot.val().Password,snapshot.val().Username,
                                            snapshot.val().PhoneNumber,snapshot.val().Sex,snapshot.val().Birthdate,
                                            snapshot.val().Role,snapshot.val().HistoryVer);
                localStorage.setItem('User', JSON.stringify(currentUser));
                window.location.href = "index.html";
            } else { 
            alert("Wrong password!");
            }
        } else {
            alert("There is no account with this email.")
        }
    })
    .catch((error)=>{
        alert(error)
    })
})

registerBtn.addEventListener('click',()=> {
    if (registerPassword.value == '' || registerEmail.value == '' || registerName.value == '') {
        errorRegister.classList.add('active');
        return;
    }
    var Index = registerEmail.value.indexOf('@');
    if (Index == -1) {
        alert('Please enter your email.');
        return;
    }
    //this thing cant handle '.'
    Index = registerEmail.value.indexOf('.');
    if (Index !== -1) {
        registerEmail.value = registerEmail.value.substring(0, Index);
    }

    // Add event listener for change event
    const dbref = ref(db);
    get(child(dbref, "Users/" + registerEmail.value))
    .then((snapshot)=>{
        if(snapshot.exists()){
            alert("There already exist an account with this email");
        } else {
            if (selectedRole != "User"){
                set(ref(db, "RoleRequest/"+ registerEmail.value),{
                    Email: registerEmail.value,
                    Role: selectedRole,
                });
            }
            set(ref(db, "Users/"+ registerEmail.value),{
                Email: registerEmail.value,
                Password: registerPassword.value,
                Username: registerName.value,
                PhoneNumber: "",
                Sex: 0,
                Birthdate: "",
                Role: "User",
                HistoryVer: 0,
            })
            .then(()=>{
                alert("Data added successfully");
                window.location.href = "login.html";
            })
            .catch((error)=>{
                alert(error);
            });
        }
    })
    .catch((error)=>{
        alert(error)
    })
})


  function InsertData() {
      set(ref(db, "People/"+ enterID.value),{
          Name: enterName.value,
          ID: enterID.value,
          Age: enterAge.value
      })
      .then(()=>{
          alert("Data added successfully");
      })
      .catch((error)=>{
          alert(error);
      });
  }

  function FindData() {
      const dbref = ref(db);

      get(child(dbref, "People/" + findID.value))
      .then((snapshot)=>{
          if(snapshot.exists()){
              findName.innerHTML = "Name: " + snapshot.val().Name;
              findAge.innerHTML = "Age: " + snapshot.val().Age;
          } else {
              alert("No data found");
          }
      })
      .catch((error)=>{
          alert(error)
      })
      
  }

  function UpdateData(){
      update(ref(db, "People/"+ enterID.value),{
          Name: enterName.value,
          Age: enterAge.value
      })
      .then(()=>{
          alert("Data updated successfully");
      })
      .catch((error)=>{
          alert(error);
      });
  }

  function RemoveData(){
      remove(ref(db, "People/"+ enterID.value))
      .then(()=>{
          alert("Data deleted successfully");
      })
      .catch((error)=>{
          alert(error);
      });
  }

//   loginBtn.addEventListener('click', LogIn);
//   insertBtn.addEventListener('click', InsertData);
//   updateBtn.addEventListener('click', UpdateData);
//   removeBtn.addEventListener('click', RemoveData);
//   findBtn.addEventListener('click', FindData);
var wrapper = document.querySelector('.wrapper');
var loginLink = document.querySelector('.login-link');
var registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click',()=> {
    wrapper.classList.add('active');
    errorLogin.classList.remove('active');
})
loginLink.addEventListener('click',()=> {
    wrapper.classList.remove('active');
    errorRegister.classList.remove('active');
})


