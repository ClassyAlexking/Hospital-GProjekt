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

function makeDoctorItems(email, speciality, experience){
    const dbRef = ref(db);
    let storedUser = localStorage.getItem('User');
    let currentUser = JSON.parse(storedUser);
    
    get(child(dbRef, "Users/" + email))
    .then((snapshot)=>{
        if(snapshot.exists()){
            // alert(snapshot.exists());
            // alert(enterPassword.value);
            // alert(snapshot.val().Password);
            var container = document.querySelector(".Medrow");
            var newMedicineItem = document.createElement("div");
            newMedicineItem.classList.add("medicinesItem");
            newMedicineItem.id = email;

            var currentDate = new Date();
            var curday = currentDate.getDate();
            var curmonth = currentDate.getMonth() + 1;
            var curyear = currentDate.getFullYear();
            var UserNameID = currentUser.userName;
            var DoctorNameID = snapshot.val().Username
            var appointID = (UserNameID.length < 3 ? (UserNameID+'000').substring(0,3) : UserNameID.substring(0,3)) +
            (DoctorNameID.length < 3 ? (DoctorNameID+'000').substring(0,3) : DoctorNameID.substring(0,3)) +
            (((curmonth - 1) * 31 + (curday - 1)) + (curyear % 100)* 1000);
    

            var command = '<img src="images/default_item.png" width="100" height="100">';
            newMedicineItem.innerHTML = `
            ${command}
            <h2>${snapshot.val().Username}</h2>
            <p>Speciality: ${speciality}</p>
            `;
            container.appendChild(newMedicineItem);
            container.insertBefore(newMedicineItem, document.getElementById("AddMedicine"));

            newMedicineItem.addEventListener('click', function(event) {

                document.querySelector('.Medicines-popup').classList.add("active");
                document.getElementById("Username").textContent = snapshot.val().Username;
                document.getElementById("Email").textContent = snapshot.val().Email;

                document.getElementById("Username2").textContent = "Doctor: " + snapshot.val().Username;
                document.getElementById("Email2").textContent = snapshot.val().Email;

                document.getElementById("Username22").textContent = "Patient: " +currentUser.userName;
                document.getElementById("Email22").textContent = appointID;

                document.getElementById("AppointBtn").addEventListener('click', function() {
                    if(localStorage.getItem('User')) {
                            document.getElementById("AppointInfo").classList.add("active");
                    } else {
                        window.location.href = "login.html";
                    }
                    // alert(`Email: ${email}`);
                });



                document.getElementById("AppointDoneBtn").addEventListener('click', function() {
                    // addAppointRequest(snapshot.val().Email);
                    // alert(`Email: ${email}`);
                    var UserAppointDate = document.getElementById("UserAppointDate").value;
                    set(ref(db, "Users/"+ currentUser.email + "/Appointment/"+ appointID),{
                        appointID
                    });

                    set(ref(db, "Users/"+ snapshot.val().Email + "/Appointment/"+ appointID),{
                        appointID
                    });

                    set(ref(db, "Appointment/"+ appointID),{
                        appointID,
                        date: UserAppointDate,
                        doctor: snapshot.val().Email,
                        patient: currentUser.email
                    })
                    .then(()=>{
                        alert("Data added successfully");
                        // window.location.href = "login.html";
                    })
                    .catch((error)=>{
                        alert(error);
                    });

                    window.location.href = "appointment.html";
                });
            });
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


function addAppointRequest(email) {
    // if (registerPassword.value == '' || registerEmail.value == '' || registerName.value == '') {
    //     errorRegister.classList.add('active');
    //     return;
    // }
    alert(email + "FUCK YOU");
    // set(ref(db, "Doctor/"+ email + "/"),{
    //     Name: enterName.value,
    //     ID: enterID.value,
    //     Age: enterAge.value
    // })
    // .then(()=>{
    //     alert("Data added successfully");
    // })
    // .catch((error)=>{
    //     alert(error);
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
    
    get(child(dbRef, "Doctor/"))
    .then((snapshot)=>{
        snapshot.forEach(childSnapshot => {
            makeDoctorItems(childSnapshot.val().Email, childSnapshot.val().Specialty, childSnapshot.val().YearOfExp);
        });
    });
}
getAllData();