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

let storedUser = localStorage.getItem('User');
let currentUser = JSON.parse(storedUser);

function makeAppointItems(appointID){
    const dbRef = ref(db);
    
    get(child(dbRef, "Appointment/" + appointID))
    .then((snapshot)=>{
        if(snapshot.exists()){
            // alert(snapshot.exists());
            // alert(enterPassword.value);
            // alert(snapshot.val().Password);
            var container = document.querySelector(".Medrow");
            var newMedicineItem = document.createElement("div");
            newMedicineItem.classList.add("medicinesItem");
            newMedicineItem.id = snapshot.val().doctor;

            var command = '<img src="images/default_item.png" width="100" height="100">';
            newMedicineItem.innerHTML = `
            ${command}
            <h2>${snapshot.val().date}</h2>
            <p>Doctor: ${snapshot.val().doctor}</p>
            <p>Patient: ${snapshot.val().patient}</p>
            `;
            container.appendChild(newMedicineItem);
            container.insertBefore(newMedicineItem, document.getElementById("AddMedicine"));

            // newMedicineItem.addEventListener('click', function(event) {

            //     document.querySelector('.Medicines-popup').classList.add("active");
            //     document.getElementById("Username").textContent = snapshot.val().Username;
            //     document.getElementById("Email").textContent = snapshot.val().Email;
            //     document.getElementById("AppointBtn").addEventListener('click', function() {
            //         if(localStorage.getItem('User')) {
            //             localStorage.setItem('DoctorEmail', snapshot.val().Email);
            //             window.location.href = "appointment.html";
            //         } else {
            //             alert("Please sign in");
            //             window.location.href = "login.html";
            //         }
            //         alert(`Email: ${email}`);
            //     });
            // });
        } else {
            alert("There is no account with this email.")
        }
    })
    .catch((error)=>{
        alert(error)
    })


    // var container = document.querySelector(".Medrow");
    // var newMedicineItem = document.createElement("div");
    // newMedicineItem.classList.add("medicinesItem");
    // newMedicineItem.id = email;

    // var command = '<img src="images/default_item.png" width="100" height="100">';
    // newMedicineItem.innerHTML = `
    // ${command}
    // <h2>${email}</h2>
    // <p>Speciality: ${speciality}</p>
    // `;
    // container.appendChild(newMedicineItem);
    // container.insertBefore(newMedicineItem, document.getElementById("AddMedicine"));

    // newMedicineItem.addEventListener('click', function(event) {
    //     var medicinesPopup = document.querySelector('.form-box.login');
    //     document.querySelector('.Medicines-popup').classList.add("active");
    //     medicinesPopup.querySelector('h2').textContent = email;
    //     medicinesPopup.querySelector('p').textContent = role;
    //     var yesReqbtn = document.getElementById("yesReqbtn");
    //     yesReqbtn.addEventListener('click', function() {
    //         addRoleReq(email,role);
    //         alert(`Email: ${email}, Role: ${role}`);
    //     });
    // });
}

// document.getElementById("addMedbtn").addEventListener('click', function(event) {
//     var medName = document.getElementById("medName").value;
//     var medNumber = document.getElementById("medNumber").value;
//     var medManuf = document.getElementById("medManuf").value;
//     var medExpDate = document.getElementById("medExpDate").value;
//     var medPrice = document.getElementById("medPrice").value;
//     var medVersion = 1;
//     var parts = medExpDate.split('-');
//     var day = parseInt(parts[2]);
//     var month = parseInt(parts[1]);
//     var year = parseInt(parts[0]);
//     var currentDate = new Date();
//     var curday = currentDate.getDate();
//     var curmonth = currentDate.getMonth() + 1;
//     var curyear = currentDate.getFullYear();

//     if (medName == '' || medNumber == '' || medManuf == '' || medExpDate == '') {
//         var errorNotify = document.querySelector('.error-notify.hide');
//         errorNotify.classList.remove('hide');
//         return;
//     }

//     var medID = (medName.length < 3 ? (medName+'000').substring(0,3) : medName.substring(0,3)) +
//             (medManuf.length < 3 ? (medManuf+'000').substring(0,3) : medManuf.substring(0,3)) +
//             (((month - 1) * 31 + (day - 1)) + (year % 100)* 1000);
//         //this thing cant handle '.'
        
//     const dbref = ref(db);
//     get(child(dbref, "Doctors/" + medID))
//     .then((snapshot)=>{
//         if(snapshot.exists()){
//             alert("There already exist a similar doctor. Do you want to update");
//         } else {
//             set(ref(db, "Doctors/"+ medID),{
//                 Name: medName ,
//                 Number: parseInt(medNumber),
//                 Manufacturer: medManuf,
//                 Expire: medExpDate,
//                 Version: medVersion,
//             })
//             .then(()=>{
//                 set(ref(db, "Medicines/"+ medID +"/History/"+ medVersion),{
//                     Date: curyear + '-' + curmonth + '-' + curday,
//                     Number: parseInt(medNumber),
//                     Price: medPrice,
//                 })
//                 alert("Data added successfully");
//                 document.querySelector('.Medicines-popup').classList.remove("active");
//             })
//             .catch((error)=>{
//                 alert(error);
//             });
//         }
//     })
//     .catch((error)=>{
//         alert(error)
//     })
//     makeMedicineItems(medID, medName, medNumber, medManuf, medExpDate, medPrice);
// });

//auto run medicine
function getAllData(){
    const dbRef = ref(db);
    
    get(child(dbRef, "Users/" + currentUser.email + "/Appointment"))
    .then((snapshot)=>{
        snapshot.forEach(childSnapshot => {
            makeAppointItems(childSnapshot.val().appointID);
        });
    });
}
getAllData();