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

function makeMedicineItems(medId, medName, medNumber, medManuf, medExpDate){
    var container = document.querySelector(".Medrow");
    var newMedicineItem = document.createElement("div");
    newMedicineItem.classList.add("medicinesItem");
    newMedicineItem.id = medId;

    newMedicineItem.innerHTML = `
    <i class="fa-solid fa-plus"></i>
    <h2>${medName}</h2>
    <p>Number: ${medNumber}</p>
    <p>Manufacturer: ${medManuf}</p>
    <p>Expiration Date: ${medExpDate}</p>
    `;
    container.appendChild(newMedicineItem);
    container.insertBefore(newMedicineItem, document.getElementById("AddMedicine"));
}

document.getElementById("addMedbtn").addEventListener('click', function(event) {

    var medName = document.getElementById("medName").value;
    var medNumber = document.getElementById("medNumber").value;
    var medManuf = document.getElementById("medManuf").value;
    var medExpDate = document.getElementById("medExpDate").value;
    var medVersion = 1;
    var parts = medExpDate.split('-');
    var day = parseInt(parts[2]);
    var month = parseInt(parts[1]);
    var year = parseInt(parts[0]);
    var currentDate = new Date();
    var curday = currentDate.getDate();
    var curmonth = currentDate.getMonth() + 1;
    var curyear = currentDate.getFullYear();

    if (medName == '' || medNumber == '' || medManuf == '' || medExpDate == '') {
        var errorNotify = document.querySelector('.error-notify.hide');
        errorNotify.classList.remove('hide');
        return;
    }

    var medID = (medName.length < 3 ? (medName+'000').substring(0,3) : medName.substring(0,3)) +
            (medManuf.length < 3 ? (medManuf+'000').substring(0,3) : medManuf.substring(0,3)) +
            (((month - 1) * 31 + (day - 1)) + (year % 100)* 1000);
        //this thing cant handle '.'
        
    const dbref = ref(db);
    get(child(dbref, "Medicines/" + medID))
    .then((snapshot)=>{
        if(snapshot.exists()){
            alert("There already exist a similar medicine. Do you want to update");
        } else {
            set(ref(db, "Medicines/"+ medID),{
                Name: medName ,
                Number: parseInt(medNumber),
                Manufacturer: medManuf,
                Expire: medExpDate,
                Version: medVersion,
            })
            .then(()=>{
                set(ref(db, "Medicines/"+ medID +"/History/"+ medVersion),{
                    Date: curyear + '-' + curmonth + '-' + curday,
                    number: parseInt(medNumber),
                })
                alert("Data added successfully");
                document.querySelector('.Medicines-popup').classList.remove("active");
            })
            .catch((error)=>{
                alert(error);
            });
        }
    })
    .catch((error)=>{
        alert(error)
    })
    makeMedicineItems(medID, medName, medNumber, medManuf, medExpDate);
});

//auto run medicine
function getAllData(){
    const dbRef = ref(db);
    
    get(child(dbRef, "Medicines"))
    .then((snapshot)=>{
        snapshot.forEach(childSnapshot => {
            makeMedicineItems(childSnapshot.key, childSnapshot.val().Name, childSnapshot.val().Number,
                                childSnapshot.val().Manufacturer, childSnapshot.val().Expire);
        });
    });
}
getAllData();