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

const db = getDatabase();

var userPic = document.querySelector('.user-pic');
var subMenu = document.querySelector('.sub-menu-wrap');

userPic.addEventListener('click',()=> {
  subMenu.classList.toggle('active');
})

function checkLogIn(){
  if(localStorage.getItem('User')) {
    var btnLogin = document.querySelector('.btnLogin-popup');
    var subMenu = document.querySelector('.sub-menu-wrap');
    var userPic = document.querySelector('.user-pic');
    let storedUser = localStorage.getItem('User');
    let currentUser = JSON.parse(storedUser);
    
    btnLogin.classList.add('hide');
    userPic.classList.add('active');
    
    document.getElementById('myUsername').textContent = currentUser.userName;
  } 
}


const logout = document.getElementById("logout");
logout.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('User');
    window.location.href = logout.getAttribute('href');
});

checkLogIn();