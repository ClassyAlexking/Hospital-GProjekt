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

function makeMedicineItems(medId, medName, medNumber, medManuf, equipStatus){
    var container = document.querySelector(".Medrow");
    var newMedicineItem = document.createElement("div");
    newMedicineItem.classList.add("medicinesItem");
    newMedicineItem.id = medId;

    var img = new Image();
    // img.src = `images/medicines/${medName}.png`;
    var command = '<img src="images/default_item.png" width="80" height="80">';
    // img.onload = function() {
    //     // Image found, display it
    //     container.innerHTML = `
    //     <img src="${imageSrc}" alt="${imageName} width="100" height="100"">
    //     <h2>${medName}</h2>
    //     <p>Price: ${medPRice}</p>
    //     `;
    // };
    // img.onerror = function() {
    //     // Image not found, display default image
    //     container.innerHTML = `
    //     <img src="images/default_item.png" alt="Default Image width="100" height="100"">
    //     <h2>${medName}</h2>
    //     <p>Price: ${medPRice}</p>
    //     `;
    // };

    newMedicineItem.innerHTML = `
    ${command}
    <h2>${medName}</h2>
    <h5>${equipStatus}</h5>
    <p>Number: ${medNumber}</p>
    `;
    container.appendChild(newMedicineItem);
    container.insertBefore(newMedicineItem, document.getElementById("AddMedicine"));

    newMedicineItem.addEventListener('click', function(event) {

        document.getElementById("BuyPopup").classList.add("active");
        document.getElementById("PricePerMed").textContent = "Price Per Med: " + medPRice + " đ";
        
        
        document.getElementById('buyNumber').addEventListener('input', calculateTotal(medPRice));
        // document.getElementById("Email").textContent = snapshot.val().Email;

        // document.getElementById("Username2").textContent = snapshot.val().Username;
        // document.getElementById("Email2").textContent = snapshot.val().Email;

        // document.getElementById("AppointBtn").addEventListener('click', function() {
        //     if(localStorage.getItem('User')) {
        //             document.getElementById("AppointInfo").classList.add("active");
        //     } else {
        //         window.location.href = "login.html";
        //     }
        //     // alert(`Email: ${email}`);
        // });



        // document.getElementById("AppointDoneBtn").addEventListener('click', function() {
        //     addAppointRequest(snapshot.val().Email);
        //     // alert(`Email: ${email}`);
        // });
    });
}

function calculateTotal(price = 0) {
    // Get the number of items and price per item from the form inputs
    const number = parseFloat(document.getElementById('buyNumber').value) || 0;

    // Calculate the total price
    const totalPrice = number * price;
    alert(totalPrice);

    // Update the paragraph element with the total price
    document.getElementById('totalPrice').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Add event listeners to input fields to update total price automatically


document.getElementById("addMedbtn").addEventListener('click', function(event) {

    var medName = document.getElementById("equipName").value;
    var medNumber = document.getElementById("equipNumber").value;
    var medManuf = document.getElementById("equipManuf").value;
    var medStatus = "Perfect";
    var medVersion = 1;
    var currentDate = new Date();
    var curday = currentDate.getDate();
    var curmonth = currentDate.getMonth() + 1;
    var curyear = currentDate.getFullYear();

    if (medName == '' || medNumber == '' || medManuf == '') {
        var errorNotify = document.querySelector('.error-notify.hide');
        errorNotify.classList.remove('hide');
        return;
    }

    var medID = (medName.length < 3 ? (medName+'000').substring(0,3) : medName.substring(0,3)) +
            (medManuf.length < 3 ? (medManuf+'000').substring(0,3) : medManuf.substring(0,3)) +
            (((curmonth - 1) * 31 + (curday - 1)) + (curyear % 100)* 1000);
        //this thing cant handle '.'
        
    const dbref = ref(db);
    get(child(dbref, "Equipment/" + medID))
    .then((snapshot)=>{
        if(snapshot.exists()){
            alert("There already exist a similar medicine. Do you want to update");
        } else {
            set(ref(db, "Equipment/"+ medID),{
                Name: medName ,
                Number: parseInt(medNumber),
                Manufacturer: medManuf,
                Version: medVersion,
            })
            .then(()=>{
                set(ref(db, "Equipment/"+ medID +"/History/"+ medVersion),{
                    Date: curyear + '-' + curmonth + '-' + curday,
                    Number: parseInt(medNumber),
                    Status: medStatus
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
    makeMedicineItems(medID, medName, medNumber, medManuf, medStatus);
});

//auto run medicine
function getAllData(){
    const dbRef = ref(db);
    
    get(child(dbRef, "Equipment"))
    .then((snapshot)=>{
        snapshot.forEach(childSnapshot => {
            get(child(dbRef, "Equipment/" + childSnapshot.key + "/History/" + childSnapshot.val().Version))
            .then((histSnapshot) =>{
                    makeMedicineItems(childSnapshot.key, childSnapshot.val().Name, childSnapshot.val().Number,
                    childSnapshot.val().Manufacturer, histSnapshot.val().Status);
            });
            
        });
    });
}
getAllData();